import { colors } from "@/constants/theme";
import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { useMazeBlock } from "./pagemaze";

export default function Container({ children }: PropsWithChildren) {
  const blockRef = useMazeBlock();
  return (
    <View style={styles.wrap}>
      <View ref={blockRef} style={boxStyles.box}>{children}</View>
    </View>
  );
}

// Sections stack flush into one column under the header, 16px outside their content.
// Only the column's side borders are drawn; the line under each section title does the
// separating, and the footer closes the column at the bottom.
export const boxStyles = StyleSheet.create({
  box: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    // Small bottom padding: the last entry in a section already ends with its own margin.
    paddingTop: 28,
    paddingBottom: 8,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.line,
  },
});

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
});
