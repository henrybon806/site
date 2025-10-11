import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";

export default function Container({ children }: PropsWithChildren) {
  return <View style={styles.wrap}>{children}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
});