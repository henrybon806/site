import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import ProjectCard from "./projectscard";

type Item = React.ComponentProps<typeof ProjectCard>["data"];

export default function ProjectGrid({ items }: { items: Item[] }) {
  const { width } = useWindowDimensions();
  const cols = width >= 1100 ? 3 : width >= 740 ? 2 : 1;

  return (
    <View style={[styles.grid, { gap: 16 }]}>
      {items.map((p, i) => (
        <View key={i} style={{ flexBasis: `${100 / cols}%`, maxWidth: `${100 / cols}%` }}>
          <ProjectCard data={p} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
});