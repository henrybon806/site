import React from "react";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { Stack } from "expo-router";
import EduCard, { EduItem } from "./educard";
import AwardCard, { AwardItem } from "./award";
import Container from "../layout/container";
import SectionTitle from "../experience/title";
import MetricTiles from "./metrictile";

export default function EducationAwardsPage() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const education: EduItem[] = [
    {
      degree: "B.S. in Computer Science (CDSS)",
      school: "University of California, Berkeley",
      link: "https://cdss.berkeley.edu/",
      location: "Berkeley, CA",
      date: "Aug 2023 – May 2027 (anticipated)",
      details: ["Courses: CS61A/B, CS70, CS188, Math 54, UGBA 10X, ENVDES 5"],
      badge: "Undergraduate, CS ’27",
      tone: "blue",
    },
    {
      degree: "High School Diploma",
      school: "Clovis North High School",
      location: "Clovis, CA",
      date: "Aug 2019 – May 2023",
      details: ["FTC robotics president & lead programmer", "Multiple state championships (team)"],
      badge: "STEM & Robotics",
      tone: "purple",
    },
  ];

  const awards: AwardItem[] = [
    {
      title: "FTC Robotics Leadership & Championships",
      org: "FIRST Tech Challenge",
      date: "2020 – 2023",
      description: "Led programming & analytics; helped team capture multiple state titles and compete at high levels.",
      link: "https://www.firstinspires.org/robotics/ftc",
      tone: "indigo",
    },
    {
      title: "Undergraduate Teaching & Mentorship",
      org: "UC Berkeley / Community",
      date: "2023 – Present",
      description: "Mentored peers and K–12 students; built ARES and Spike Inclusive to support learning at scale.",
      link: "https://github.com/ares-hq",
      tone: "green",
    },
    {
      title: "Research & Product Builder",
      org: "Energesque / UArizona / Personal",
      date: "2023 – Present",
      description: "Solar Data API pipeline, RMSSD Android app for stress research, and AI/EDA experiments.",
      tone: "amber",
    },
  ];

  const metrics = [
    { value: "800+", label: "Students Impacted" },
    { value: "3.9x", label: "Project Scale (ARES, est.)" },
    { value: "10+","label":"Courses & Labs" },
    { value: "4+", label: "Teams Led" },
  ];

  return (
    <>
      <View style={styles.page}>
        <Container>
          <SectionTitle title="Education & Awards" />

          <View style={[styles.grid, isWide ? styles.gridWide : styles.gridStack]}>
            <View style={styles.col}>
              <View style={styles.sectionLabelWrap}><SectionLabel text="Education" /></View>
              {education.map((e, i) => <EduCard key={i} {...e} />)}
            </View>

            <View style={styles.col}>
              <View style={styles.sectionLabelWrap}><SectionLabel text="Honors & Awards" /></View>
              {awards.map((a, i) => <AwardCard key={i} {...a} />)}
            </View>
          </View>

          <MetricTiles items={metrics} />
        </Container>
      </View>
    </>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <View><View><></></View></View>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F5F6FB" },
  grid: { gap: 18, marginTop: 10 },
  gridWide: { flexDirection: "row", alignItems: "flex-start" },
  gridStack: { flexDirection: "column" },
  col: { flex: 1, gap: 12 },
  sectionLabelWrap: { marginBottom: 4 },
});