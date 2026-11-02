import { colors, fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Container from "../layout/container";
import Entry from "../layout/entry";
import OrgLogo from "../layout/orglogo";
import SectionTitle from "./title";

// Ongoing roles first, then past roles, each newest first.
const EXPERIENCE = [
  {
    title: "Research Assistant · Lawrence Berkeley National Lab",
    url: "https://www.lbl.gov",
    logo: require("../../assets/images/logos/lbnl.png"),
    date: "Sep 2025–Present",
    points: [
      "Building the system that runs a lab of autonomous laser experiments: each station's computer exposes its own API, and a central scheduler queues tasks and monitors every station.",
      "Wrote BFS-based motion planning for the 3-axis gantry that moves samples between stations.",
      "Trained a PyTorch model that finds the horizon line in droplet images for contact angle measurement; it runs in real time on the lab's live camera feed.",
    ],
    kind: "Research",
    tags: ["Python", "FastAPI", "PyTorch", "Distributed systems"],
  },
  {
    title: "Project Manager · Mobile Developers of Berkeley",
    url: "https://mdb.dev",
    logo: require("../../assets/images/logos/mdb.png"),
    date: "Jan 2025–Present",
    points: [
      "Lead a team of 10+ developers building full-stack products end to end for startups.",
      "Currently building the web UI and data workflows for Baro, an early-stage startup.",
    ],
    kind: "Leadership",
    tags: ["React Native", "TypeScript", "Supabase"],
  },
  {
    title: "AI & Cloud Engineer Intern · Oracle",
    url: "https://www.oracle.com",
    logo: require("../../assets/images/logos/oracle.png"),
    date: "May–Aug 2026",
    points: [
      "Filed a patent application for graph-based agent workflows I designed and integrated into Oracle Fusion, which let agents build workflows autonomously.",
      "Built agent tooling and the APIs behind it with customers on Oracle Cloud Infrastructure.",
      "Automated node-level token consumption reports for those workflows with Oracle AI Data Platform.",
    ],
    kind: "Internship",
    tags: ["OCI", "Oracle Fusion", "API design", "Agents"],
  },
  {
    title: "Reader · CS 188, UC Berkeley",
    url: "https://inst.eecs.berkeley.edu/~cs188/",
    logo: require("../../assets/images/logos/berkeley.png"),
    date: "Jun–Aug 2026",
    points: [
      "Wrote exam questions and supported exam infrastructure for Introduction to Artificial Intelligence.",
      "Taught students one-on-one in office hours.",
    ],
    kind: "Teaching",
    tags: ["Python", "AI"],
  },
  {
    title: "Solar Data API Intern · Energesque",
    url: "https://www.linkedin.com/company/energesque",
    logo: require("../../assets/images/logos/energesque.png"),
    date: "Aug 2024–May 2025",
    points: [
      "Built APIs that process, clean, and aggregate solar irradiance data for machine-learning energy forecasts.",
      "Wrote a Java utility that normalizes large JSON datasets into CSV for analysis.",
    ],
    kind: "Internship",
    tags: ["Python", "Java", "REST"],
  },
];

// The rail is a timeline from now (top) back to the first role (bottom).
// Ongoing roles are marked "Current" next to their kind.
export default function ExperiencePage() {
  const isCurrent = (date: string) => date.endsWith("Present");
  const firstYear = EXPERIENCE[EXPERIENCE.length - 1].date.match(/\d{4}/)?.[0];

  return (
    <Container>
      <SectionTitle title="Experience" />
      {EXPERIENCE.map((e) => (
        <View key={e.title} style={styles.row}>
          <View style={styles.rail}>
            <View style={styles.lineTop} />
            <View style={styles.dot} />
            <View style={styles.line} />
          </View>
          <View style={styles.logo}>
            <OrgLogo source={e.logo} url={e.url} />
          </View>
          <View style={styles.entry}>
            <Entry
              title={e.title}
              orgUrl={e.url}
              date={e.date}
              points={e.points}
              tags={e.tags}
              kind={isCurrent(e.date) ? `${e.kind} · Current` : e.kind}
            />
          </View>
        </View>
      ))}
      <Text style={styles.railLabel}>{firstYear}</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  rail: { width: 9, alignItems: "center", marginRight: 18 },
  // Same color and weight as the maze paths, so the timeline reads as the same thread.
  lineTop: { height: 6, width: 1.5, backgroundColor: colors.accent, opacity: 0.35 },
  line: { flex: 1, width: 1.5, backgroundColor: colors.accent, opacity: 0.35 },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.accent,
    backgroundColor: colors.bg,
  },
  railLabel: {
    width: 40,
    marginLeft: -15.5, // centers the label over the 9px rail
    textAlign: "center",
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.muted,
    paddingVertical: 4,
  },
  logo: { marginRight: 14 },
  entry: { flex: 1 },
});
