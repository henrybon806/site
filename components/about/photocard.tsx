import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

type Props = { title?: string; image: ImageSourcePropType; caption?: string };

export default function PhotoCard({ title, image, caption }: Props) {
  return (
    <View style={styles.wrap}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.frame}>
        <Image source={image} style={styles.img} resizeMode="cover" />
      </View>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 28,
    alignItems: "center",
    gap: 10,
  },
  title: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  frame: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  img: { width: "100%", height: 420, borderRadius: 12 },
  caption: { fontSize: 12, color: "#6B7280" },
});