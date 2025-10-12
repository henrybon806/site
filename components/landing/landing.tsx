import { useScrollContext } from "@/context/ScrollContext";
import { LinearGradient } from 'expo-linear-gradient';
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
    <View style={[styles.root, { minHeight: windowHeight - 40 }]}>
      <View style={styles.contentContainer}>
        <LinearGradient 
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0)']}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <LinearGradient 
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0)']}
          style={styles.gradientBackgroundHorizontal}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={styles.blurOverlay} />
        <View style={styles.content}>
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
      </View>
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
  contentContainer: {
    position: "relative",
    width: "100%",
    maxWidth: 550,
    paddingVertical: 60,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    overflow: "hidden",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientBackgroundHorizontal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.85,
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(1px)",
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    paddingVertical: 20,
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