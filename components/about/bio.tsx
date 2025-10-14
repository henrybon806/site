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
        Hi! I’m Henry Bonomolo, a UC Berkeley Computer Science undergrad who likes building systems that solve real problems. Most of my work sits where education, data, and robotics overlap. I built ARES (analytical robotics evaluation system), a public FTC analytics platform and Discord bot used by hundreds of robotics teams, and Spike Inclusive, an iPad app that helps students program LEGO Spike robots in more accessible ways. What keeps me hooked is turning chaotic ideas into things that actually make a difference for teams on the ground.
        </Text>

        <Text style={[styles.p, center && styles.centerP]}>
        I split my time between building, mentoring, and research-heavy side projects. At Energesque I designed a solar data API pipeline, and at the University of Arizona I helped build an Android app that measures heart activity for stress research. I still work closely with the FTC community I came from (ARES started as a tool I wished I had while leading and mentoring robotics teams).
        </Text>

        <Text style={[styles.p, center && styles.centerP]}>
        Lately I’ve been diving into GPU-accelerated design automation, machine learning for decision-making, and the art of keeping data pipelines and interfaces simple enough to trust. I care about clarity, reproducibility, and actually shipping things. If it helps people build, learn, or compete better, that’s where I want to be.
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