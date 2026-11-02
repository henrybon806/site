import { colors, currentTheme, COLUMN_WIDTH } from "@/constants/theme";
import { useScrollContext } from "@/context/ScrollContext";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";

/**
 * Two mazes fixed in the side margins racing two search algorithms against each other.
 * The right maze is the left one mirrored, so left (top-left to bottom-right) and right
 * (top-right to bottom-left) solve the same puzzle, one cell per step at the same speed;
 * whichever takes fewer steps finishes first. They ignore scrolling entirely; once both
 * are solved and the paths have been shown for a moment, a new maze and a new random
 * pairing of algorithms start.
 */

const CELL = 12; // target cell size; each maze stretches its cells slightly to fill its region exactly
const EDGE = 6; // gap between a maze's border and the window edges (the header box's top matches)
const CAPTION_SPACE = 24; // room under each maze for its label
const MIN_COLS = 9; // narrower margins (tablets, phones) get no maze rather than a cramped strip
const SEARCH_FRAMES = 10 * 60; // the slower side takes ~10s at 60fps regardless of maze size
const TRACE_FRAMES = 2.5 * 60;
const HOLD_MS = 3000;
const ALGORITHMS = ["BFS", "DFS", "A*", "Greedy", "Bidirectional", "Wall follower", "Random DFS"] as const;
type Algorithm = (typeof ALGORITHMS)[number];

// One-line explanations, shown when hovering a maze's label.
const DESCRIPTIONS: Record<Algorithm, string> = {
  BFS: "Explores level by level, so the first path it finds is the shortest.",
  DFS: "Follows one corridor as deep as it goes, then backtracks.",
  "A*": "Steers toward the exit by distance; still guarantees the shortest path.",
  Greedy: "Always moves to whatever looks closest to the exit. Fast, not always shortest.",
  Bidirectional: "Two breadth-first searches, one from each end, meeting in the middle.",
  "Wall follower": "Keeps one hand on the wall, like you would in a real maze.",
  "Random DFS": "Depth-first, but picks which corridor to try at random.",
};

// Two different algorithms, chosen at random.
function pickMatchup(): [Algorithm, Algorithm] {
  const a = Math.floor(Math.random() * ALGORITHMS.length);
  const b = (a + 1 + Math.floor(Math.random() * (ALGORITHMS.length - 1))) % ALGORITHMS.length;
  return [ALGORITHMS[a], ALGORITHMS[b]];
}

// The canvas can't read CSS variables, so the maze keeps its own palette per theme.
const PALETTES = {
  light: {
    wall: "rgba(24,24,27,0.07)",
    border: "#E4E4E7", // same as --line, so maze borders and box borders read as one line
    visited: "rgba(113,113,122,0.16)",
    path: "rgba(12,74,110,0.32)",
    start: "rgba(16,185,129,0.45)",
    end: "rgba(239,68,68,0.45)",
    caption: "rgba(113,113,122,0.6)",
  },
  dark: {
    wall: "rgba(237,237,237,0.07)",
    border: "#2A2A2E",
    visited: "rgba(161,161,170,0.14)",
    path: "rgba(125,185,222,0.3)",
    start: "rgba(16,185,129,0.4)",
    end: "rgba(239,68,68,0.4)",
    caption: "rgba(139,139,147,0.6)",
  },
};

const blocks = new Set<HTMLElement>();

// Marks a View as page content; the mazes stay outside the column these form.
export function useMazeBlock() {
  const ref = useRef<View>(null);
  useEffect(() => {
    const node = ref.current as unknown as HTMLElement | null;
    if (!node || typeof document === "undefined") return;
    blocks.add(node);
    return () => {
      blocks.delete(node);
    };
  }, []);
  return ref;
}

type Maze = {
  x: number; // left edge in px
  y: number; // top edge in px
  cw: number; // cell width in px
  ch: number; // cell height in px
  cols: number;
  rows: number;
  open: Uint8Array;
  algorithm: Algorithm;
  order: number[];
  path: number[];
  visited: number;
  traced: number;
};

function neighbors(i: number, cols: number, rows: number): number[] {
  const x = i % cols, y = (i / cols) | 0;
  const out: number[] = [];
  if (x > 0) out.push(i - 1);
  if (x < cols - 1) out.push(i + 1);
  if (y > 0) out.push(i - cols);
  if (y < rows - 1) out.push(i + cols);
  return out;
}

