import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { title: string; accent?: string };

export default function SectionTitle({ title, accent }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.line, accent ? { backgroundColor: accent } : undefined]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", marginTop: 12, marginBottom: 20 },
  title: { fontSize: 40, fontWeight: "800", color: "#1F2937" },
  line: {
    marginTop: 6,
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#16A34A",
  },
});