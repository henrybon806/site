import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import SectionTitle from "../experience/title";
import Container from "../layout/container";
import type { ContactItem } from "./contactcard";
import ContactList from "./list";

export default function ContactPage() {
  const contacts: ContactItem[] = [
    {
      label: "Email",
      value: "henrybonomolo@gmail.com",
      href: "mailto:henrybonomolo@gmail.com",
      icon: { pack: "ion", name: "mail-outline" },
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/henrybonomolo",
      href: "https://www.linkedin.com/in/henrybonomolo",
      icon: { pack: "ion", name: "logo-linkedin" },
    },
    {
      label: "GitHub",
      value: "github.com/henrybon806",
      href: "https://github.com/henrybon806",
      icon: { pack: "ion", name: "logo-github" },
    },
  ];

  return (
    <View style={styles.page}>
      <Container>
        <View style={styles.inner}>
          <SectionTitle title="Get in touch" />

          <Text style={styles.lead}>
            I enjoy meeting people and building things together. If you want to connect,
            collaborate, or jam on ideas, reach out using any channel below.
          </Text>

          <View style={styles.card}>
            <ContactList items={contacts} />

            <Text style={styles.caption}>
              Open to internships, research collabs, and product builds. Students and robotics
              folks: feel free to reach out.
            </Text>

            <Pressable
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
              onPress={() => Linking.openURL("/resume")}
            >
              <Text style={styles.ctaText}>Download resume</Text>
            </Pressable>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F7F8FB", paddingVertical: 18 },
  inner: { alignItems: "center" },
  lead: {
    marginTop: 6,
    textAlign: "center",
    color: "#4B5563",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 720,
  },
  card: {
    width: "100%",
    maxWidth: 880,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E6E9EE",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  caption: { textAlign: "center", color: "#6B7280", marginTop: 12, marginBottom: 6 },
  cta: {
    marginTop: 14,
    backgroundColor: "#111827",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  ctaPressed: { opacity: 0.9 },
  ctaText: { color: "#FFFFFF", fontWeight: "700" },
});