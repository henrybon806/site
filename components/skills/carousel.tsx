import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, NativeScrollEvent, NativeSyntheticEvent, Pressable } from "react-native";
// Assuming you have Ionicons available through @expo/vector-icons
import { Ionicons } from "@expo/vector-icons"; 
import SkillCard, { SkillItem } from "./skillcard";

type Props = { items: SkillItem[] };

export default function SkillCarousel({ items }: Props) {
  const ref = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  // State to hold the dynamically calculated width of the carousel container
  const [containerWidth, setContainerWidth] = useState(0); 

  // Handler to capture the container's width, ensuring reliable paging
  const handleLayout = (e: any) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (containerWidth === 0) return;
    
    const { contentOffset } = e.nativeEvent;
    // Calculate the current index using the reliable containerWidth
    const i = Math.round(contentOffset.x / containerWidth); 
    
    // We still limit the index to the visible range of items.
    if (i !== index && i >= 0 && i < items.length) { 
        setIndex(i);
    }
  };

  const go = (dir: -1 | 1) => {
    if (containerWidth === 0) return;
    
    // 360-DEGREE SCROLLING LOGIC: Uses modulo operator to wrap the index.
    let next = (index + dir) % items.length;
    if (next < 0) {
      next = items.length - 1; // Wrap from index 0 back to the last index
    }

    // Use the reliable containerWidth for smooth programmatic scrolling
    ref.current?.scrollTo({ x: next * containerWidth, animated: true });
    setIndex(next);
  };

  // The controls are always visible and enabled in a 360-degree carousel.

  return (
    <View style={styles.wrap}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16} // Standard value for smooth scrolling
        style={styles.scroller}
        onLayout={handleLayout} // Use the new layout handler
      >
        {items.map((it, i) => (
          // Use the calculated width for the slide, crucial for correct paging
          <View key={i} style={[styles.slide, { width: containerWidth }]}> 
            <SkillCard {...it} />
          </View>
        ))}
      </ScrollView>

      {/* Modernized Controls */}
      <View style={styles.controls}>
        
        {/* Previous Button - Always Enabled */}
        <Pressable 
            style={styles.circleBtn} 
            onPress={() => go(-1)} 
        >
          <Ionicons name="chevron-back" size={20} color="#1F2937" />
        </Pressable>
        
        {/* Centralized Pagination Dots */}
        <View style={styles.dots}>
          {items.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                i === index && styles.dotActive
              ]} 
            />
          ))}
        </View>

        {/* Next Button - Always Enabled */}
        <Pressable 
            style={styles.circleBtn} 
            onPress={() => go(1)} 
        >
          <Ionicons name="chevron-forward" size={20} color="#1F2937" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { 
    gap: 10, 
    marginBottom: 40
},
  scroller: { borderRadius: 14, overflow: 'visible' }, 
  slide: { 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 10, // Ensure some padding around the card itself
  },

  // New Control Styles
  controls: {
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between", // Pushes buttons to edges, keeping dots centered
    marginVertical: 4,
  },
  
  circleBtn: {
    width: 36, // Reduced size from 44 to 36 (less bulky)
    height: 36, // Reduced size from 44 to 36
    borderRadius: 18,
    backgroundColor: "#FFFFFF", // Clean white background
    borderWidth: 1, 
    borderColor: "#E5E7EB", // Subtle border
    alignItems: "center", 
    justifyContent: "center",
  },
  
  dots: { 
    flexDirection: "row", 
    gap: 8, 
    justifyContent: "center",
  },
  
  dot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: "#D1D5DB", // Light grey for inactive
  },
  dotActive: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: "#1F2937", // Dark black/grey for active
  },
});
