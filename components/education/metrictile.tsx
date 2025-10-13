import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Metric = { value: string; label: string };
type Props = { 
  items: Metric[];
  inScrollView?: boolean; // Whether the tiles are in a scroll view
};

export default function MetricTiles({ items, inScrollView = false }: Props) {
  return (
    <View style={styles.row}>
      {items.map((m, i) => (
        <View 
          key={i} 
          style={[
            styles.tile, 
            !inScrollView && styles.expandedTile
          ]}
        >
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
    minWidth: 220,
    maxWidth: 220, // Default max width for scroll view
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  expandedTile: {
    width: 220,
    maxWidth: 400, // Expanded max width when not in scroll view
    flex: 1, // Allow tiles to grow and take up available space
    paddingVertical: 24, // Slightly more padding for larger tiles
    paddingHorizontal: 20, // Add horizontal padding for better look when expanded
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center", // Ensure label is centered even when wrapping
  },
});