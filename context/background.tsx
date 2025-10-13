import type { JSX } from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Maze Search Visualization Background.
 * - Visualizes different search algorithms (BFS, DFS, A*).
 * - Automatically cycles through algorithms.
 * - Shows pathfinding process and final path.
 */
type Props = {
  cellSize?: number;
  wallColor?: string;
  pathColor?: string;
  visitedColor?: string;
  startColor?: string;
  endColor?: string;
  bgColor?: string;
  opacity?: number;
  tickMs?: number;
  algorithmSwitchMs?: number;
};

type CellType = 'wall' | 'empty' | 'visited' | 'path' | 'start' | 'end';
type Algorithm =  'DFS' | 'A*' | 'BFS';

interface Point {
  x: number;
  y: number;
}

// --- Helper Functions (Kept outside for brevity and separation) ---

function generateMaze(rows: number, cols: number): CellType[][] {
  const safeRows = rows % 2 === 0 ? rows - 1 : rows;
  const safeCols = cols % 2 === 0 ? cols - 1 : cols;
  
  const maze: CellType[][] = Array(safeRows).fill(0).map(() => Array(safeCols).fill('wall'));
  
  const carve = (x: number, y: number) => {
    maze[y][x] = 'empty';
    
    const directions = [
      { dx: 0, dy: -2 },
      { dx: 2, dy: 0 },
      { dx: 0, dy: 2 },
      { dx: -2, dy: 0 }
    ];
    
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
    
    for (const dir of directions) {
      const nx = x + dir.dx;
      const ny = y + dir.dy;
      
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] === 'wall') {
        maze[y + dir.dy / 2][x + dir.dx / 2] = 'empty';
        carve(nx, ny);
      }
    }
  };
  
  const startX = 1;
  const startY = 1;
  carve(startX, startY);
  
  maze[1][1] = 'empty';
  maze[rows - 2][cols - 2] = 'empty';
  
  const createDirectPath = () => {
    const startX = 1;
    const startY = 1;
    const endX = cols - 2;
    const endY = rows - 2;
    
    const midX = Math.floor((startX + endX) / 2);
    
    for (let x = startX; x <= midX; x++) {
      maze[startY][x] = 'empty';
    }
    
    for (let y = startY; y <= endY; y++) {
      maze[y][midX] = 'empty';
    }
    
    for (let x = midX; x <= endX; x++) {
      maze[endY][x] = 'empty';
    }
  };
  
  createDirectPath();
  
  for (let i = 0; i < rows * cols * 0.05; i++) {
    const x = Math.floor(Math.random() * (cols - 2)) + 1;
    const y = Math.floor(Math.random() * (rows - 2)) + 1;
    
    if ((x === 1 && y === 1) || (x === cols - 2 && y === rows - 2)) continue;
    
    if (maze[y] && maze[y][x] === 'wall') {
      maze[y][x] = 'empty';
    }
  }
  
  return maze;
}

function getNeighbors(point: Point, rows: number, cols: number, maze: CellType[][]): Point[] {
  const { x, y } = point;
  const neighbors: Point[] = [];
  
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 }
  ];
  
  for (const dir of directions) {
    const nx = x + dir.dx;
    const ny = y + dir.dy;
    
    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] !== 'wall') {
      neighbors.push({ x: nx, y: ny });
    }
  }
  
  return neighbors;
}

// --- Main Component ---

