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
  type?: "university" | "highschool"; 
};

const toneMap = {
  university: { 
    bg: "#EFF6FF",
    dot: "#3B82F6",
    icon: "🎓"
  },
  highschool: { 
    bg: "#F5F3FF", 
    dot: "#7C3AED", 
    icon: "📚" 
  },
};

export default function EduCard(props: EduItem) {
  const t = toneMap[props.type ?? "university"]; 

  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: t.bg, borderColor: t.dot }]}>
        {/* ⭐ REPLACED DOT WITH EMOJI ICON */}
        <Text style={[styles.iconEmoji, { color: t.dot }]}>{t.icon}</Text>
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
              // Changed the bullet to a more modern-looking square/circle for cleaner style
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
    flexDirection: 'row',
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
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },

  body: { 
    flex: 1, 
    gap: 4 
  },
  degree: { fontSize: 16, fontWeight: "700", color: "#111827" },
  school: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  schoolLink: { fontSize: 14, fontWeight: "600", color: "#3B82F6", textDecorationLine: "underline" }, 
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