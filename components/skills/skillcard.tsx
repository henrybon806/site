import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type SkillItem = {
  title: string;
  sub?: string;
  blurb: string;
  bullets?: string[];
  tone?: "indigo" | "blue" | "teal" | "purple" | "rose" | "amber";
};

// Added 'text' color for the icon/emoji
const toneMap = {
  indigo: { bg: "#EEF2FF", dot: "#6366F1", text: "#4F46E5" },
  blue:   { bg: "#EFF6FF", dot: "#3B82F6", text: "#2563EB" },
  teal:   { bg: "#F0FDFA", dot: "#14B8A6", text: "#0D9488" },
  purple: { bg: "#F5F3FF", dot: "#8B5CF6", text: "#7C3AED" },
  rose:   { bg: "#FFF1F2", dot: "#F43F5E", text: "#E11D48" },
  amber:  { bg: "#FFFBEB", dot: "#F59E0B", text: "#D97706" },
};

export default function SkillCard({ title, sub, blurb, bullets = [], tone = "indigo" }: SkillItem) {
  const t = toneMap[tone];
  
  // Using a universal symbol as the placeholder "emoji"
  const iconSymbol = "🌟"; 

  return (
    // Enforced minHeight for uniform card size
    <View style={styles.card}>
      {/* Header section with icon and title side-by-side (like education/award cards) */}
      <View style={styles.header}>
        {/* FIX: Redesigned the icon box to hold the large symbol/emoji */}
        <View style={[styles.icon, { backgroundColor: t.bg, borderColor: t.dot }]}>
          <Text style={[styles.iconText, { color: t.text }]}>{iconSymbol}</Text>
        </View>
        <View style={styles.titleGroup}>
          <Text style={styles.title}>{title}</Text>
          {sub ? <Text style={styles.sub}>{sub}</Text> : null}
        </View>
      </View>
      
      {/* Body content */}
      <View style={styles.body}>
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
    padding: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    // MAKE THEM THE SAME SIZE: Enforcing a minimum height for uniformity
    minHeight: 300, 
    width: '100%', 
  },
  // New header structure for horizontal icon/title alignment
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  // Redesigned icon box
  icon: { 
    width: 50, 
    height: 50, 
    borderRadius: 12, 
    borderWidth: 1, 
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // Removed alignSelf: "flex-start" since it's now in a row
  },
  // Style for the placeholder icon/emoji text
  iconText: {
    fontSize: 24, 
  },
  titleGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  body: { 
    gap: 8, 
    flex: 1, // Allows body to expand to fill remaining vertical space
  },
  title: { fontSize: 18, fontWeight: "800", color: "#111827" },
  sub: { fontSize: 14, color: "#6B7280" },
  blurb: { fontSize: 14, color: "#374151", lineHeight: 22 },
  list: { marginTop: 8, gap: 8 },
  liRow: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  // Adjusted liDot and liText for cleaner multi-line bullet alignment
  liDot: { marginTop: 6, width: 6, height: 6, borderRadius: 3 }, 
  liText: { flex: 1, fontSize: 14, color: "#374151", lineHeight: 20 },
});
