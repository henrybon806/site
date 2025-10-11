import React from "react";
import { View, StyleSheet } from "react-native";
import StatCard from "./stats";

type Stat = { value: string; label: string };
type Props = { items: Stat[] };

export default function StatsRow({ items }: Props) {
  return (
    <View style={styles.row}>
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
});