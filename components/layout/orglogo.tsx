import { colors, fonts } from "@/constants/theme";
import React from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text } from "react-native";
import { openLink } from "../contact/getintouch";

type Props = { source?: ImageSourcePropType; letter?: string; url?: string };

// Small square organization logo; falls back to a letter tile when there's no logo.
export default function OrgLogo({ source, letter, url }: Props) {
  return (
    <Pressable
      disabled={!url}
      onPress={url ? () => openLink(url) : undefined}
      accessibilityRole={url ? "link" : undefined}
      style={({ pressed }) => [styles.tile, pressed && { opacity: 0.7 }]}
    >
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <Text style={styles.letter}>{letter}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%" },
  letter: { fontFamily: fonts.mono, fontSize: 15, color: colors.body },
});
