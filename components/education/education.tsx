import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
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
      degree: "B.A. in Computer Science",
      school: "University of California, Berkeley",
      link: "https://cdss.berkeley.edu/",
      location: "Berkeley, CA",
      date: "Aug 2024 – May 2027",
      details: ["Courses: CS61A/B, CS70, CS188, Math 54, UGBA 10X, ENVDES 5"],
      badge: "Undergraduate, CS ’27",
      tone: "blue",
    },
    {
      degree: "High School Diploma",
      school: "Catalina Foothills High School",
      location: "Tucson, AZ",
      date: "Aug 2020 – May 2024",
      details: ["FTC robotics president & lead programmer", "Multiple state championships (team)"],
      badge: "Outstanding Senior",
      tone: "purple",
    },
  ];

  const awards: AwardItem[] = [
    {
      title: "Java Certified Foundations Associate",
      org: "ORACLE",
      date: "2024",
      description: "Led programming & analytics; helped team capture multiple state titles and compete at high levels.",
      link: "https://www.firstinspires.org/robotics/ftc",
      tone: "indigo",
    },
    {
      title: "Mentor and Coach Award",
      org: "FIRST LEGO League",
      date: "2023",
      description: "Mentored peers and K–12 students; built ARES and Spike Inclusive to support learning at scale.",
      link: "https://github.com/ares-hq",
      tone: "green",
    },
    {
      title: "Gold Seal of Biliteracy: Spanish",
      org: "State of Arizona",
      date: "2024",
      description: "Solar Data API pipeline, RMSSD Android app for stress research, and AI/EDA experiments.",
      link: "https://az.gov",
      tone: "amber",
    },
    {
      title: "National Hispanic Scholar & AP Scholar Award with Distinction",
      org: "Advanced Placement",
      date: "2022-2024",
      description: "Solar Data API pipeline, RMSSD Android app for stress research, and AI/EDA experiments.",
      link: "https://az.gov",
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
      <View>
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