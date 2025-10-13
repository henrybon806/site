import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";
import ProjectGrid from "./projectsgrid";

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);
  const projects = [
    {
      title: "ARES — FTC Analytics",
      year: "2024–",
      image: { uri: "https://placehold.co/640x400?text=ARES" },
      summary: "Public stats + Discord bot for FTC teams. OPR, rankings, match insights.",
      tags: ["TypeScript", "React/Expo", "Supabase", "Discord Bot"],
      linkText: "View on GitHub",
      linkUrl: "https://github.com/ares-hq/site",
      details: [
        "Designed Postgres schema + nightly ingest pipeline.",
        "Fast OPR computation, cached leaderboards, Discord slash cmds.",
        "Real teams rely on it during competitions.",
      ],
      learnings: [
        "CI caching (setup-node) and Expo web export gotchas.",
        "Product polish > feature sprawl; docs matter.",
      ],
    },
    {
      title: "Spike Inclusive (iPad)",
      year: "2024",
      image: { uri: "https://placehold.co/640x400?text=Spike+Inclusive" },
      summary: "Accessible robotics education app for LEGO Spike via BLE.",
      tags: ["Expo", "BLE", "Education"],
      linkText: "App page",
      linkUrl: "https://apps.apple.com",
      details: [
        "Custom blocks & guided flows for diverse learners.",
        "Deployed in school district classrooms.",
      ],
      learnings: ["UX for classrooms, permission flows, resilience offline."],
    },
        {
      title: "Spike Inclusive (iPad)",
      year: "2024",
      image: { uri: "https://placehold.co/640x400?text=Spike+Inclusive" },
      summary: "Accessible robotics education app for LEGO Spike via BLE.",
      tags: ["Expo", "BLE", "Education"],
      linkText: "App page",
      linkUrl: "https://apps.apple.com",
      details: [
        "Custom blocks & guided flows for diverse learners.",
        "Deployed in school district classrooms.",
      ],
      learnings: ["UX for classrooms, permission flows, resilience offline."],
    },
        {
      title: "Spike Inclusive (iPad)",
      year: "2024",
      image: { uri: "https://placehold.co/640x400?text=Spike+Inclusive" },
      summary: "Accessible robotics education app for LEGO Spike via BLE.",
      tags: ["Expo", "BLE", "Education"],
      linkText: "App page",
      linkUrl: "https://apps.apple.com",
      details: [
        "Custom blocks & guided flows for diverse learners.",
        "Deployed in school district classrooms.",
      ],
      learnings: ["UX for classrooms, permission flows, resilience offline."],
    },
    {
      title: "Solar Data API",
      year: "2024",
      image: { uri: "https://placehold.co/640x400?text=Solar+API" },
      summary: "Irradiance pipeline + API for forecasting experiments.",
      tags: ["Python", "ETL", "REST"],
      linkText: "Docs",
      linkUrl: "https://example.com",
      details: ["Hourly ingestion, QC, and normalized endpoints.", "Simple token auth + rate limits."],
      learnings: ["ETL reliability, metrics, and backfills."],
    },
    {
      title: "Solar Data API",
      year: "2024",
      image: { uri: "https://placehold.co/640x400?text=Solar+API" },
      summary: "Irradiance pipeline + API for forecasting experiments.",
      tags: ["Python", "ETL", "REST"],
      linkText: "Docs",
      linkUrl: "https://example.com",
      details: ["Hourly ingestion, QC, and normalized endpoints.", "Simple token auth + rate limits."],
      learnings: ["ETL reliability, metrics, and backfills."],
    },
  ];

  const FEATURED_COUNT = 3; // default number of featured projects to show

  return (
    <>
      <View>
        <Container>
          <SectionTitle title="Projects" accent="#0891B2" />
          <Text style={styles.lead}>
            A few favorites. Tap the ⓘ on any card to flip for build notes and links.
          </Text>

          <ProjectGrid 
            items={projects.slice(0, FEATURED_COUNT)}
            featured={true}
          />

          {projects.length > FEATURED_COUNT && (
            <View style={styles.moreWrap}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={showAll ? "Show fewer projects" : "Show more projects"}
                onPress={() => setShowAll((s) => !s)}
                style={({ pressed }) => [styles.moreBtn, pressed && { opacity: 0.9 }]}
              >
                <Text style={styles.moreText}>
                  {showAll ? "Show less" : `Show ${projects.length - FEATURED_COUNT} more`}
                </Text>
              </Pressable>
            </View>
          )}
          
          {showAll && projects.length > FEATURED_COUNT && (
            <View style={styles.additionalSection}>
              <ProjectGrid 
                items={projects.slice(FEATURED_COUNT)}
                featured={true} /* Use the same layout for both sections */
              />
            </View>
          )}
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  h1: { textAlign: "center", fontSize: 28, fontWeight: "800", color: "#111827", marginTop: 8 },
  lead: { textAlign: "center", color: "#6B7280", marginVertical: 8 },
  moreWrap: { alignItems: "center", marginTop: 12, marginBottom: 24 },
  moreBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  moreText: { color: "#FFFFFF", fontWeight: "700" },
  additionalSection: { 
    width: '100%',
    marginTop: 8,
    alignItems: 'center'
  },
});