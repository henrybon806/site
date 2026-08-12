import React from "react";
import { StyleSheet, View } from "react-native";
import Container from "../layout/container";
import ExperienceTimeline from "./timeline";
import SectionTitle from "./title";

export default function ExperiencePage() {
  return (
    <>
      <View style={styles.page}>
        <Container>
          <SectionTitle title="Experience" accent="#16A34A" />

          <ExperienceTimeline
            items={[
              {
                role: "Course Staff, CS 188 (Introduction to AI)",
                org: "University of California, Berkeley",
                link: "https://www.berkeley.edu",
                location: "Berkeley, CA",
                date: "May 2026 – Present",
                description:
                  "Serving as course staff for CS 188, supporting students on core AI topics including search, Bayes nets, MDPs, and reinforcement learning. Holding office hours and grading exams and assignments.",
                tags: ["AI", "Teaching", "Bayes Nets","Reinforcement Learning", "Python"],
              },
              {
                role: "AI & Cloud Engineer Intern",
                org: "Oracle",
                link: "https://www.oracle.com",
                location: "Redwood Shores, CA",
                date: "May 2026 – August 2026",
                description:
                  "Built agentic workflows on the Oracle AI Data Platform as part of a capstone project, designing and integrating AI agents into cloud data pipelines.",
                tags: ["AI Agents", "Cloud", "Oracle AI Data Platform", "Python", "SQL"],
              },
              {
                role: "React Native & API Developer",
                org: "Mobile Developers of Berkeley",
                link: "https://mdb.dev",
                location: "Berkeley, CA",
                date: "January 2025 – Present",
                description:
                  "Building full-stack mobile apps with React Native and Supabase. Working on API design, authentication flows, and scalable database structures for real-world client projects.",
                tags: ["React Native", "Supabase", "TypeScript", "API Design"],
              },
              {
                role: "Solar Data API Intern",
                org: "Energesque",
                link: "https://www.linkedin.com/company/energesque/",
                location: "Remote / Berkeley, CA / Irvine, CA",
                date: "August 2024 – May 2025",
                description:
                  "Developing a pipeline that aggregates and serves solar irradiance and power data through a REST API. Focused on performance, reliability, and clean data transformation from NOAA and NREL sources.",
                tags: ["Python", "APIs", "Data Engineering", "Cloud"],
              },
              {
                role: "Research & Developer Intern",
                org: "University of Arizona – Electrical Engineering Lab",
                link: "https://www.arizona.edu",
                location: "Tucson, AZ",
                date: "May 2023 – August 2024",
                description:
                  "Building an Android app to collect heart rate and RMSSD metrics for stress analysis in human trials. Integrated Bluetooth EKG sensors and automated HRV computation for real-time feedback.",
                tags: ["Android", "Biomedical Research", "Signal Processing", "Bluetooth"],
              },
              // {
              //   role: "President & Lead Programmer",
              //   org: "FIRST Tech Challenge Robotics Team 14584",
              //   link: "https://pioneer327.tech",
              //   location: "Tucson, AZ",
              //   date: "August 2020 – May 2024",
              //   description:
              //     "Led software and strategy for a state-champion robotics team. Developed autonomous navigation systems using computer vision and sensor fusion. Mentored new programmers and launched ARES, a public FTC analytics platform used by teams worldwide.",
              //   tags: ["Robotics", "Computer Vision", "Leadership", "Python"],
              // },
            ]}
          />
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
});