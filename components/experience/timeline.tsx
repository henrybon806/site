import React from "react";
import { StyleSheet, View } from "react-native";
import ExperienceCard, { ExperienceItem } from "./experiencecard";

type Props = { items: ExperienceItem[] };

export default function ExperienceTimeline({ items }: Props) {
  const dotColors = ["#64748b", "#0f766e", "#7c3aed", "#0369a1", "#0891b2"];

  return (
    <View style={styles.timeline}>
      {items.map((item, i) => {
        const dotColor = dotColors[i % dotColors.length];
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        return (
          <View key={i} style={styles.cardWrap}>
            <View style={styles.connectorArea}>
              {/* Line above dot (skip on first) */}
              {!isFirst ? (
                <View style={styles.connectorFlex} />
              ) : (
                <View style={styles.spacerFlex} />
              )}

              {/* Dot */}
              <View style={styles.dotWrapper}>
                <View style={[styles.dot, { backgroundColor: dotColor }]} />
              </View>

              {/* Line below dot (skip on last) */}
              {!isLast ? (
                <View style={styles.connectorFlex} />
              ) : (
                <View style={styles.spacerFlex} />
              )}
            </View>

            <View style={styles.cardContainer}>
              <ExperienceCard {...item} accentColor={dotColor} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  timeline: {
    position: "relative",
  },
  cardWrap: {
    flexDirection: "row",
    alignItems: "stretch", // ensures connector stretches full height
    marginBottom: 32,
  },
  connectorArea: {
    width: 16,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  connectorFlex: {
    flex: 1,
    width: 2,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 1,
  },
  spacerFlex: {
    flex: 1,
    width: 2,
    opacity: 0, // invisible but keeps layout consistent
  },
  dotWrapper: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  cardContainer: {
    flex: 1,
  },
});