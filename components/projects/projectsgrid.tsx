import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import ProjectCard from "./projectscard";

type Item = React.ComponentProps<typeof ProjectCard>["data"];

export default function ProjectGrid({ items, featured = true }: { items: Item[], featured?: boolean }) {
  const { width } = useWindowDimensions();
  const cols = width >= 1100 ? 3 : width >= 740 ? 2 : 1;
  const isSingleColumn = cols === 1;
  
  const CARD_HEIGHT = 400; // Increased height for better content display
  const CARD_WIDTH = 320; // Base width for cards in multi-column layout
  const MAX_COLS = 3; // Maximum number of columns for both featured and additional projects
  
  // Allow larger max width when only one column is showing
  const singleColumnMaxWidth = 500; // Larger max width for single column view
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.grid,
        {
          // When in single column mode, allow grid to be wider
          maxWidth: isSingleColumn 
            ? singleColumnMaxWidth 
            : MAX_COLS * (CARD_WIDTH + 24),
          gap: 20,
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
              width: isSingleColumn ? "100%" : CARD_WIDTH, // Full width for single column
              maxWidth: isSingleColumn 
                ? singleColumnMaxWidth // Larger max width when only one column
                : featured ? `${Math.min(100 / cols, 30)}%` : CARD_WIDTH,
              minWidth: 280,
              // For single column, scale height proportionally to width for better visual balance
              height: isSingleColumn 
                ? Math.min(CARD_HEIGHT + 80, CARD_HEIGHT * (width / 375)) // Responsive height
                : CARD_HEIGHT,
              marginBottom: 24,
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
    marginBottom: 10,
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