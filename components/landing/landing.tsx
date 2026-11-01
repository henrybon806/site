import { colors, fonts } from "@/constants/theme";
import React from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { LinkRow } from "../contact/getintouch";
import Container from "../layout/container";

type Props = { name?: string; subtitle?: string };

export default function Hero({
  name = "Henry Bonomolo",
  subtitle = "Computer Science at UC Berkeley",
}: Props) {
  const { width } = useWindowDimensions();
  const size = width < 640 ? 96 : 140;

  return (
    <Container>
      <View style={styles.intro}>
        <View style={styles.text}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.location}>Berkeley, CA</Text>
          <View style={styles.links}>
            <LinkRow />
          </View>
        </View>
        <Image
          source={require("../../assets/images/profile.jpeg")}
          style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  intro: { flexDirection: "row", alignItems: "center", gap: 24 },
  avatar: { borderWidth: 1, borderColor: colors.line },
  text: { flex: 1 },
  title: {
    fontFamily: fonts.sans,
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: -0.5,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.body,
    marginTop: 4,
  },
  location: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
  links: { marginTop: 20, marginBottom: 12 },
});

  // Type declaration for window.open (for TypeScript)
  declare global {
    interface Window {
      open(url?: string, target?: string, features?: string): Window | null;
    }
  }
