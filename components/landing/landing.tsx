import { colors, fonts } from "@/constants/theme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinkRow, ResumeButton, useMailto } from "../contact/getintouch";
import Container from "../layout/container";
import Status from "./status";
import { useWindowWidth } from "../layout/usewidth";

// Only shown when printing, in place of the links. Filled in after mount so the email address
// stays out of the static HTML (see useMailto).
function PrintContact() {
  const mailto = useMailto();
  const email = mailto.startsWith("mailto:") ? mailto.slice(7) : "";
  return (
    <Text dataSet={{ print: "only" }} style={styles.printContact}>
      {[email, "henrybonomolo.com", "linkedin.com/in/henrybonomolo", "github.com/henrybon806"].filter(Boolean).join("  ·  ")}
    </Text>
  );
}

export default function Hero() {
  const width = useWindowWidth();
  const size = width > 0 && width < 640 ? 96 : 140;

  return (
    <Container>
      <View style={styles.intro}>
        <View style={styles.text}>
          <Text role="heading" aria-level={1} style={styles.title}>Henry Bonomolo</Text>
          <Text style={styles.subtitle}>{"Computer Science @ UC Berkeley '28"}</Text>
          <Text style={styles.location}>{"San Francisco Bay Area, CA & Tucson, AZ"}</Text>
          <View dataSet={{ print: "hide" }} style={styles.status}>
            <Status />
          </View>
          <PrintContact />
          <View dataSet={{ print: "hide" }} style={styles.actions}>
            <ResumeButton />
            <LinkRow />
          </View>
        </View>
        <Image
          source={require("../../assets/images/profile-web.jpg")}
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
  status: { marginTop: 14 },
  printContact: { marginTop: 10, fontFamily: fonts.mono, fontSize: 10, color: colors.body },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 20,
    rowGap: 12,
    marginTop: 18,
    marginBottom: 12,
  },
});
