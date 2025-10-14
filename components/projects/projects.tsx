import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";
import ProjectGrid from "./projectsgrid";
import { Ionicons } from "@expo/vector-icons";

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);
  const projects = [
    {
      title: "ARES - FTC Analytics",
      year: "2024–present",
      image: require("../../assets/images/ares-bot.png"),
      summary: "Public stats and Discord bot for FTC teams: OPR, rankings, match insights.",
      tags: ["TypeScript", "React/Expo", "Supabase", "Postgres", "Discord Bot"],
      linkText: "View Live Site",
      linkUrl: "https://ares-bot.com",
      details: [
        "Postgres schema, nightly ingest, and cached leaderboards",
        "Slash commands for event lookups and team analytics",
        "Used by teams during competitions"
      ],
      learnings: ["CI caching for Expo web, pragmatic docs, production logging"],
    },
    {
      title: "Spike Inclusive (iPad)",
      year: "2024",
      image: require("../../assets/images/spike-inclusive.png"),
      summary: "Accessible LEGO Spike programming via Bluetooth LE with guided blocks.",
      tags: ["Expo", "iOS", "BLE", "Education"],
      linkText: "View Live App",
      linkUrl: "https://apps.apple.com/us/app/spike-inclusive/id6751004045",
      details: [
        "Custom block flows and error-handling for classrooms",
        "Deployed in district classrooms"
      ],
      learnings: ["BLE reliability, permission UX, offline resilience"],
    },
    {
      title: "FitRealm",
      year: "2024",
      image: require("../../assets/images/fit-realm.png"),
      summary: "Gamified fitness app with quests, streaks, and real-time progress.",
      tags: ["React Native", "TypeScript", "Supabase", "Auth"],
      linkText: "View on Github",
      linkUrl: "https://github.com/henrybon806/FitRealm",
      details: [
        "Role-based auth, row-level security, and realtime updates",
        "Reusable UI kit and theming"
      ],
      learnings: ["Schema-first dev, optimistic UI, session handling"],
    },
    {
      title: "Solar Data API",
      year: "2024",
      image: { uri: "https://placehold.co/640x400?text=Solar+API" },
      summary: "Irradiance/power ETL with normalized REST endpoints for experiments.",
      tags: ["Python", "ETL", "REST", "Data Engineering"],
      // linkText: "Docs",
      // linkUrl: "#",
      details: ["Hourly ingest from public sources", "QC, backfills, token auth, rate limits"],
      learnings: ["ETL reliability, metrics, data contracts"],
    },
    {
      title: "RMSSD Android App",
      year: "2023–present",
      image: { uri: "https://placehold.co/640x400?text=RMSSD+App" },
      summary: "Collects heart rate/HRV (RMSSD) for stress analysis in human trials.",
      tags: ["Android", "Kotlin", "Bluetooth", "Signal Processing"],
      linkText: "View on Github",
      linkUrl: "https://github.com/sethrojas21/Stress_Management_App",
      details: ["BLE EKG integration", "On-device RMSSD computation and exports"],
      learnings: ["Sampling jitter handling, artifact rejection, data privacy"],
    },
    {
      title: "FTC Autonomous Stack",
      year: "2020–2024",
      image: { uri: "https://placehold.co/640x400?text=FTC+Autonomy" },
      summary: "Autonomous navigation and strategy for a state-champion team.",
      tags: ["Robotics", "OpenCV", "Road Runner", "Java"],
      linkText: "View on Github",
      linkUrl: "https://github.com/orgs/Pioneer-Robotics/dashboard",
      details: ["CV pipelines for targets", "Trajectory planning and tuning"],
      learnings: ["Real-world latency, field calibration, test harnesses"],
    },
    {
      title: "MDPs & Value Iteration for Pacman",
      year: "2025",
      image: { uri: "https://placehold.co/640x400?text=CS188+MDP" },
      summary: "Policy evaluation and value iteration for stochastic gridworlds.",
      tags: ["Python", "RL", "MDP"],
      // linkText: "Writeup",
      // linkUrl: "#",
      details: ["Bellman backups, termination detection", "Gamma/epsilon tuning"],
      learnings: ["Convergence behavior, reward shaping"],
    },
    {
      title: "Q-Learning & Approximate Q",
      year: "2025",
      image: { uri: "https://placehold.co/640x400?text=CS188+QL" },
      summary: "Tabular and feature-based Q-learning for Pacman agents.",
      tags: ["Python", "RL"],
      // linkText: "Writeup",
      // linkUrl: "#",
      details: ["Epsilon-greedy exploration", "Feature extractors and weights"],
      learnings: ["Bias-variance in function approximation"],
    },
    {
      title: "Bayes Nets & HMMs",
      year: "2025",
      image: { uri: "https://placehold.co/640x400?text=CS188+BN+HMM" },
      summary: "Exact/approx inference with VE, sampling, and forward-backward.",
      tags: ["Python", "Probabilistic Models"],
      // linkText: "Writeup",
      // linkUrl: "#",
      details: ["Variable elimination", "Particle filtering for tracking"],
      learnings: ["Factor size blowup, resampling effects"],
    },
    {
      title: "Search (UCS, A*, Heuristics)",
      year: "2025",
      image: { uri: "https://placehold.co/640x400?text=CS188+Search" },
      summary: "Grid/maze planners with admissible and consistent heuristics.",
      tags: ["Python", "Algorithms"],
      // linkText: "View on Github",
      // linkUrl: "https://github.com/Berkeley-CS61B-Student/sp25-s115",
      details: ["UCS/A* implementations", "Heuristic design and proofs"],
      learnings: ["Search tree vs graph tradeoffs"],
    },
    {
      title: "Gitlet",
      year: "2025",
      image: { uri: "https://placehold.co/640x400?text=Gitlet" },
      summary: "Java version-control system: commits, branches, merges.",
      tags: ["Java", "Data Structures", "Persistence"],
      linkText: "View on Github",
      linkUrl: "https://github.com/Berkeley-CS61B-Student/sp25-s115",
      details: ["Persistent trees, serialization", "Merge conflict handling"],
      learnings: ["Commit DAGs, file diffs, CLI design"],
    },
    {
      title: "BearMaps",
      year: "2025",
      image: { uri: "https://placehold.co/640x400?text=BearMaps" },
      summary: "Rastering, routing, and search over OpenStreetMap data.",
      tags: ["Java", "R-Trees", "A*"],
      linkText: "View on Github",
      linkUrl: "https://github.com/Berkeley-CS61B-Student/sp25-s115",
      details: ["QuadTree rastering", "A* routing and turn costs"],
      learnings: ["Spatial indexing, tile caching"],
    },
    {
      title: "Build Your Own World",
      year: "2025",
      image: { uri: "https://placehold.co/640x400?text=BYOW" },
      summary: "Procedural world generation and save/load engine.",
      tags: ["Java", "Algorithms"],
      linkText: "View on Github",
      linkUrl: "https://github.com/Berkeley-CS61B-Student/sp25-s115",
      details: ["Seeded map gen, rooms/corridors", "Serialization and replay"],
      learnings: ["PRNG design, content variation"],
    },
    {
      title: "Scheme Interpreter",
      year: "2024",
      image: { uri: "https://placehold.co/640x400?text=Scheme" },
      summary: "Interpreter with environments, special forms, and macros.",
      tags: ["Python", "Interpreters"],
      // linkText: "Repo",
      // linkUrl: "#",
      details: ["Eval/apply loop", "Tail-call behavior"],
      learnings: ["Lexical scoping, REPL ergonomics"],
    },
  ];

  const FEATURED_COUNT = 3; // default number of featured projects to show

  return (
    <>
      <View>
        <Container>
          <SectionTitle title="Projects" accent="#0891B2" />
          <Text style={styles.lead}>
            A few favorites. Tap the <Ionicons name="swap-horizontal-outline" size={12} color="#4B5563" /> on any card to flip for build notes and links.
          </Text>

          <ProjectGrid 
            items={projects.slice(0, FEATURED_COUNT)}
            featured={true}
          />

          {projects.length > FEATURED_COUNT && (
            <View style={styles.moreWrap}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={showAll ? "Show fewer projects" : "Show more projects"}
                onPress={() => setShowAll((s) => !s)}
                style={({ pressed }) => [styles.moreBtn, pressed && { opacity: 0.9 }]}
              >
                <Text style={styles.moreText}>
                  {showAll ? "Show less" : `Show ${projects.length - FEATURED_COUNT} more`}
                </Text>
              </Pressable>
            </View>
          )}
          
          {showAll && projects.length > FEATURED_COUNT && (
            <View style={styles.additionalSection}>
              <ProjectGrid 
                items={projects.slice(FEATURED_COUNT)}
                featured={true} /* Use the same layout for both sections */
              />
            </View>
          )}
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  h1: { textAlign: "center", fontSize: 28, fontWeight: "800", color: "#111827", marginTop: 8 },
  lead: { textAlign: "center", color: "#6B7280", marginVertical: 8 },
  moreWrap: { alignItems: "center", marginTop: 12, marginBottom: 24 },
  moreBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  moreText: { color: "#FFFFFF", fontWeight: "700" },
  additionalSection: { 
    width: '100%',
    marginTop: 8,
    alignItems: 'center'
  },
});