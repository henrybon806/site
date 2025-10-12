import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import ProjectCard from "./projectscard";

type Item = React.ComponentProps<typeof ProjectCard>["data"];

export default function ProjectGrid({ items, featured = true }: { items: Item[], featured?: boolean }) {
  const { width } = useWindowDimensions();
  const cols = width >= 1100 ? 3 : width >= 740 ? 2 : 1;
  
  // Use the same dimensions for all cards, regardless of featured/additional status
  const CARD_HEIGHT = 400; // Increased height to prevent content from getting cut off
  const CARD_WIDTH = 320; // Fixed width for all cards
  const MAX_COLS = 3; // Maximum number of columns for both featured and additional projects
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.grid,
        {
          maxWidth: MAX_COLS * (CARD_WIDTH + 16), // Maximum width based on card width plus gap
          gap: 16,
          justifyContent: 'center',
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: 'center',
        }
      ]}>
        {items.map((p, i) => (
          <View 
            key={`project-${i}`} 
            style={{ 
              width: CARD_WIDTH,
              maxWidth: featured ? `${Math.min(100 / cols, 30)}%` : CARD_WIDTH,
              minWidth: 280,
              height: CARD_HEIGHT,
              marginBottom: 16,
            }}
          >
            <ProjectCard data={p} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginTop: 12,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  grid: { 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 24,
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});