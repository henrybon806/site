import React from "react";
import { View, Text, StyleSheet, Linking, Pressable } from "react-native";

export type ExperienceItem = {
  role: string;
  org: string;
  link?: string;
  location: string;
  date: string;
  description: string;
  tags?: string[];
};

export default function ExperienceCard({
  role,
  org,
  link,
  location,
  date,
  description,
  tags = [],
}: ExperienceItem) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.subRow}>
        {link ? (
          <Pressable onPress={() => Linking.openURL(link)}>
            <Text style={styles.orgLink}>{org}</Text>
          </Pressable>
        ) : (
          <Text style={styles.org}>{org}</Text>
        )}
        <Text style={styles.location}>{location}</Text>
      </View>

      <Text style={styles.desc}>{description}</Text>

      <View style={styles.tagRow}>
        {tags.map((t, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  role: { fontSize: 16, fontWeight: "700", color: "#111827", flexShrink: 1 },
  date: { fontSize: 13, color: "#6B7280" },
  subRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  org: { fontSize: 14, fontWeight: "600", color: "#2563EB" },
  orgLink: { fontSize: 14, fontWeight: "600", color: "#2563EB", textDecorationLine: "underline" },
  location: { fontSize: 13, color: "#6B7280" },
  desc: { fontSize: 14, lineHeight: 20, color: "#374151", marginTop: 8 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
  tag: {
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tagText: { fontSize: 12, color: "#374151" },
});