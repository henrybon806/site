import { colors, fonts } from "@/constants/theme";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type Props = { source?: ImageSourcePropType; letter?: string; url?: string };

// Small square organization logo; falls back to a letter tile when there's no logo.
export default function OrgLogo({ source, letter, url }: Props) {
  return (
    <View
      style={styles.tile}
      {...((url ? { href: url, hrefAttrs: { target: "_blank", rel: "noopener noreferrer" }, role: "link" } : {}) as object)}
    >
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <Text style={styles.letter}>{letter}</Text>
      )}
    </View>
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
