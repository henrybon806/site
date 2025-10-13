import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  label: { fontSize: 12, color: "#4F46E5", fontWeight: "600" },
});