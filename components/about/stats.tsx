import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = { value: string; label: string };

export default function StatCard({ value, label }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  value: { fontSize: 22, fontWeight: "800", color: "#111827" },
  label: { fontSize: 12, color: "#6B7280" },
});