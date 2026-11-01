import { colors, fonts } from "@/constants/theme";
import { useScrollContext } from "@/context/ScrollContext";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HeaderLeftProps = {
  name?: string;
};

export default function HeaderLeft({ name = "Erik Kizior" }: HeaderLeftProps) {
  const { scrollViewRef } = useScrollContext();
  
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
  
  return (
    <View style={styles.container}>
      <Pressable onPress={scrollToTop} accessibilityRole="button" accessibilityLabel="Scroll to top">
        <Text style={styles.brand}>{name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingRight: 12 },
  brand: {
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    paddingVertical: 4, // Add some padding for better touch target
  },
});