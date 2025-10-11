import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Tag({ text }: { text: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  label: { fontSize: 12, color: "#374151" },
});