// Recursive backtracker; the outer ring of cells stays wall and forms the border.
function carve(cols: number, rows: number): Uint8Array {
  const open = new Uint8Array(cols * rows);
  const steps = [[2, 0], [-2, 0], [0, 2], [0, -2]];
  const stack = [cols + 1];
  open[cols + 1] = 1;
  while (stack.length) {
    const cur = stack[stack.length - 1];
    const x = cur % cols, y = (cur / cols) | 0;
    const options: number[][] = [];
    for (const [dx, dy] of steps) {
      const nx = x + dx, ny = y + dy;
      if (nx < 1 || nx > cols - 2 || ny < 1 || ny > rows - 2 || open[ny * cols + nx]) continue;
      options.push([ny * cols + nx, (y + dy / 2) * cols + (x + dx / 2)]);
    }
    if (!options.length) {
      stack.pop();
      continue;
    }
    const [next, mid] = options[Math.floor(Math.random() * options.length)];
    open[mid] = 1;
    open[next] = 1;
    stack.push(next);
  }
  // A few extra openings inside the border so there's more than one route.
  for (let k = 0; k < cols * rows * 0.03; k++) {
    const x = 1 + Math.floor(Math.random() * (cols - 2)), y = 1 + Math.floor(Math.random() * (rows - 2));
    open[y * cols + x] = 1;
  }
  return open;
}

type Search = { order: number[]; path: number[] };

function pathFrom(parent: Int32Array, end: number): number[] {
  const path: number[] = [];
  for (let i = end; i >= 0; i = parent[i]) path.push(i);
  return path.reverse();
}

function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

// BFS, DFS, Random DFS, A* and Greedy best-first differ only in which frontier cell expands next.
function frontierSearch(open: Uint8Array, cols: number, rows: number, start: number, end: number, algorithm: Algorithm): Search {
  const parent = new Int32Array(open.length).fill(-2);
  const cost = new Int32Array(open.length);
  const ex = end % cols, ey = (end / cols) | 0;
  const h = (i: number) => Math.abs((i % cols) - ex) + Math.abs(((i / cols) | 0) - ey);
  const score = algorithm === "Greedy" ? h : (i: number) => cost[i] + h(i);
  const frontier = [start];
  const order: number[] = [];
  parent[start] = -1;
  let head = 0;
  while (head < frontier.length) {
    let cur: number;
    if (algorithm === "BFS") {
      cur = frontier[head++];
    } else if (algorithm === "DFS" || algorithm === "Random DFS") {
      cur = frontier.pop()!;
    } else {
      let bi = 0;
      for (let j = 1; j < frontier.length; j++) if (score(frontier[j]) < score(frontier[bi])) bi = j;
      cur = frontier[bi];
      frontier[bi] = frontier[frontier.length - 1];
      frontier.pop();
    }
    order.push(cur);
    if (cur === end) break;
    const next = neighbors(cur, cols, rows);
    for (const nb of algorithm === "Random DFS" ? shuffle(next) : next) {
      if (!open[nb] || parent[nb] !== -2) continue;
      parent[nb] = cur;
      cost[nb] = cost[cur] + 1;
      frontier.push(nb);
    }
  }
  return { order, path: pathFrom(parent, end) };
}

// Two BFS frontiers, one from each end, expanding in turns until they touch.
function bidirectional(open: Uint8Array, cols: number, rows: number, start: number, end: number): Search {
  const fromStart = new Int32Array(open.length).fill(-2);
  const fromEnd = new Int32Array(open.length).fill(-2);
  fromStart[start] = -1;
  fromEnd[end] = -1;
  const queues = [[start], [end]];
  const heads = [0, 0];
  const parents = [fromStart, fromEnd];
  const order: number[] = [];
  let meet = start === end ? start : -1;
  for (let side = 0; meet < 0 && (heads[0] < queues[0].length || heads[1] < queues[1].length); side ^= 1) {
    if (heads[side] >= queues[side].length) continue;
    const cur = queues[side][heads[side]++];
    order.push(cur);
    for (const nb of neighbors(cur, cols, rows)) {
      if (!open[nb] || parents[side][nb] !== -2) continue;
      parents[side][nb] = cur;
      queues[side].push(nb);
      if (parents[side ^ 1][nb] !== -2) {
        meet = nb;
        break;
      }
    }
  }
  if (meet < 0) return { order, path: [] };
  const back: number[] = [];
  for (let i = fromEnd[meet]; i >= 0; i = fromEnd[i]) back.push(i);
  return { order, path: [...pathFrom(fromStart, meet), ...back] };
}

