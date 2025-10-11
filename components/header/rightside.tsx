import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link, usePathname } from "expo-router";

type Item = { label: string; href: string };

const NAV_ITEMS: Item[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export default function HeaderRight() {
  const pathname = usePathname();

  return (
    <View style={styles.row}>
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname?.startsWith(item.href));

        return (
            <Pressable style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
                <Text style={[styles.text, active && styles.active]}>{item.label}</Text>
            </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },
  link: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    color: "#2e2e2e",
    fontWeight: "300",
  },
  active: {
    color: "#0ea5a5",
  },
  pressed: {
    opacity: 0.6,
  },
});