import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { center?: boolean };

export default function BioParagraphs({ center = false }: Props) {
  return (
    // The main wrap uses vertical margin for better spacing from surrounding content
    <View style={styles.wrap}>
      <View style={center ? styles.centerWrap : undefined}>
        
        {/* Paragraph 1 */}
        <Text style={[styles.p, center && styles.centerP]}>
        I’m Henry Bonomolo, a UC Berkeley Computer Science undergrad (CDSS, ’27) who loves
        turning messy, real-world problems into tools people actually use. I’ve built systems
        across education and robotics, like <Text style={{fontWeight: "700"}}>ARES</Text>, a public FTC analytics
        platform + Discord bot, and <Text style={{fontWeight: "700"}}>Spike Inclusive</Text>, an iPad app that helps
        students program LEGO Spike robots in more accessible ways. I get a kick out of shipping
        things that help teams learn faster and make better decisions.
        </Text>

        {/* Paragraph 2 */}
        <Text style={[styles.p, center && styles.centerP]}>
        Around Berkeley I split time between coursework (CS61A/B, CS70, CS188, Math 54), Mobile
        Developers of Berkeley, and research-y side quests. I’ve worked on a Solar Data API
        pipeline at Energesque, built an Android + RMSSD heartbeat app for stress research at the
        University of Arizona, and I regularly dive into reinforcement learning, cryptography, and
        systems. I’ve led FTC robotics teams and mentor others, ARES grew straight out of that
        community’s needs.
        </Text>

        {/* Paragraph 3 */}
        <Text style={[styles.p, center && styles.centerP]}>
        Lately I’m exploring GPU-accelerated EDA heuristics, practical ML for decision-making, and
        clean end-to-end product seams, from data to UI. I value clear APIs, reproducibility, and
        shipping over slideware. If it helps someone build, learn, or compete in the real world,
        I’m in.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Adjusted wrap to handle spacing between component instances
  wrap: { 
    paddingVertical: 16, 
  },
  p: {
    fontSize: 15, // Slightly larger font improves mobile readability
    lineHeight: 23, // Increased line height improves text flow
    color: "#1f2937", // Slightly darker color for better contrast
    marginBottom: 16, // Use bottom margin to create consistent paragraph separation
  },
  centerP: {
    textAlign: "center",
  },
  centerWrap: {
    alignSelf: "center",
    width: "100%",
  },
});