// Left-hand rule: walk with one hand on the wall. The path is the walk with its loops erased.
function wallFollower(open: Uint8Array, cols: number, rows: number, start: number, end: number): Search {
  const moves = [-cols, 1, cols, -1]; // up, right, down, left
  const canMove = (i: number, d: number) => {
    const x = i % cols, y = (i / cols) | 0;
    if ((d === 0 && y === 0) || (d === 1 && x === cols - 1) || (d === 2 && y === rows - 1) || (d === 3 && x === 0)) return false;
    return open[i + moves[d]] === 1;
  };
  const order = [start];
  const walk = [start];
  const onWalk = new Map<number, number>([[start, 0]]);
  let cur = start;
  let dir = 1;
  for (let steps = 0; cur !== end && steps < open.length * 4; steps++) {
    const turn = [3, 0, 1, 2].map((t) => (dir + t) % 4).find((d) => canMove(cur, d));
    if (turn === undefined) break;
    dir = turn;
    cur += moves[dir];
    order.push(cur);
    const seen = onWalk.get(cur);
    if (seen !== undefined) {
      for (const dropped of walk.splice(seen + 1)) onWalk.delete(dropped);
    } else {
      onWalk.set(cur, walk.length);
      walk.push(cur);
    }
  }
  // Extra openings can leave the exit on an island the wall never reaches; finish with BFS.
  if (cur !== end) {
    const rest = frontierSearch(open, cols, rows, cur, end, "BFS");
    return { order: [...order, ...rest.order], path: [...walk, ...rest.path.slice(1)] };
  }
  return { order, path: walk };
}

function search(open: Uint8Array, cols: number, rows: number, start: number, end: number, algorithm: Algorithm): Search {
  if (algorithm === "Bidirectional") return bidirectional(open, cols, rows, start, end);
  if (algorithm === "Wall follower") return wallFollower(open, cols, rows, start, end);
  return frontierSearch(open, cols, rows, start, end, algorithm);
}

// Grid size whose border lines land exactly on left/right/top/bottom, so a maze can
// share an edge with the content box.
function gridFor(left: number, right: number, top: number, bottom: number) {
  let cols = Math.round((right - left) / CELL) + 1;
  let rows = Math.round((bottom - top) / CELL) + 1;
  if (cols % 2 === 0) cols--;
  if (rows % 2 === 0) rows--;
  return cols < MIN_COLS || rows < MIN_COLS ? null : { cols, rows };
}

function mirror(open: Uint8Array, cols: number, rows: number): Uint8Array {
  const out = new Uint8Array(open.length);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) out[y * cols + x] = open[y * cols + (cols - 1 - x)];
  return out;
}

function placeMaze(
  open: Uint8Array, cols: number, rows: number,
  left: number, right: number, top: number, bottom: number,
  start: number, end: number, algorithm: Algorithm
): Maze {
  const cw = (right - left) / (cols - 1);
  const ch = (bottom - top) / (rows - 1);
  const { order, path } = search(open, cols, rows, start, end, algorithm);
  return { x: left - cw / 2, y: top - ch / 2, cw, ch, cols, rows, open, algorithm, order, path, visited: 0, traced: 0 };
}

