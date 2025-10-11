import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BulletCard({ title = "Key Achievements", bullets }: { title?: string; bullets: string[] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.list}>
        {bullets.map((b, i) => (
          <View key={i} style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>{b}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  title: { fontSize: 15, fontWeight: "800", color: "#111827" },
  list: { gap: 8, marginTop: 4 },
  row: { flexDirection: "row", gap: 10, alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#60A5FA" },
  text: { fontSize: 14, color: "#374151" },
});