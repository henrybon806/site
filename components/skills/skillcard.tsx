import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type SkillItem = {
  title: string;
  sub?: string;
  blurb: string;
  bullets?: string[];
  tone?: "indigo" | "blue" | "teal" | "purple" | "rose" | "amber";
};

const toneMap = {
  indigo: { bg: "#EEF2FF", dot: "#6366F1" },
  blue:   { bg: "#EFF6FF", dot: "#3B82F6" },
  teal:   { bg: "#F0FDFA", dot: "#14B8A6" },
  purple: { bg: "#F5F3FF", dot: "#8B5CF6" },
  rose:   { bg: "#FFF1F2", dot: "#F43F5E" },
  amber:  { bg: "#FFFBEB", dot: "#F59E0B" },
};

export default function SkillCard({ title, sub, blurb, bullets = [], tone = "indigo" }: SkillItem) {
  const t = toneMap[tone];
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: t.bg, borderColor: t.dot }]}>
        <View style={[styles.dot, { backgroundColor: t.dot }]} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {sub ? <Text style={styles.sub}>{sub}</Text> : null}
        <Text style={styles.blurb}>{blurb}</Text>
        {bullets.length ? (
          <View style={styles.list}>
            {bullets.map((b, i) => (
              <View key={i} style={styles.liRow}>
                <View style={[styles.liDot, { backgroundColor: t.dot }]} />
                <Text style={styles.liText}>{b}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  icon: { alignSelf: "flex-start", borderRadius: 10, borderWidth: 1, padding: 6 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  body: { gap: 6 },
  title: { fontSize: 16, fontWeight: "800", color: "#111827" },
  sub: { fontSize: 13, color: "#6B7280" },
  blurb: { fontSize: 14, color: "#374151", lineHeight: 20 },
  list: { marginTop: 6, gap: 6 },
  liRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  liDot: { width: 8, height: 8, borderRadius: 4 },
  liText: { fontSize: 14, color: "#374151" },
});