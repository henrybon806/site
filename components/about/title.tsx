import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutTitle() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>About Me</Text>
      <View style={styles.underline} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", gap: 8, marginTop: 12 },
  title: { fontSize: 28, fontWeight: "800", color: "#1F2937" },
  underline: {
    width: 80,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#7C9CF5",
  },
});