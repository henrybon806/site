import { useScrollContext } from "@/context/ScrollContext";
import { usePathname } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Item = { label: string; href: string };

const NAV_ITEMS: Item[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

export default function HeaderRight() {
  const pathname = usePathname();
  let scrollContext: ReturnType<typeof useScrollContext> | undefined;
  try {
    scrollContext = useScrollContext();
  } catch {
    scrollContext = undefined;
  }

  const isMainPage = pathname === "/";

  return (
    <View style={styles.row}>
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname?.startsWith(item.href));

        if (isMainPage && scrollContext && item.label !== "Resume") {
          return (
            <Pressable
              key={item.label}
              style={({ pressed }) => [styles.link, pressed && styles.pressed]}
              onPress={() => scrollContext?.scrollToSection(item.label)}
              accessibilityRole="button"
              accessibilityLabel={`Scroll to ${item.label}`}
            >
              <Text style={[styles.text, active && styles.active]}>{item.label}</Text>
            </Pressable>
          );
        }
        // On other pages, only Resume navigates; others do nothing
        if (item.label === "Resume") {
          return (
            <Pressable
              key={item.label}
              style={({ pressed }) => [styles.link, pressed && styles.pressed]}
              onPress={() => { window.location.href = item.href; }}
              accessibilityRole="link"
              accessibilityLabel={`Go to ${item.label}`}
            >
              <Text style={[styles.text, active && styles.active]}>{item.label}</Text>
            </Pressable>
          );
        }
        return (
          <Pressable
            key={item.label}
            style={({ pressed }) => [styles.link, pressed && styles.pressed]}
            onPress={() => {}}
            accessibilityRole="button"
            accessibilityLabel={`Scroll to ${item.label}`}
          >
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