import React from "react";
import { Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import SectionTitle from "../experience/title";
import Container from "../layout/container";
import type { ContactItem } from "./contactcard";
import ContactList from "./list";

const EXTERNAL_URL = "https://resume.henrybonomolo.com/resume.pdf";

export default function ContactPage() {
  const contacts: ContactItem[] = [
    {
      label: "Email",
      value: "henrybonomolo@gmail.com",
      href: "mailto:hbono@berkeley.edu",
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
          <SectionTitle title="Get in touch" accent="#111827" />

          <Text style={styles.lead}>
            I enjoy meeting people and building things together. If you want to connect,
            collaborate, or explore new ideas, reach out using any channel below.
          </Text>

          <View style={styles.card}>
            <ContactList items={contacts} />

            <Text style={styles.caption}>
              I'm interested in internships, research, and hands-on builds or projects. I also mentor robotics teams and enjoy working with diverse & curious teams.
            </Text>
            
            <Pressable
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
              onPress={async () => {
                const fileName = "Henry_Bonomolo_Resume.pdf";

                if (Platform.OS === "web") {
                  try {
                    const res = await fetch(EXTERNAL_URL, { mode: "cors", cache: "no-store" });
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = fileName; 
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  } catch (e) {
                    window.open(EXTERNAL_URL, "_blank", "noopener,noreferrer");
                  }
                  return;
                }

                Linking.openURL(EXTERNAL_URL);
              }}
            >
              <Text style={styles.ctaText}>Download Resume</Text>
            </Pressable>

            <Text style={styles.caption}>
               Alternatively, you can always view the full PDF here: {" "}
              <Text
                style={{ fontWeight: "600", textDecorationLine: "underline" }}
                onPress={() => Linking.openURL("https://resume.henrybonomolo.com")}
              >
                resume.henrybonomolo.com
              </Text>
            </Text>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F5F7FA", paddingVertical: 18 },
  inner: { alignItems: "center" },
  lead: {
    marginTop: 6,
    textAlign: "center",
    color: "#334155",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 720,
  },
  card: {
    width: "100%",
    maxWidth: 1100,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    shadowColor: "#0b1220",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 3,
  },
  caption: { textAlign: "center", color: "#4B5563", marginTop: 12, marginBottom: 6 },
  cta: {
    marginTop: 14,
    marginBottom: 7,
    backgroundColor: "#111827",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  ctaPressed: { opacity: 0.9 },
  ctaText: { color: "#FFFFFF", fontWeight: "700" },
});