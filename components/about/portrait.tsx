import React from "react";
import { Image, View, StyleSheet, ImageSourcePropType } from "react-native";

type Props = { source: ImageSourcePropType; size?: number };

export default function Portrait({ source, size = 400 }: Props) {
  const s = size;
  return (
    <View style={[styles.ring, { width: s + 12, height: s + 12, borderRadius: (s + 12) / 2 }]}>
      <Image source={source} style={{ width: s, height: s, borderRadius: s / 2 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
});