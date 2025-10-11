import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import HeaderLeft from "./leftside";
import HeaderRight from "./rightside";
import { LinearGradient } from "expo-linear-gradient";

type HeaderProps = {
  name?: string;
};

export default function Header({ name }: HeaderProps) {
  return (
    <LinearGradient
      colors={["#6e7bf5", "#676fdc", "#6a66d0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.bar}>
        <HeaderLeft name={name} />
        <View style={{ flex: 1 }} />
        <HeaderRight />
      </View>
    </LinearGradient>
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
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});