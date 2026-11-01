import React, { useState } from "react";
import { colors, fonts } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";
import ProjectCard, { ProjectCardData } from "./projectscard";

const FEATURED: ProjectCardData[] = [
  {
    title: "labnode + Gantry Manager",
    kind: "Lab automation",
    year: "2026",
    image: require("../../assets/images/gantry-lab.png"),
    summary:
      "The lab automation stack from my research at Berkeley Lab. labnode wraps an instrument in a small FastAPI service with a background worker and busy/done/error status. Gantry Manager schedules one gantry moving samples between stations over HTTP, enforcing station and motion constraints, and ships simulated nodes so the whole lab runs on one machine.",
    tags: ["Python", "FastAPI", "Scheduling"],
    linkUrl: "https://github.com/henrybon806/gantry-manager",
  },
  {
    title: "ARES",
    kind: "Data pipeline + Discord bot",
    year: "2024–Present",
    image: require("../../assets/images/ares-bot.png"),
    summary:
      "Stats for FIRST Tech Challenge robotics, used by 500+ students nationwide. A Rust pipeline pulls each season from the FIRST API, solves per-team OPR, ranks every team, and upserts to Supabase on a schedule. A Rust Discord bot serves team stats, match predictions and live results, alongside a TypeScript web front end.",
    tags: ["Rust", "TypeScript", "Supabase", "Discord"],
    linkUrl: "https://ares-bot.com",
  },
  {
    title: "Spike Inclusive",
    kind: "iPad app",
    year: "2023–Present",
    image: require("../../assets/images/spike-inclusive.png"),
    summary:
      "React Native iPad app for accessible LEGO Spike Prime programming. I wrote the BLE layer between iOS and the robot hub, including message encoding, chunking, and full opcode support. Used by 50+ students in the Catalina Foothills School District.",
    tags: ["React Native", "iOS", "BLE"],
    linkUrl: "https://apps.apple.com/us/app/spike-inclusive/id6751004045",
  },
];

const MORE: ProjectCardData[] = [
  {
    title: "Flow-kode",
    kind: "Agent tooling",
    year: "2025",
    summary: "AI code-agent platform built on a VS Code fork. I built the custom task UI for project workflows, refactoring and autonomous development tasks, backed by a multi-step agent service.",
    tags: ["TypeScript", "VS Code", "Agents"],
    linkUrl: "https://github.com/flow-kode/flow-kode",
  },
  {
    title: "FitRealm",
    kind: "Mobile app",
    year: "2025",
    summary: "Gamified fitness app with AI-generated workouts and quests from the OpenAI API, social guilds, and progress tracking. Supabase backend with role-based auth and row-level security.",
    tags: ["React Native", "Supabase", "OpenAI API"],
    linkUrl: "https://github.com/henrybon806/fit-realm",
  },
  {
    title: "Tradr",
    kind: "Data layer",
    year: "2025",
    summary: "Data layer for an AI trading bot: pluggable providers for real-time financial news and stock prices behind one fetching interface.",
    tags: ["Python", "APIs"],
    linkUrl: "https://github.com/henrybon806/tradr",
  },
  {
    title: "Hacker Badge System",
    kind: "Web app",
    year: "2024",
    summary: "Hackathon check-in site: attendees create a profile, and staff look it up by name or scan its QR code. Backed by Firebase Firestore.",
    tags: ["JavaScript", "Firebase"],
    linkUrl: "https://github.com/henrybon806/hackathon-badges",
  },
  {
    title: "Hoax Hunter",
    kind: "iOS app",
    year: "2023",
    summary: "Fact-checking iOS app with a custom Create ML model trained on 100+ curated news articles. Published on the App Store.",
    tags: ["Swift", "Create ML", "Firebase"],
    linkUrl: "https://github.com/henrybon806/hoax-hunter",
  },
  {
    title: "RMSSD Android App",
    kind: "Research app",
    year: "2023–2024",
    summary: "Collects heart rate and HRV (RMSSD) from BLE EKG sensors for stress analysis in human trials, with on-device computation and exports.",
    tags: ["Android", "Kotlin", "BLE"],
  },
  {
    title: "FTC Autonomous Stack",
    kind: "Robotics",
    year: "2020–2024",
    summary: "Autonomous navigation for a state-champion robotics team: computer vision pipelines and trajectory planning.",
    tags: ["Java", "OpenCV", "Road Runner"],
    linkUrl: "https://github.com/Pioneer-Robotics",
  },
  {
    title: "Pacman AI (CS 188)",
    kind: "Coursework",
    year: "2025",
    summary: "Search with A* heuristics, value iteration for MDPs, tabular and approximate Q-learning, and Bayes net / HMM inference with particle filtering.",
    tags: ["Python", "RL", "Search"],
  },
  {
    title: "Gitlet",
    kind: "Coursework",
    year: "2025",
    summary: "Version-control system in Java with commits, branches, merges, and persistent serialized trees.",
    tags: ["Java", "Data Structures"],
  },
  {
    title: "BearMaps",
    kind: "Coursework",
    year: "2025",
    summary: "Rastering, routing, and search over OpenStreetMap data using QuadTree rastering and A* routing.",
    tags: ["Java", "A*"],
  },
  {
    title: "Build Your Own World",
    kind: "Coursework",
    year: "2025",
    summary: "Seeded procedural world generation with rooms and corridors, plus a save/load and replay engine.",
    tags: ["Java", "Algorithms"],
  },
  {
    title: "Scheme Interpreter",
    kind: "Coursework",
    year: "2024",
    summary: "Interpreter with environments, special forms, macros, and tail calls.",
    tags: ["Python", "Interpreters"],
  },
];

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);

  return (
    <Container>
      <SectionTitle title="Projects" />
      {FEATURED.map((p) => <ProjectCard key={p.title} data={p} />)}
      {showAll && MORE.map((p) => <ProjectCard key={p.title} data={p} />)}
      <Pressable
        accessibilityRole="button"
        onPress={() => setShowAll((s) => !s)}
        style={({ pressed }) => [styles.toggle, pressed && { opacity: 0.7 }]}
      >
        <Text style={styles.toggleText}>
          {showAll ? "Show fewer ↑" : `Show ${MORE.length} more ↓`}
        </Text>
      </Pressable>
    </Container>
  );
}

const styles = StyleSheet.create({
  toggle: {
    alignSelf: "flex-start",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  toggleText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.text,
  },
});
