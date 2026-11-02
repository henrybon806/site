import { colors, fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";

const PARAGRAPHS = [
  "I'm a computer science student at UC Berkeley. I like working on backend and infrastructure, especially when the code ends up controlling real hardware.",
  "At Berkeley Lab I'm in the Laser Technologies Group, automating laser experiments. I built the control layer: every instrument runs as its own FastAPI service with a background worker and a busy/done/error state, and a central scheduler queues samples, enforces station and motion constraints, and drives a 3-axis gantry between stations using BFS path planning. I also trained a PyTorch model that finds the horizon line in droplet images, which now measures contact angles in real time. This past summer at Oracle I designed APIs and graph-based workflows that let agents build their own workflows inside Oracle Fusion, which turned into a patent application.",
  "Outside of that I run a 10+ person dev team at Mobile Developers of Berkeley and keep building ARES, a Rust pipeline that solves OPR for every FIRST Tech Challenge team and feeds a Discord bot used by 500+ students. Spike Inclusive, my iPad app for students with disabilities, talks to LEGO robots over a BLE layer I wrote from scratch, and is used by 50+ students. Most recently, my team's Tendly won the Simular track at the world's largest AI hackathon.",
];

export default function AboutPage() {
  return (
    <Container>
      <SectionTitle title="About" />
      {PARAGRAPHS.map((p, i) => (
        <Text key={i} style={[styles.p, i === PARAGRAPHS.length - 1 && styles.last]}>{p}</Text>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  p: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 26,
    color: colors.body,
    marginBottom: 16,
  },
  // Same trailing space other sections get from their last entry.
  last: { marginBottom: 28 },
});
