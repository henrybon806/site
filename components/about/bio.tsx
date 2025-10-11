import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BioParagraphs() {
  return (
    <View style={styles.wrap}>
        <Text style={styles.p}>
        I’m Henry Bonomolo, a UC Berkeley Computer Science undergrad (CDSS, ’27) who loves
        turning messy, real-world problems into tools people actually use. I’ve built systems
        across education and robotics, like <Text style={{fontWeight: "700"}}>ARES</Text>, a public FTC analytics
        platform + Discord bot, and <Text style={{fontWeight: "700"}}>Spike Inclusive</Text>, an iPad app that helps
        students program LEGO Spike robots in more accessible ways. I get a kick out of shipping
        things that help teams learn faster and make better decisions.
        </Text>

        <Text style={styles.p}>
        Around Berkeley I split time between coursework (CS61A/B, CS70, CS188, Math 54), Mobile
        Developers of Berkeley, and research-y side quests. I’ve worked on a Solar Data API
        pipeline at Energesque, built an Android + RMSSD heartbeat app for stress research at the
        University of Arizona, and I regularly dive into reinforcement learning, cryptography, and
        systems. I’ve led FTC robotics teams and mentor others, ARES grew straight out of that
        community’s needs.
        </Text>

        <Text style={styles.p}>
        Lately I’m exploring GPU-accelerated EDA heuristics, practical ML for decision-making, and
        clean end-to-end product seams, from data to UI. I value clear APIs, reproducibility, and
        shipping over slideware. If it helps someone build, learn, or compete in the real world,
        I’m in.
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  p: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
  },
});