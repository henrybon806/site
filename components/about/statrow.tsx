import React from "react";
import { StyleSheet, View } from "react-native";
import StatCard from "./stats";

type Stat = { value: string; label: string };
type Props = { items: Stat[]; center?: boolean };

export default function StatsRow({ items, center = false }: Props) {
  return (
    <View style={[styles.row, center && styles.centerRow]}>
      {items.map((it, idx) => (
        <StatCard key={idx} value={it.value} label={it.label} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  centerRow: { justifyContent: "center" },
});