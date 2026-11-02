import { fonts } from "@/constants/theme";
import React from "react";

// Small architecture diagrams for the featured projects, drawn in the mazes' thin-line style.
// Coordinates are in a 208x152 viewBox (the project thumbnail size); the SVG scales to fit.

type Node = { id: string; x: number; y: number; w: number; label: string; sub?: string; accent?: boolean };
type Edge = { from: string; to: string; label?: string };
export type DiagramSpec = { nodes: Node[]; edges: Edge[] };

const H = 22; // node height

function anchor(n: Node, toward: Node) {
  const cx = n.x + n.w / 2, cy = n.y + H / 2;
  const tx = toward.x + toward.w / 2, ty = toward.y + H / 2;
  // Side by side (no horizontal overlap): leave from the facing side; stacked: from top/bottom.
  const sideBySide = toward.x >= n.x + n.w || toward.x + toward.w <= n.x;
  if (sideBySide) return { x: tx > cx ? n.x + n.w : n.x, y: cy };
  return { x: cx, y: ty > cy ? n.y + H : n.y };
}

export default function Diagram({ spec, title }: { spec: DiagramSpec; title: string }) {
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox="0 0 208 152" width="100%" height="100%" role="img" aria-label={`${title} architecture`}>
      <defs>
        <marker id={`arrow-${title}`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" style={{ fill: "var(--muted)" }} />
        </marker>
      </defs>
      {spec.edges.map((e, i) => {
        const a = anchor(byId[e.from], byId[e.to]);
        const b = anchor(byId[e.to], byId[e.from]);
        // Right-angle connector, like a maze path.
        const midX = (a.x + b.x) / 2;
        const horizontal = a.y === byId[e.from].y + H / 2;
        const d = horizontal ? `M${a.x},${a.y} H${midX} V${b.y} H${b.x}` : `M${a.x},${a.y} V${(a.y + b.y) / 2} H${b.x} V${b.y}`;
        return (
          <g key={i}>
            <path d={d} fill="none" markerEnd={`url(#arrow-${title})`} style={{ stroke: "var(--muted)", strokeWidth: 1, opacity: 0.8 }} />
            {e.label ? (
              <text x={horizontal ? (a.x + midX) / 2 : b.x + 3} y={horizontal ? Math.min(a.y, b.y) - 3 : (a.y + b.y) / 2 - 2} textAnchor={horizontal ? "middle" : "start"} style={{ fill: "var(--muted)", fontFamily: fonts.mono, fontSize: 6 }}>
                {e.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {spec.nodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x} y={n.y} width={n.w} height={H} rx={3} style={{ fill: "var(--bg)", stroke: n.accent ? "var(--accent)" : "var(--line)", strokeWidth: n.accent ? 1.2 : 1 }} />
          <text x={n.x + n.w / 2} y={n.y + (n.sub ? 9.5 : 13.5)} textAnchor="middle" style={{ fill: "var(--text)", fontFamily: fonts.mono, fontSize: 7 }}>
            {n.label}
          </text>
          {n.sub ? (
            <text x={n.x + n.w / 2} y={n.y + 17.5} textAnchor="middle" style={{ fill: "var(--muted)", fontFamily: fonts.mono, fontSize: 5.5 }}>
              {n.sub}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

// labnode + Gantry Manager: each instrument is its own labnode HTTP service; the scheduler queues
// samples and drives the gantry between stations.
export const LAB_DIAGRAM: DiagramSpec = {
  nodes: [
    { id: "sim", x: 14, y: 14, w: 64, label: "simulator", sub: "fake nodes" },
    { id: "sched", x: 14, y: 65, w: 64, label: "scheduler", sub: "queue + routes", accent: true },
    { id: "gantry", x: 14, y: 116, w: 64, label: "gantry", sub: "3-axis" },
    { id: "s1", x: 132, y: 14, w: 62, label: "station A", sub: "labnode" },
    { id: "s2", x: 132, y: 65, w: 62, label: "station B", sub: "labnode" },
    { id: "s3", x: 132, y: 116, w: 62, label: "station C", sub: "labnode" },
  ],
  edges: [
    { from: "sim", to: "sched" },
    { from: "sched", to: "gantry" },
    { from: "sched", to: "s1" },
    { from: "sched", to: "s2", label: "HTTP" },
    { from: "sched", to: "s3" },
  ],
};

// ARES: the Rust pipeline solves OPR from the FIRST API into Supabase; the bot and site read it.
export const ARES_DIAGRAM: DiagramSpec = {
  nodes: [
    { id: "first", x: 4, y: 65, w: 44, label: "FIRST API" },
    { id: "db", x: 62, y: 65, w: 48, label: "pipeline", sub: "Rust · OPR", accent: true },
    { id: "supa", x: 140, y: 65, w: 56, label: "Supabase", sub: "Postgres" },
    { id: "site", x: 140, y: 14, w: 56, label: "site", sub: "TypeScript" },
    { id: "bot", x: 140, y: 116, w: 56, label: "bot", sub: "Rust · Discord" },
  ],
  edges: [
    { from: "first", to: "db" },
    { from: "db", to: "supa", label: "upsert" },
    { from: "supa", to: "site" },
    { from: "supa", to: "bot" },
  ],
};

// Spike Inclusive: block programs become Spike opcodes, sent over a custom BLE layer.
export const SPIKE_DIAGRAM: DiagramSpec = {
  nodes: [
    { id: "ui", x: 4, y: 65, w: 58, label: "block editor", sub: "React Native" },
    { id: "ble", x: 76, y: 65, w: 56, label: "BLE layer", sub: "encode · chunk", accent: true },
    { id: "hub", x: 146, y: 65, w: 58, label: "Spike hub", sub: "opcodes" },
  ],
  edges: [
    { from: "ui", to: "ble" },
    { from: "ble", to: "hub" },
  ],
};
