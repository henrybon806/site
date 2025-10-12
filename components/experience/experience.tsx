import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import Container from "../layout/container";
import SectionTitle from "./title";
import ExperienceTimeline from "./timeline";

export default function ExperiencePage() {
  return (
    <>
      <View>
        <Container>
          <SectionTitle title="Experience" />

          <ExperienceTimeline
            items={[
              {
                role: "React Native & API Developer",
                org: "Mobile Developers of Berkeley",
                link: "https://mdb.dev",
                location: "Berkeley, CA",
                date: "January 2025 – Present",
                description:
                  "Led the CS61B (Data Structures) teaching team, supporting 800 + students and mentoring junior staff. Developed curriculum and internal tools to help students succeed.",
                tags: ["Teaching", "Leadership", "Java", "Project Management"],
              },
              {
                role: "Solar Irradiance API Intern",
                org: "Energesque",
                link: "https://amazon.com",
                location: "Berkeley, CA",
                date: "August 2024 – May 2025",
                description:
                  "Building and deploying software solutions as part of the CPSS ProdSec team with a focus on security and reliability. Collaborating with a diverse team of engineers and learning from their expertise every day.",
                tags: ["AI/ML", "Security", "Python", "Microservices"],
              },
              {
                role: "Research & Developer Intern",
                org: "University of Arizona",
                link: "https://musicconnection.berkeley.edu",
                location: "Tucson, AZ",
                date: "Aug 2023 – Present",
                description:
                  "Facilitated 1,250 + hours of free music education for K-12 students in local districts. Designed and led pedagogy workshops and developed tools for tutors.",
                tags: ["Software Development", "Leadership", "Community Service"],
              },
              {
                role: "President & Lead Programmer",
                org: "First Tech Challenge",
                link: "https://eecs.berkeley.edu",
                location: "Tucson, AZ",
                date: "August 2020 – May 2024",
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