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
      date: "Aug 2024 – May 2027",
      details: ["Courses: CS61A/B, CS70, CS188, Math 54, UGBA 10X, ENVDES 5"],
      badge: "Undergraduate, CS ’27",
      type: "university"
    },
    {
      degree: "High School Diploma",
      school: "Catalina Foothills High School",
      location: "Tucson, AZ",
      date: "Aug 2020 – May 2024",
      details: ["FTC robotics president & lead programmer", "Multiple state championships (team)"],
      badge: "Outstanding Senior",
      type: "highschool"
    },
  ];

  const awards: AwardItem[] = [
    {
      title: "Java Certified Foundations Associate",
      org: "ORACLE",
      date: "2024",
      description: "Validated proficiency in fundamental Java programming concepts, data types, control flow, and object-oriented principles.",
      link: "https://www.oracle.com/",
      type: "technical",
    },
    {
      title: "Mentor and Coach Award",
      org: "FIRST LEGO League",
      date: "2023",
      description: "Recognized for commitment to Core Values and exceptional leadership in guiding a K-12 robotics team to competition success.",
      link: "https://www.firstinspires.org/robotics/fll",
      type: "leadership",
    },
    {
      title: "Gold Seal of Biliteracy: Spanish",
      org: "State of Arizona",
      date: "2024",
      description: "Awarded by the state for demonstrating proficiency in English and Spanish, meeting rigorous academic criteria.",
      link: "https://az.gov",
      type: "language",
    },
    {
      title: "National Hispanic Scholar & AP Scholar Award with Distinction",
      org: "Advanced Placement",
      date: "2022-2024",
      description: "Dual recognition for high academic performance on AP exams and standing as a top-ranked Hispanic student nationwide.",
      link: "https://www.collegeboard.org/",
      type: "scholarship", 
    },
  ];

  const metrics = [
    { value: "800+", label: "Students Impacted" },
    { value: "3.9x", label: "Project Scale (ARES, est.)" },
    { value: "10+", label: "Courses & Labs" },
    { value: "4+", label: "Teams Led" },
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