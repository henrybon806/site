import { useScrollContext } from "@/context/ScrollContext";
import * as Linking from "expo-linking";
import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import CircleIconButton from "./circlebutton";
import PrimarySquareButton from "./squarebutton";

type Props = { name?: string; subtitle?: string };

const openInNewTab = (url: string) => {
  if (typeof window !== 'undefined' && window.open) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    Linking.openURL(url);
  }
};

export default function Hero({
  name = "Henry Bonomolo",
  subtitle = "Software Developer & System Designer",
}: Props) {
  const { height: windowHeight } = useWindowDimensions();
  const { scrollToSection } = useScrollContext();
  
  const handleExploreClick = () => {
    scrollToSection("About");
  };
  
  return (
    <View style={[styles.root, { minHeight: windowHeight }]}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.row}>
        <CircleIconButton
          icon={{ pack: "feather", name: "github" }}
          accessibilityLabel="Open GitHub"
          onPress={() => openInNewTab("https://github.com/henrybon806")}
        />
        <CircleIconButton
          icon={{ pack: "feather", name: "linkedin" }}
          accessibilityLabel="Open LinkedIn"
          onPress={() => openInNewTab("https://www.linkedin.com/in/henrybonomolo")}
        />
        <CircleIconButton
          icon={{ pack: "ion", name: "mail-outline" }}
          accessibilityLabel="Send Email"
          onPress={() => Linking.openURL("mailto:hbono@berkeley.edu")}
        />
      </View>

      <PrimarySquareButton label="Explore" onPress={handleExploreClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: 520,
    flexGrow: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  title: {
    fontSize: 64,
    lineHeight: 68,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#374151",
    textAlign: "center",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 8,
  },
});

  // Type declaration for window.open (for TypeScript)
  declare global {
    interface Window {
      open(url?: string, target?: string, features?: string): Window | null;
    }
  }