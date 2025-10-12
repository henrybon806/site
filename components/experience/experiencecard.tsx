import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export type ExperienceItem = {
  role: string;
  org: string;
  link?: string;
  location: string;
  date: string;
  description: string;
  tags?: string[];
  accentColor?: string; // Optional accent color for UI elements
};

export default function ExperienceCard({
  role,
  org,
  link,
  location,
  date,
  description,
  tags = [],
  accentColor = "#64748b", // Default to slate color
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
            <Text style={[styles.orgLink, { color: accentColor }]}>{org}</Text>
          </Pressable>
        ) : (
          <Text style={[styles.org, { color: accentColor }]}>{org}</Text>
        )}
        <Text style={styles.location}>{location}</Text>
      </View>

      <Text style={styles.desc}>{description}</Text>

      <View style={styles.tagRow}>
        {tags.map((t, i) => (
          <View key={i} style={[styles.tag, { 
            backgroundColor: `${accentColor}10`, // 10% opacity of accent color 
            borderColor: `${accentColor}25`      // 25% opacity for border
          }]}>
            <Text style={[styles.tagText, { color: accentColor }]}>{t}</Text>
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
    borderColor: "rgba(0,0,0,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  role: { fontSize: 16, fontWeight: "700", color: "#111827", flexShrink: 1 },
  date: { fontSize: 13, color: "#6B7280", fontWeight: "500" },
  subRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  org: { fontSize: 14, fontWeight: "600" }, // Color applied dynamically
  orgLink: { fontSize: 14, fontWeight: "600", textDecorationLine: "underline" }, // Color applied dynamically
  location: { fontSize: 13, color: "#6B7280" },
  desc: { fontSize: 14, lineHeight: 22, color: "#374151", marginTop: 8 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 12 },
  tag: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    // Background and border colors applied dynamically
  },
  tagText: { fontSize: 12, fontWeight: "500" }, // Color applied dynamically
});