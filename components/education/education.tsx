import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";
import AwardCard, { AwardItem } from "./award";
import EduCard, { EduItem } from "./educard";
import MetricTiles from "./metrictile";

export default function EducationAwardsPage() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const education: EduItem[] = [
    {
      degree: "B.A. in Computer Science",
      school: "University of California, Berkeley",
      link: "https://cdss.berkeley.edu/",
      location: "Berkeley, CA",
      date: "Aug 2024 – Present",
      details: [
        "Studying computing, data science, and systems design through Berkeley’s College of Computing, Data Science, and Society.",
        "Projects and research across AI, reinforcement learning, and distributed systems.",
        "Active in Mobile Developers of Berkeley and personal research projects exploring GPU-accelerated algorithms and real-time data tools."
      ],
      badge: "Undergraduate",
      type: "university"
    },
    {
      degree: "High School Diploma",
      school: "Catalina Foothills High School",
      link: "https://cfhs.cfsd16.org",
      location: "Tucson, AZ",
      date: "Aug 2020 – May 2024",
      details: [
        "President and Lead Programmer of the state-champion FIRST Tech Challenge robotics team.",
        "Developed award-winning autonomous systems and led a 40-member team through multi-season competitions.",
        "Began ARES, a public analytics platform for FTC teams, inspired by the community’s data needs."
      ],
      badge: "Outstanding Senior Recognition",
      type: "highschool"
    },
  ];

  const awards: AwardItem[] = [
  {
    title: "Java Certified Foundations Associate",
    org: "Oracle",
    date: "2024",
    description:
      "Earned certification demonstrating practical understanding of Java syntax, control structures, data types, and object-oriented design.",
    link: "https://www.oracle.com/",
    type: "technical",
  },
  {
    title: "Mentor & Coach Award",
    org: "FIRST LEGO League",
    date: "2023",
    description:
      "Recognized for leading and mentoring a K–12 robotics team with an emphasis on collaboration, inclusion, and hands-on engineering success.",
    link: "https://www.firstinspires.org/robotics/fll",
    type: "leadership",
  },
  {
    title: "Gold Seal of Biliteracy — Spanish",
    org: "State of Arizona",
    date: "2024",
    description:
      "Awarded for advanced proficiency in Spanish and English through coursework and state-level fluency assessments.",
    link: "https://az.gov",
    type: "language",
  },
  {
    title: "National Hispanic Scholar & AP Scholar with Distinction",
    org: "College Board",
    date: "2022–2024",
    description:
      "Honored for top national academic performance and consistently high scores across multiple Advanced Placement exams.",
    link: "https://www.collegeboard.org/",
    type: "scholarship",
  },
  ];

  const metrics = [
    { value: "500+", label: "Students Reached" },
    { value: "30K+", label: "Matches Analyzed (ARES)" },
    { value: "10+", label: "Projects Built" },
    { value: "5", label: "Teams Led" },
  ];

  return (
    <View style={styles.page}>
      <Container>
        <SectionTitle title="Education & Awards" accent="#0A66C2" />

        <View style={[styles.mainGrid, isWide ? styles.gridWide : styles.gridStack]}>

          <View style={styles.contentCol}>
            
            {/* EDUCATION */}
            <View style={styles.section}>
              <SectionLabel text="Education" />
              {education.map((e, i) => <EduCard key={i} {...e} />)}
            </View>

            {/* AWARDS */}
            <View style={styles.section}>
              <SectionLabel text="Honors & Awards" />
              {awards.map((a, i) => <AwardCard key={i} {...a} />)}
            </View>

          </View>

          {isWide && (
            <View style={styles.metricCol}>
              <SectionLabel text="Career Metrics" />
              <MetricTiles items={metrics} inScrollView={true} />
            </View>
          )}
        </View>

        {/* 3. Metrics (Stacked on narrow screens) */}
        {!isWide && (
          <View style={styles.metricsStack}>
            <SectionLabel text="Career Metrics" />
            <MetricTiles items={metrics} inScrollView={false} /> {/* Explicitly set to false for clarity */}
          </View>
        )}
      </Container>
    </View>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <Text style={styles.sectionLabel}>{text}</Text>;
}

const styles = StyleSheet.create({
  page: { 
    flex: 1, 
  },
  mainGrid: { 
    gap: 30,
    marginTop: 15,
  },
  gridWide: { 
    flexDirection: "row", 
    alignItems: "flex-start",
  },
  gridStack: { 
    flexDirection: "column",
  },
  contentCol: { 
    flex: 2,
    gap: 30,
  },
  metricCol: {
    flex: 1,
    gap: 15, 
    position: 'sticky', 
    top: 15, 
  },
  metricsStack: {
    marginTop: 20,
    gap: 15,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8, 
  }
});