import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = { title: string };

export default function SectionTitle({ title }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", marginTop: 12, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#1F2937" },
  line: {
    marginTop: 6,
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#7C9CF5",
  },
});