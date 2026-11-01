import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Linking, Platform, StyleSheet, Text, View } from "react-native";

import SectionTitle from "../experience/title";
import Container from "../layout/container";

export const CONTACT_LINKS = [
  { label: "Email", href: "mailto:hbono@berkeley.edu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/henrybonomolo" },
  { label: "GitHub", href: "https://github.com/henrybon806" },
  { label: "Resume", href: "https://resume.henrybonomolo.com" },
];

export const openLink = (url: string) => {
  if (Platform.OS === "web" && !url.startsWith("mailto:")) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    Linking.openURL(url);
  }
};

export function LinkRow({ color = colors.text }: { color?: string }) {
  return (
    <View style={styles.row}>
      {CONTACT_LINKS.map((l) => (
        <Text key={l.label} style={[styles.link, { color }]} onPress={() => openLink(l.href)}>
          {l.label}
          {l.href.startsWith("mailto:") ? null : (
            <Text> <Feather name="arrow-up-right" size={13} color={color} /></Text>
          )}
        </Text>
      ))}
    </View>
  );
}

export default function ContactPage() {
  return (
    <Container>
      <SectionTitle title="Contact" />
      <Text style={styles.lead}>
        Reach out about roles, research, or anything you&apos;re building. The fastest way is
        hbono@berkeley.edu.
      </Text>
      <LinkRow />
    </Container>
  );
}

const styles = StyleSheet.create({
  lead: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.body,
    marginBottom: 14,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 20 },
  link: { fontFamily: fonts.sans, fontSize: 14 },
});