export default function MazeSearchViz({
  cellSize = 16,
  wallColor = "#000000",
  pathColor = "#000000",
  visitedColor = "#000000",
  startColor = "#10b981",
  endColor = "#ef4444",
  bgColor = "#000000",
  opacity = 0.95,
  tickMs = 1,
  algorithmSwitchMs = 10000000,
}: Props = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({ 
          width: containerRef.current.clientWidth, 
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;
  
  // Sizing logic for perfect fit and odd number of cells (>= 19)
  const baseCols = Math.max(19, Math.floor(width / cellSize));
  const cols = baseCols % 2 === 0 ? baseCols - 1 : baseCols;

  const baseRows = Math.max(19, Math.floor(height / cellSize));
  const rows = baseRows % 2 === 0 ? baseRows - 1 : baseRows;
  
  const [maze, setMaze] = useState<CellType[][]>(() => generateMaze(rows, cols));
  const [algorithm, setAlgorithm] = useState<Algorithm>('DFS');
  const [visited, setVisited] = useState<boolean[][]>(Array(rows).fill(0).map(() => Array(cols).fill(false)));
  const [path, setPath] = useState<Point[]>([]);
  const [start, setStart] = useState<Point>({ x: 1, y: 1 });
  const [end, setEnd] = useState<Point>({ x: cols - 2, y: rows - 2 });
  const [isSearching, setIsSearching] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [frontier, setFrontier] = useState<Point[]>([]);
  
  // --- Refs and Search State ---
  const mazeRef = useRef(maze);
  const visitedRef = useRef(visited);
  const frontierRef = useRef(frontier);
  const pathRef = useRef(path);
  const isSearchingRef = useRef(isSearching);
  const isCompleteRef = useRef(isComplete);
  const algorithmRef = useRef(algorithm);
  
  mazeRef.current = maze;
  visitedRef.current = visited;
  frontierRef.current = frontier;
  pathRef.current = path;
  isSearchingRef.current = isSearching;
  isCompleteRef.current = isComplete;
  algorithmRef.current = algorithm;
  
  const lastStep = useRef(0);
  const lastAlgorithmSwitch = useRef(0);
  const animationRef = useRef<number | null>(null);
  const cameFrom = useRef(new Map<string, Point>());
  
  const stepSearch = useCallback(() => {
    if (!isSearchingRef.current || isCompleteRef.current) return;
    
    const currentFrontier = [...frontierRef.current];
    if (currentFrontier.length === 0) {
      const startPoint = { x: start.x, y: start.y };
      currentFrontier.push(startPoint);
      const newVisited = [...visitedRef.current.map(row => [...row])];
      newVisited[start.y][start.x] = true;
      setVisited(newVisited);
      setFrontier(currentFrontier);
      cameFrom.current.set(`${start.x},${start.y}`, { x: -1, y: -1 });
      return;
    }
    
    let current: Point;
    if (algorithmRef.current === 'BFS') {
      current = currentFrontier.shift()!;
    } else if (algorithmRef.current === 'DFS') {
      current = currentFrontier.pop()!;
    } else {
      let lowestIndex = 0;
      let lowestF = Infinity;
      
      for (let i = 0; i < currentFrontier.length; i++) {
        const node = currentFrontier[i];
        const h = Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
        const f = h; 
        
        if (f < lowestF) {
          lowestF = f;
          lowestIndex = i;
        }
      }
      
      current = currentFrontier[lowestIndex];
      currentFrontier.splice(lowestIndex, 1);
    }
    
    if (current.x === end.x && current.y === end.y) {
      const path: Point[] = [];
      let curr = current;
      
      while (cameFrom.current.has(`${curr.x},${curr.y}`)) {
        path.push(curr);
        const prev = cameFrom.current.get(`${curr.x},${curr.y}`)!;
        if (prev.x === -1 && prev.y === -1) break;
        curr = prev;
      }
      
      const fullPath = path.reverse();
      if (fullPath[0]?.x !== start.x || fullPath[0]?.y !== start.y) {
        fullPath.unshift(start);
      }
      if (fullPath[fullPath.length - 1]?.x !== end.x || fullPath[fullPath.length - 1]?.y !== end.y) {
        fullPath.push(end);
      }
      
      setPath(fullPath);
      setIsComplete(true);
      setIsSearching(false);
      return;
    }
    
    const neighbors = getNeighbors(current, rows, cols, mazeRef.current);
    const newVisited = [...visitedRef.current.map(row => [...row])];
    
    for (const neighbor of neighbors) {
      const key = `${neighbor.x},${neighbor.y}`;
      if (!newVisited[neighbor.y][neighbor.x]) {
        newVisited[neighbor.y][neighbor.x] = true;
        currentFrontier.push(neighbor);
        cameFrom.current.set(key, current);
      }
    }
    
    setVisited(newVisited);
    setFrontier(currentFrontier);
  }, [rows, cols, start, end]);
  
  const pathFoundTimeRef = useRef(0);
  const pathDisplayDuration = 4000;
  
  const animate = useCallback((timestamp: number) => {
    if (!lastStep.current) lastStep.current = timestamp;
    if (!lastAlgorithmSwitch.current) lastAlgorithmSwitch.current = timestamp;
    
    const dt = timestamp - lastStep.current;
    
    if (isCompleteRef.current && pathRef.current.length > 0) {
      const pathIncludesEnd = pathRef.current.some(point => 
        point.x === end.x && point.y === end.y
      );
      
      if (!pathFoundTimeRef.current && pathIncludesEnd) {
        pathFoundTimeRef.current = timestamp;
      }
      
      if (pathFoundTimeRef.current && timestamp - pathFoundTimeRef.current > pathDisplayDuration) {
        const algorithms: Algorithm[] = ['BFS', 'DFS', 'A*'];
        const currentIndex = algorithms.indexOf(algorithmRef.current);
        const nextAlgorithm = algorithms[(currentIndex + 1) % algorithms.length];
        
        const newMaze = generateMaze(rows, cols);
        setMaze(newMaze);
        setAlgorithm(nextAlgorithm);
        setVisited(Array(rows).fill(0).map(() => Array(cols).fill(false)));
        setPath([]);
        setFrontier([]);
        setIsSearching(true);
        setIsComplete(false);
        cameFrom.current = new Map();
        
        const startPoint = { x: 1, y: 1 };
        const endPoint = { x: cols - 2, y: rows - 2 };
        setStart(startPoint);
        setEnd(endPoint);
        
        lastAlgorithmSwitch.current = timestamp;
        pathFoundTimeRef.current = 0;
      }
    } else if (!isCompleteRef.current && timestamp - lastAlgorithmSwitch.current > algorithmSwitchMs * 1.5) {
      const newMaze = generateMaze(rows, cols);
      setMaze(newMaze);
      setVisited(Array(rows).fill(0).map(() => Array(cols).fill(false)));
      setPath([]);
      setFrontier([]);
      setIsSearching(true);
      setIsComplete(false);
      cameFrom.current = new Map();
      lastAlgorithmSwitch.current = timestamp;
    } else if (dt > tickMs && isSearchingRef.current) {
      stepSearch();
      lastStep.current = timestamp;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [algorithmSwitchMs, cols, rows, stepSearch, tickMs, end.x, end.y]);
  
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);
  
  useEffect(() => {
    if (width === 0 || height === 0) return;

    const newMaze = generateMaze(rows, cols);
    setMaze(newMaze);
    setVisited(Array(rows).fill(0).map(() => Array(cols).fill(false)));
    setPath([]);
    setFrontier([]);
    setIsSearching(true);
    setIsComplete(false);
    cameFrom.current = new Map();
    
    const startPoint = { x: 1, y: 1 };
    const endPoint = { x: cols - 2, y: rows - 2 };
    setStart(startPoint);
    setEnd(endPoint);
  }, [cols, rows, width, height]);
  
  const renderMaze = useMemo(() => {
    if (width === 0 || height === 0) return [];

    const cells: JSX.Element[] = [];
    const radius = cellSize / 3;
    const svgWidth = cols * cellSize;
    const svgHeight = rows * cellSize;
    
    cells.push(
      <rect
        key="background"
        x={0}
        y={0}
        width={svgWidth} 
        height={svgHeight}
        fill="#ffffff"
      />
    );
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cellType = maze[y]?.[x] || 'empty';
        
        if (cellType === 'wall') {
          cells.push(
            <rect
              key={`wall-${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill={wallColor}
              opacity={0.15}
            />
          );
        }
      }
    }
    
    const visitedPoints: Point[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (visited[y]?.[x] && maze[y]?.[x] !== 'wall' && 
            !(x === start.x && y === start.y) && 
            !(x === end.x && y === end.y)) {
          visitedPoints.push({x, y});
        }
      }
    }
    
    visitedPoints.forEach((point) => {
      cells.push(
        <circle
          key={`visited-${point.x}-${point.y}`}
          cx={point.x * cellSize + cellSize / 2}
          cy={point.y * cellSize + cellSize / 2}
          r={radius * 0.35}
          fill="#000000"
          opacity={0.4}
        />
      );
    });
    
    if (path.length > 1) {
      let pathString = '';
      for (let i = 0; i < path.length; i++) {
        const point = path[i];
        const px = point.x * cellSize + cellSize / 2;
        const py = point.y * cellSize + cellSize / 2;
        
        if (i === 0) {
          pathString += `M ${px} ${py}`;
        } else {
          pathString += ` L ${px} ${py}`;
        }
      }
      
      if (pathString) {
        cells.push(
          <path
            key="path-main"
            d={pathString}
            stroke={pathColor}
            strokeWidth={radius * .5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        );
        
        path.forEach((point, i) => {
          cells.push(
            <circle
              key={`path-junction-${i}`}
              cx={point.x * cellSize + cellSize / 2}
              cy={point.y * cellSize + cellSize / 2}
              r={radius * 1}
              fill={pathColor}
            />
          );
        });
      }
    }
    
    cells.push(
      <circle
        key="start"
        cx={start.x * cellSize + cellSize / 2}
        cy={start.y * cellSize + cellSize / 2}
        r={cellSize / 2.5}
        fill={startColor}
        stroke="#ffffff"
        strokeWidth="0.5"
      />
    );
    
    cells.push(
      <circle
        key="end"
        cx={end.x * cellSize + cellSize / 2}
        cy={end.y * cellSize + cellSize / 2}
        r={cellSize / 2.5}
        fill={endColor}
      />
    );
    
    return cells;
  }, [maze, visited, path, rows, cols, cellSize, wallColor, pathColor, startColor, endColor, start, end, width, height]);
  
  const algorithmLabel = useMemo(() => {
    const labels: Record<Algorithm, string> = {
      'BFS': 'Breadth-First Search',
      'DFS': 'Depth-First Search',
      'A*': 'A* Search'
    };
    return labels[algorithm] || algorithm;
  }, [algorithm]);

  const svgWidth = cols * cellSize;
  const svgHeight = rows * cellSize;
  
  const labelMargin = 5;
  const labelX = svgWidth - labelMargin;
  const labelY = svgHeight - labelMargin;
  
  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100vh - 80px)',
        opacity,
        backgroundColor: '#ffffff',
        zIndex: -1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg 
        width={svgWidth} 
        height={svgHeight}
      >
        {renderMaze}
        {/* Updated label to be in the bottom right of the maze canvas */}
        <text
          x={labelX} 
          y={labelY} 
          fontSize="9"
          fontWeight="bold"
          fontFamily="monospace"
          fill="rgba(0,0,0,0.6)"
          textAnchor="end" // Align text to the right end
          style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)' }}
        >
          {algorithmLabel}
        </text>
      </svg>
    </div>
  );
}