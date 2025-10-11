import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";

export type AwardItem = {
  title: string;
  org: string;
  link?: string;
  date?: string;
  description?: string;
  tone?: "indigo" | "green" | "amber";
};

const toneMap = {
  indigo: { bg: "#EEF2FF", dot: "#6366F1" },
  green: { bg: "#ECFDF5", dot: "#10B981" },
  amber: { bg: "#FFFBEB", dot: "#F59E0B" },
};

export default function AwardCard(props: AwardItem) {
  const t = toneMap[props.tone ?? "indigo"];
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: t.bg, borderColor: t.dot }]}>
        <View style={[styles.iconDot, { backgroundColor: t.dot }]} />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{props.title}</Text>

        <View style={styles.subrow}>
          {props.link ? (
            <Pressable onPress={() => Linking.openURL(props.link!)}>
              <Text style={styles.orgLink}>{props.org}</Text>
            </Pressable>
          ) : (
            <Text style={styles.org}>{props.org}</Text>
          )}
          {props.date ? <Text style={styles.date}>{props.date}</Text> : null}
        </View>

        {props.description ? <Text style={styles.desc}>{props.description}</Text> : null}
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
  title: { fontSize: 15, fontWeight: "700", color: "#111827" },
  subrow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  org: { fontSize: 13, fontWeight: "600", color: "#374151" },
  orgLink: { fontSize: 13, fontWeight: "600", color: "#2563EB", textDecorationLine: "underline" },
  date: { fontSize: 12, color: "#6B7280" },
  desc: { marginTop: 6, fontSize: 13, color: "#374151", lineHeight: 20 },
});