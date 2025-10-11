import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = { label: string; onPress?: () => void; style?: ViewStyle; showArrow?: boolean };
export default function PrimarySquareButton({ label, onPress, style, showArrow = true }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}>
      <Text style={styles.text}>{label}</Text>
      {showArrow && <Feather name="arrow-down" size={18} color="#111827" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    minWidth: 160,
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  pressed: { transform: [{ translateY: 1 }] },
  text: { color: "#111827", fontWeight: "700", fontSize: 18 },
});