import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TextCard({ title, text }: { title?: string; text: string }) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.text}>{text}</Text>
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  title: { fontSize: 15, fontWeight: "800", color: "#111827", marginBottom: 6 },
  text: { fontSize: 14, color: "#4B5563", lineHeight: 20, textAlign: "center" },
});