import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type Props = {
  icon: { pack: "ion" | "feather"; name: string; size?: number; color?: string };
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export default function CircleIconButton({ icon, onPress, style, accessibilityLabel }: Props) {
  const Comp = icon.pack === "ion" ? Ionicons : Feather;
  const colorKey = (icon.color || "").toLowerCase();
  let derivedStyle = undefined as any;

  if (!style && colorKey) {
    if (colorKey === "#0a66c2" || colorKey.includes("0a66c2") || colorKey.includes("linkedin")) {
      derivedStyle = { backgroundColor: "#E6F2FB", borderColor: "#D6EAFB" };
    } else if (colorKey === "#6f42c1" || colorKey.includes("6f42c1") || colorKey.includes("github")) {
      derivedStyle = { backgroundColor: "#F3F0FF", borderColor: "#E9E2FF" };
    } else if (colorKey === "#ea4335" || colorKey.includes("ea4335") || colorKey.includes("mail") || colorKey.includes("gmail")) {
      derivedStyle = { backgroundColor: "#FFF1F0", borderColor: "#FFE6E4" };
    } else if (colorKey === "#181717" || colorKey.includes("181717")) {
      derivedStyle = { backgroundColor: "#F3F4F6", borderColor: "#E6E9EE" };
    }
  }

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed, derivedStyle, style]}>
      <Comp name={icon.name as any} size={icon.size ?? 22} color={icon.color ?? "#444"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 64,
    height: 64,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});