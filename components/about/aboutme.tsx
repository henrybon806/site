import { colors, fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";

const PARAGRAPHS = [
  "I'm Henry, a CS student at UC Berkeley. Most of what I build is backend and systems work, like APIs, cloud infrastructure, and software that controls hardware.",
  "I'm a research assistant at Lawrence Berkeley National Lab, where I'm automating laser experiments. Each station has its own computer running an API, and I'm building the central system that queues tasks, moves samples between stations with a gantry, and monitors everything. Last summer I interned at Oracle, building APIs and graph-based workflows for AI agents in Oracle Fusion. I filed a patent application for that work.",
  "I also lead a team of 10+ developers at Mobile Developers of Berkeley. I've been involved in FIRST robotics since high school and still coach and judge FIRST LEGO League, which is where ARES, my stats site and Discord bot for FTC teams, came from. I also built Spike Inclusive, an iPad app that lets students with disabilities program LEGO robots. It's used by 50+ students in my old school district.",
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
