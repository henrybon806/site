import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";

export type AwardItem = {
  title: string;
  org: string;
  link?: string;
  date?: string;
  description?: string;
  type?: "technical" | "leadership" | "scholarship" | "language"; 
};

const toneMap = {
  technical: { 
    bg: "#EFF3FF",
    dot: "#4F46E5",
    icon: "💻"
  },
  leadership: { 
    bg: "#ECFDF5",
    dot: "#0D9488", 
    icon: "🏅"
  },
  scholarship: { 
    bg: "#FFFBEB",
    dot: "#F59E0B",
    icon: "🏆"
  },
  language: { 
    bg: "#FEF2F2",
    dot: "#EF4444",
    icon: "🇪🇸"
  }
};

export default function AwardCard(props: AwardItem) {
  const t = toneMap[props.type ?? "technical"]; 
  
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: t.bg, borderColor: t.dot }]}>
        <Text style={[styles.iconEmoji, { color: t.dot }]}>{t.icon}</Text>
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
  title: { fontSize: 16, fontWeight: "700", color: "#111827" },
  subrow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  org: { fontSize: 13, fontWeight: "600", color: "#374151" },
  orgLink: { fontSize: 13, fontWeight: "600", color: "#2563EB", textDecorationLine: "underline" }, 
  date: { fontSize: 12, color: "#6B7280" },
  desc: { marginTop: 6, fontSize: 13, color: "#374151", lineHeight: 20 },
});