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
    date: "2025–Present",
    body: "Autonomous systems research in the Laser Technologies Group, automating laser experiments across stations with a 3-axis gantry. I'm building the infrastructure that connects each station's computer, running its own API-backed threads, to one central machine that queues tasks and monitors the whole system, and I wrote the gantry's BFS-based motion planning. I also trained a PyTorch model that finds the horizon line in droplet images for contact angle measurement; it now runs in real time on a live camera feed in the lab.",
    kind: "Research",
    tags: ["Python", "FastAPI", "PyTorch", "Distributed systems"],
  },
  {
    title: "Project Manager · Mobile Developers of Berkeley",
    url: "https://mdb.dev",
    logo: require("../../assets/images/logos/mdb.png"),
    date: "2025–Present",
    body: "Lead a team of 10+ developers contracted to build full-stack products end to end for startups. Right now that's Baro, an early-stage startup, where we're building its web UI and data workflows.",
    kind: "Leadership",
    tags: ["React Native", "TypeScript", "Supabase"],
  },
  {
    title: "AI & Cloud Engineer Intern · Oracle",
    url: "https://www.oracle.com",
    logo: require("../../assets/images/logos/oracle.png"),
    date: "2026",
    body: "Built AI-driven workflows for internal cloud systems, working directly with customers on the agent tooling they needed for Oracle Cloud Infrastructure. Designed APIs and graph-based workflows integrated into Oracle Fusion that let agents build workflows autonomously, and automated node-level token consumption reports with Oracle AI Data Platform. Filed a patent application for this work.",
    kind: "Internship",
    tags: ["OCI", "Oracle Fusion", "API design", "Agents"],
  },
  {
    title: "Reader · CS 188, UC Berkeley",
    url: "https://inst.eecs.berkeley.edu/~cs188/",
    logo: require("../../assets/images/logos/berkeley.png"),
    date: "2026",
    body: "Course staff for Introduction to Artificial Intelligence over the summer: wrote exam questions, supported exam infrastructure, and taught students one-on-one in office hours.",
    kind: "Teaching",
    tags: ["Python", "AI"],
  },
  {
    title: "Solar Data API Intern · Energesque",
    url: "https://www.linkedin.com/company/energesque",
    logo: require("../../assets/images/logos/energesque.png"),
    date: "2024–2025",
    body: "Built APIs that process, clean, and aggregate solar irradiance data for machine-learning energy forecasting models, and a Java utility that normalizes large JSON datasets into CSV for analysis.",
    kind: "Internship",
    tags: ["Python", "Java", "REST"],
  },
];

// The rail is a timeline from now (top) back to the first role (bottom).
// Ongoing roles are marked "Current" next to their kind.
export default function ExperiencePage() {
  const isCurrent = (date: string) => date.endsWith("Present");
  const firstYear = EXPERIENCE[EXPERIENCE.length - 1].date.slice(0, 4);

  return (
    <Container>
      <SectionTitle title="Experience" />
      <Text style={styles.railLabel}>Now</Text>
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
              body={e.body}
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
