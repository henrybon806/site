import React from "react";
import { View, StyleSheet } from "react-native";
import ExperienceCard, { ExperienceItem } from "./experiencecard";

type Props = { items: ExperienceItem[] };

export default function ExperienceTimeline({ items }: Props) {
  return (
    <View style={styles.timeline}>
      <View style={styles.line} />
      {items.map((item, i) => (
        <View key={i} style={styles.cardWrap}>
          <View style={styles.dot} />
          <ExperienceCard {...item} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  timeline: { position: "relative", paddingLeft: 24 },
  line: {
    position: "absolute",
    left: 8,
    top: 10,
    bottom: 10,
    width: 2,
    backgroundColor: "#C7D2FE",
  },
  cardWrap: { marginBottom: 24, flexDirection: "row", gap: 16, alignItems: "flex-start" },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7C9CF5",
    marginTop: 12,
  },
});