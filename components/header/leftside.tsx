import React from "react";
import { View, Text, StyleSheet } from "react-native";

type HeaderLeftProps = {
  name?: string;
};

export default function HeaderLeft({ name = "Erik Kizior" }: HeaderLeftProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { minWidth: 140, paddingRight: 12 },
  brand: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0b0b0b",
  },
});