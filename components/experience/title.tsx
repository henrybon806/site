import { colors, fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { title: string };

export default function SectionTitle({ title }: Props) {
  return (
    <View style={styles.wrap}>
      <Text role="heading" aria-level={2} style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingBottom: 8,
    marginBottom: 24,
  },
  title: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.text,
  },
});
