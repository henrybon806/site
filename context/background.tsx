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
type Algorithm = 'BFS' | 'DFS' | 'A*';

interface Point {
  x: number;
  y: number;
}

export default function MazeSearchViz({
  cellSize = 16,
  wallColor = "#000000",
  pathColor = "#ffffff", 
  visitedColor = "#000000",
  startColor = "#10b981", // Restored green color for start point
  endColor = "#ef4444",
  bgColor = "#000000",
  opacity = 0.95,
  tickMs = 30,
  algorithmSwitchMs = 10000,
}: Props = {}) {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight - 80 });
  
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight - 80 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = dimensions;
  
  const cols = Math.max(19, Math.floor(width / cellSize) | 1);
  const rows = Math.max(19, Math.floor(height / cellSize) | 1);
  
  const [maze, setMaze] = useState<CellType[][]>(() => generateMaze(rows, cols));
  const [algorithm, setAlgorithm] = useState<Algorithm>('BFS');
  const [visited, setVisited] = useState<boolean[][]>(Array(rows).fill(0).map(() => Array(cols).fill(false)));
  const [path, setPath] = useState<Point[]>([]);
  const [start, setStart] = useState<Point>({ x: 1, y: 1 });
  const [end, setEnd] = useState<Point>({ x: cols - 2, y: rows - 2 });
  const [isSearching, setIsSearching] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [frontier, setFrontier] = useState<Point[]>([]);
  
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
      // Initialize the search with the start point
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
        const f = Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
        if (f < lowestF) {
          lowestF = f;
          lowestIndex = i;
        }
      }
      
      current = currentFrontier[lowestIndex];
      currentFrontier.splice(lowestIndex, 1);
    }
    
    // If we've reached the end point
    if (current.x === end.x && current.y === end.y) {
      const path: Point[] = [];
      let curr = current;
      
      // Reconstruct path from end to start
      while (cameFrom.current.has(`${curr.x},${curr.y}`)) {
        path.push(curr);
        const prev = cameFrom.current.get(`${curr.x},${curr.y}`)!;
        if (prev.x === -1) break;
        curr = prev;
      }
      
      // Make sure to include the endpoint in the path
      const endPoint = path.find(p => p.x === end.x && p.y === end.y);
      if (!endPoint) {
        path.push(end);
      }
      
      setPath(path.reverse());
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
  const pathDisplayDuration = 4000; // Even longer display time (4 seconds) to ensure we see the completed path to the end
  
  const animate = useCallback((timestamp: number) => {
    if (!lastStep.current) lastStep.current = timestamp;
    if (!lastAlgorithmSwitch.current) lastAlgorithmSwitch.current = timestamp;
    
    const dt = timestamp - lastStep.current;
    
    // Only proceed to next algorithm if current one has completed (found path to end)
    if (isCompleteRef.current && pathRef.current.length > 0) {
      // Ensure the path actually includes the endpoint
      const pathIncludesEnd = pathRef.current.some(point => 
        point.x === end.x && point.y === end.y
      );
      
      // Only mark path found time if we've actually reached the endpoint
      if (!pathFoundTimeRef.current && pathIncludesEnd) {
        pathFoundTimeRef.current = timestamp;
      }
      
      // Only switch algorithms after showing the complete path for pathDisplayDuration
      // AND if the path actually reached the endpoint
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
  }, [algorithmSwitchMs, cols, rows, stepSearch, tickMs]);
  
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);
  
  useEffect(() => {
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
  }, [cols, rows]);
  
  const renderMaze = useMemo(() => {
    const cells: JSX.Element[] = [];
    const radius = cellSize / 3;
    
    // Add a background rect to ensure the SVG area is clickable
    cells.push(
      <rect
        key="background"
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#ffffff" // White background
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
              opacity={0.15} // Black walls with higher opacity
            />
          );
        }
      }
    }
    
    // Connect visited cells with lines to create a continuous exploration trail
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
    
    // Sort visited points by the order they might have been visited (approximate)
    visitedPoints.sort((a, b) => {
      const distA = Math.abs(a.x - start.x) + Math.abs(a.y - start.y);
      const distB = Math.abs(b.x - start.x) + Math.abs(b.y - start.y);
      return distA - distB;
    });
    
    // Draw small black dots at visited cells
    visitedPoints.forEach((point, index) => {
      cells.push(
        <circle
          key={`visited-${point.x}-${point.y}`}
          cx={point.x * cellSize + cellSize / 2}
          cy={point.y * cellSize + cellSize / 2}
          r={radius * 0.25}
          fill="#000000"
          opacity={0.4}
        />
      );
    });
    
    if (path.length > 1) {
      // First, create a continuous path as a single element
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
        // Add the main path with thick stroke
        cells.push(
          <path
            key="path-main"
            d={pathString}
            stroke={pathColor}
            strokeWidth={radius * 1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={1}
          />
        );
        
        // Add connecting circles at each bend/junction to make it look like a continuous snake
        path.forEach((point, i) => {
          cells.push(
            <circle
              key={`path-junction-${i}`}
              cx={point.x * cellSize + cellSize / 2}
              cy={point.y * cellSize + cellSize / 2}
              r={radius * 0.9}
              fill={pathColor}
              opacity={1}
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
  }, [maze, visited, frontier, path, rows, cols, cellSize, wallColor, visitedColor, pathColor, startColor, endColor, start, end]);
  
  const algorithmLabel = useMemo(() => {
    const labels: Record<Algorithm, string> = {
      'BFS': 'Breadth-First Search',
      'DFS': 'Depth-First Search',
      'A*': 'A* Search'
    };
    return labels[algorithm] || algorithm;
  }, [algorithm]);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity,
      backgroundColor: '#ffffff', // White background
      zIndex: -1
    }}>
      <svg width={width} height={height}>
        {renderMaze}
        {/* Add algorithm label as text within SVG */}
        <text
          x={width - 120}
          y={height - 20}
          fontSize="11"
          fontFamily="monospace"
          fill="rgba(0,0,0,0.5)"
          textAnchor="end"
        >
          {algorithmLabel}
        </text>
      </svg>
    </div>
  );
}

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