import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderLeft from "./leftside";
import HeaderRight from "./rightside";

type HeaderProps = {
  name?: string;
};

export default function Header({ name }: HeaderProps) {
  return (
      <View style={styles.bar}>
        <HeaderLeft name={name} />
        <View style={{ flex: 1 }} />
        <HeaderRight />
      </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  bar: {
    height:60,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background like the maze
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.15)" // Subtle border matching wall opacity
  },
});