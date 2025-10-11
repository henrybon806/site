import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import Container from "../layout/container";
import SectionTitle from "./title";
import ExperienceTimeline from "./timeline";

export default function ExperiencePage() {
  return (
    <>
      <View style={styles.page}>
        <Container>
          <SectionTitle title="Experience" />

          <ExperienceTimeline
            items={[
              {
                role: "Software Development Engineer Intern",
                org: "Amazon",
                link: "https://amazon.com",
                location: "Boston, MA",
                date: "Jun 2025 – Present",
                description:
                  "Building and deploying software solutions as part of the CPSS ProdSec team with a focus on security and reliability. Collaborating with a diverse team of engineers and learning from their expertise every day.",
                tags: ["AI/ML", "Security", "Python", "Microservices"],
              },
              {
                role: "Head Undergraduate Student Instructor & Instructor",
                org: "UC Berkeley – CS61B",
                link: "https://cs61b.org",
                location: "Berkeley, CA",
                date: "Aug 2024 – Jun 2025",
                description:
                  "Led the CS61B (Data Structures) teaching team, supporting 800 + students and mentoring junior staff. Developed curriculum and internal tools to help students succeed.",
                tags: ["Teaching", "Leadership", "Java", "Project Management"],
              },
              {
                role: "Tutor Enrichment Director",
                org: "The Music Connection",
                link: "https://musicconnection.berkeley.edu",
                location: "Berkeley, CA",
                date: "Aug 2023 – Present",
                description:
                  "Facilitated 1,250 + hours of free music education for K-12 students in local districts. Designed and led pedagogy workshops and developed tools for tutors.",
                tags: ["Software Development", "Leadership", "Community Service"],
              },
              {
                role: "Research Assistant",
                org: "UC Berkeley – EECS Department",
                link: "https://eecs.berkeley.edu",
                location: "Berkeley, CA",
                date: "Jul 2024 – Present",
                description:
                  "Supporting development of EDA and GPU-accelerated algorithms for hardware design automation. Exploring AI applications in chip design and computational optimization.",
                tags: ["EDA", "GPU Computing", "Python", "Research"],
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
});