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
        Hi! I'm Henry Bonomolo, a UC Berkeley CS undergrad who likes building systems where education, data, and robotics overlap. I built ARES, a public FTC analytics platform and Discord bot used by hundreds of robotics teams, and Spike Inclusive, an iPad app that makes programming LEGO Spike robots more accessible.
        </Text>

        <Text style={[styles.p, center && styles.centerP]}>
        I'm currently course staff for CS 188 (Intro to AI) at Berkeley, and this summer I interned as an AI and Cloud Engineer at Oracle, building agent tooling on the Oracle AI Data Platform. Before that, I built a solar data API pipeline at Energesque and worked on an Android app measuring heart activity for stress research at the University of Arizona.
        </Text>

        <Text style={[styles.p, center && styles.centerP]}>
        Lately I've been diving into GPU-accelerated design automation and ML for decision-making, always trying to keep pipelines and interfaces simple enough to trust. If it helps people build, learn, or compete better, that's where I want to be.
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