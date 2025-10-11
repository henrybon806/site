import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

type Props = {
  icon: { pack: "ion" | "feather"; name: string; size?: number; color?: string };
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export default function CircleIconButton({ icon, onPress, style, accessibilityLabel }: Props) {
  const Comp = icon.pack === "ion" ? Ionicons : Feather;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed, style]}>
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