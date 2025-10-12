import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import Container from "../layout/container";
import SectionTitle from "../experience/title";
import ContactList from "./list";

export default function ContactPage() {
  return (
    <>
      <View>
        <Container>
          <SectionTitle title="Get In Touch" />
          <Text style={styles.lead}>
            I enjoy meeting people and building things together. If you want to connect,
            collaborate, or jam on ideas, reach out through any channel below.
          </Text>

          <Text style={styles.subheading}>Connect With Me</Text>
          <Text style={styles.caption}>
            Open to internships, research collabs, and product builds. Messages from students
            and robotics folks are extra welcome.
          </Text>

          <ContactList
            items={[
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
            ]}
          />
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F5F6FB" },
  lead: {
    marginTop: 6,
    textAlign: "center",
    color: "#4B5563",
    fontSize: 15,
    lineHeight: 22,
  },
  subheading: {
    marginTop: 24,
    textAlign: "center",
    color: "#111827",
    fontWeight: "800",
    fontSize: 18,
  },
  caption: { textAlign: "center", color: "#6B7280", marginTop: 6, marginBottom: 14 },
});