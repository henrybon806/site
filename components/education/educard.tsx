import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";

export type EduItem = {
  degree: string;
  school: string;
  link?: string;
  location?: string;
  date: string;
  details?: string[];
  badge?: string;
  tone?: "blue" | "green" | "purple";
};

const toneMap = {
  blue: { bg: "#EEF2FF", dot: "#6366F1" },
  green: { bg: "#ECFDF5", dot: "#10B981" },
  purple: { bg: "#F5F3FF", dot: "#8B5CF6" },
};

export default function EduCard(props: EduItem) {
  const t = toneMap[props.tone ?? "blue"];

  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: t.bg, borderColor: t.dot }]}>
        <View style={[styles.iconDot, { backgroundColor: t.dot }]} />
      </View>

      <View style={styles.body}>
        <Text style={styles.degree}>{props.degree}</Text>

        {props.link ? (
          <Pressable onPress={() => Linking.openURL(props.link!)}>
            <Text style={styles.schoolLink}>{props.school}</Text>
          </Pressable>
        ) : (
          <Text style={styles.school}>{props.school}</Text>
        )}

        <Text style={styles.meta}>
          {props.date}
          {props.location ? ` · ${props.location}` : ""}
        </Text>

        {props.details?.length ? (
          <View style={styles.details}>
            {props.details.map((d, i) => (
              <Text key={i} style={styles.detailLine}>• {d}</Text>
            ))}
          </View>
        ) : null}

        {props.badge ? (
          <View style={[styles.badge, { backgroundColor: t.bg, borderColor: t.dot }]}>
            <Text style={[styles.badgeText, { color: t.dot }]}>{props.badge}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  iconWrap: {
    alignSelf: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    padding: 6,
  },
  iconDot: { width: 12, height: 12, borderRadius: 6 },
  body: { gap: 4 },
  degree: { fontSize: 15, fontWeight: "700", color: "#111827" },
  school: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  schoolLink: { fontSize: 14, fontWeight: "600", color: "#2563EB", textDecorationLine: "underline" },
  meta: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  details: { marginTop: 6, gap: 2 },
  detailLine: { fontSize: 13, color: "#374151" },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    marginTop: 8,
  },
  badgeText: { fontSize: 12, fontWeight: "700" },
});