export default function PageMaze() {
  const { scrollViewRef } = useScrollContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([null, null]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scroller = (scrollViewRef.current as any)?.getScrollableNode?.() as HTMLElement | undefined;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !scroller || !ctx) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let mazes: Maze[] = [];
    let hovered = -1;
    const labels = labelRefs.current;
    const cleanups: (() => void)[] = [];
    labels.forEach((el, k) => {
      if (!el) return;
      const enter = () => (hovered = k);
      const leave = () => (hovered = -1);
      const click = () => generate();
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("click", click);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("click", click);
      });
    });

    let speed = 2; // cells expanded per frame, shared so the race is fair
    let winner: Maze | null = null; // null: tie
    let doneAt = 0;
    let frame = 0;
    let generated = false;

    // Left/right edges of the content boxes (their border boxes).
    const measureColumn = () => {
      let left = Infinity, right = -Infinity;
      blocks.forEach((el) => {
        const r = el.getBoundingClientRect();
        left = Math.min(left, r.left);
        right = Math.max(right, r.right);
      });
      return right > left ? { left, right } : null;
    };
    let column = { left: 0, right: 0 };

    const generate = () => {
      const w = scroller.clientWidth;
      const rect = scroller.getBoundingClientRect(); // its top is the header height
      column = measureColumn() ?? { left: (w - COLUMN_WIDTH) / 2, right: (w + COLUMN_WIDTH) / 2 };
      // Border lines sit on half pixels so 1px strokes are crisp, and the inner border lands
      // on the center of the box's 1px border, so the two draw as one line.
      const top = EDGE + 0.5;
      const bottom = Math.round(rect.top + scroller.clientHeight - CAPTION_SPACE) + 0.5;
      const leftEdge = EDGE + 0.5, leftInner = column.left + 0.5;
      const rightInner = column.right - 0.5, rightEdge = Math.round(w - EDGE) - 0.5;
      // Both sides need room for the race; the right maze reuses the left grid, mirrored.
      const grid = gridFor(leftEdge, leftInner, top, bottom);
      mazes = [];
      if (!grid || !gridFor(rightInner, rightEdge, top, bottom)) return;
      const { cols, rows } = grid;
      const open = carve(cols, rows);
      const [a, b] = pickMatchup();
      const topLeft = cols + 1, bottomRight = (rows - 2) * cols + cols - 2;
      const topRight = 2 * cols - 2, bottomLeft = (rows - 2) * cols + 1;
      mazes = [
        placeMaze(open, cols, rows, leftEdge, leftInner, top, bottom, topLeft, bottomRight, a),
        placeMaze(mirror(open, cols, rows), cols, rows, rightInner, rightEdge, top, bottom, topRight, bottomLeft, b),
      ];
      const [l, r] = mazes;
      speed = Math.max(2, Math.ceil(Math.max(l.order.length, r.order.length) / SEARCH_FRAMES));
      winner = l.order.length === r.order.length ? null : l.order.length < r.order.length ? l : r;
      if (reduceMotion) mazes.forEach((m) => {
        m.visited = m.order.length;
        m.traced = m.path.length;
      });
      doneAt = 0;
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const palette = PALETTES[currentTheme()];

      for (const m of mazes) {
        const { cols, rows, open, order, path } = m;
        const X = (i: number) => m.x + ((i % cols) + 0.5) * m.cw;
        const Y = (i: number) => m.y + (((i / cols) | 0) + 0.5) * m.ch;

        // Interior walls as faint connected lines running into the border.
        ctx.beginPath();
        for (let i = 0; i < cols * rows; i++) {
          if (open[i]) continue;
          const x = i % cols, y = (i / cols) | 0;
          if (x < cols - 1 && !open[i + 1] && y > 0 && y < rows - 1) {
            ctx.moveTo(X(i), Y(i));
            ctx.lineTo(X(i + 1), Y(i));
          }
          if (y < rows - 1 && !open[i + cols] && x > 0 && x < cols - 1) {
            ctx.moveTo(X(i), Y(i));
            ctx.lineTo(X(i), Y(i + cols));
          }
        }
        ctx.strokeStyle = palette.wall;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Border drawn exactly like the content boxes' borders.
        ctx.strokeStyle = palette.border;
        ctx.lineWidth = 1;
        ctx.strokeRect(X(0), Y(0), X(cols - 1) - X(0), Y((rows - 1) * cols) - Y(0));

        ctx.fillStyle = palette.visited;
        const v = Math.min(m.visited, order.length);
        for (let k = 0; k < v; k++) ctx.fillRect(X(order[k]) - 1, Y(order[k]) - 1, 2, 2);

        const t = Math.min(m.traced, path.length);
        if (t > 1) {
          ctx.beginPath();
          ctx.moveTo(X(path[0]), Y(path[0]));
          for (let k = 1; k < t; k++) ctx.lineTo(X(path[k]), Y(path[k]));
          ctx.strokeStyle = palette.path;
          ctx.lineWidth = 1.5;
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        for (const [i, color] of [[path[0], palette.start], [path[path.length - 1], palette.end]] as const) {
          ctx.beginPath();
          ctx.arc(X(i), Y(i), 3, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      // Each maze's label sits underneath it, aligned to its outer edge. They're real elements
      // (not canvas text) so they can be hovered for an explanation and clicked for a new race.
      const allSearched = mazes.every((m) => m.visited >= m.order.length);
      ctx.font = "10px 'Geist Mono', ui-monospace, monospace"; // for measuring label width
      labels.forEach((el, k) => {
        const m = mazes[k];
        if (!el) return;
        if (!m) {
          el.style.display = "none";
          return;
        }
        const searched = m.visited >= m.order.length;
        const done = m.traced >= m.path.length;
        const result = winner === m && searched ? " · won" : !winner && allSearched ? " · tie" : "";
        const leftEdge = m.x + m.cw / 2, rightEdge = m.x + (m.cols - 0.5) * m.cw;
        // Stats stay on one line: drop detail until the label fits under its maze.
        const visitedNow = Math.min(m.visited, m.order.length);
        const candidates = [
          `${m.algorithm} · ${visitedNow} visited${done ? ` · path ${m.path.length}` : ""}${result}`,
          `${m.algorithm} · ${done ? `path ${m.path.length}` : `${visitedNow} visited`}${result}`,
          `${m.algorithm}${result}`,
        ];
        const fits = (t: string) => ctx.measureText(t.toUpperCase()).width + t.length * 0.8 <= rightEdge - leftEdge;
        const stats = candidates.find(fits) ?? candidates[candidates.length - 1];
        const text = hovered === k ? `${m.algorithm}: ${DESCRIPTIONS[m.algorithm]} Click for a new race.` : stats;
        if (el.textContent !== text) el.textContent = text;
        el.style.whiteSpace = hovered === k ? "normal" : "nowrap";
        const isLeft = k === 0;
        el.style.display = "block";
        el.style.color = hovered === k ? "var(--text)" : palette.caption;
        el.style.background = hovered === k ? "var(--bg)" : "transparent";
        el.style.boxShadow = hovered === k ? "0 0 0 6px var(--bg)" : "none";
        el.style.maxWidth = `${rightEdge - leftEdge}px`;
        el.style.textAlign = isLeft ? "left" : "right";
        el.style.left = isLeft ? `${leftEdge}px` : "auto";
        el.style.right = isLeft ? "auto" : `${w - rightEdge}px`;
        el.style.bottom = `${h - (m.y + (m.rows - 0.5) * m.ch + 20)}px`;
      });
    };

    const tick = (now: number) => {
      if (!mazes.length && blocks.size && !generated) {
        generated = true;
        generate();
      } else if (generated) {
        const now = measureColumn();
        if (now && (Math.abs(now.left - column.left) > 0.25 || Math.abs(now.right - column.right) > 0.25)) generate();
      }
      if (!reduceMotion && mazes.length) {
        let busy = false;
        for (const m of mazes) {
          if (m.visited < m.order.length) m.visited += speed;
          else if (m.traced < m.path.length) m.traced += Math.max(1, Math.ceil(m.path.length / TRACE_FRAMES));
          else continue;
          busy = true;
        }
        if (busy) doneAt = 0;
        else if (!doneAt) doneAt = now;
        else if (now - doneAt > HOLD_MS) {
          generate();
        }
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      resizeCanvas();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(generate, 150);
    };
    window.addEventListener("resize", onResize);
    resizeCanvas();
    frame = requestAnimationFrame(tick);

    return () => {
      cleanups.forEach((c) => c());
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [scrollViewRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
          backgroundColor: colors.bg,
        }}
      />
      {[0, 1].map((k) => (
        <div
          key={k}
          ref={(el) => {
            labelRefs.current[k] = el;
          }}
          data-print="hide"
          role="button"
          tabIndex={-1}
          style={{
            display: "none",
            position: "fixed",
            zIndex: 20,
            cursor: "pointer",
            fontFamily: "'Geist Mono', ui-monospace, monospace",
            fontSize: 10,
            lineHeight: "14px",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            userSelect: "none",
          }}
        />
      ))}
    </>
  );
}
