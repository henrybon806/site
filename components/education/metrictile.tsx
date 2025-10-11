import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Metric = { value: string; label: string };
type Props = { items: Metric[] };

export default function MetricTiles({ items }: Props) {
  return (
    <View style={styles.row}>
      {items.map((m, i) => (
        <View key={i} style={styles.tile}>
          <Text style={styles.value}>{m.value}</Text>
          <Text style={styles.label}>{m.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  tile: {
    minWidth: 180,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  value: { fontSize: 18, fontWeight: "800", color: "#111827" },
  label: { fontSize: 12, color: "#6B7280", marginTop: 2 },
});