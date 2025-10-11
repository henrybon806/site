import React, { useMemo, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text } from "react-native";
import SkillCard, { SkillItem } from "./skillcard";

type Props = { items: SkillItem[] };

export default function SkillCarousel({ items }: Props) {
  const ref = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const i = Math.round(contentOffset.x / layoutMeasurement.width);
    if (i !== index) setIndex(i);
  };

  const go = (dir: -1 | 1) => {
    const next = Math.min(items.length - 1, Math.max(0, index + dir));
    const width = (ref.current as any)?._layout?.width ?? 0;
    ref.current?.scrollTo({ x: next * width, animated: true });
    setIndex(next);
  };

  return (
    <View style={styles.wrap}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scroller}
        onLayout={(e) => ((ref.current as any)._layout = e.nativeEvent.layout)}
      >
        {items.map((it, i) => (
          <View key={i} style={styles.slide}>
            <SkillCard {...it} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.controls}>
        <Pressable style={[styles.circleBtn, index === 0 && styles.disabled]} onPress={() => go(-1)} disabled={index === 0}>
          <Text style={styles.arrow}>‹</Text>
        </Pressable>
        <Text style={styles.pageText}>{index + 1} of {items.length}</Text>
        <Pressable style={[styles.circleBtn, index === items.length - 1 && styles.disabled]} onPress={() => go(1)} disabled={index === items.length - 1}>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      <View style={styles.dots}>
        {items.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  scroller: { borderRadius: 14 },
  slide: { width: "100%" },
  controls: {
    marginTop: 8,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  circleBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1, borderColor: "#E5E7EB",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
  },
  disabled: { opacity: 0.5 },
  arrow: { fontSize: 20, color: "#374151", marginTop: -1 },
  pageText: { fontSize: 13, color: "#6B7280" },
  dots: { flexDirection: "row", gap: 6, justifyContent: "center", marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#D1D5DB" },
  dotActive: { backgroundColor: "#7C9CF5" },
});