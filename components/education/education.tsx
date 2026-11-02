import React from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";
import Entry from "../layout/entry";
import OrgLogo from "../layout/orglogo";

type School = { title: string; url: string; date: string; body: string; logo?: ImageSourcePropType; letter?: string };

const SCHOOLS: School[] = [
  {
    title: "B.A. Computer Science · UC Berkeley",
    url: "https://www.berkeley.edu",
    logo: require("../../assets/images/logos/berkeley.png"),
    date: "2024–2028",
    body:
      "GPA 3.74 · Expected May 2028\n" +
      "Coursework: CS\u00A061A (Structure & Interpretation of Programs) · CS\u00A061B (Data Structures) · CS\u00A061C (Machine Structures) · CS\u00A070 (Discrete Math & Probability) · CS\u00A0170 (Algorithms) · CS\u00A0188 (Artificial Intelligence) · CS\u00A0189 (Machine Learning) · EECS\u00A0144/244 (Design Automation) · Math\u00A054 (Linear Algebra)",
  },
  {
    title: "High School Diploma · Catalina Foothills High School",
    url: "https://cfhs.cfsd16.org",
    logo: require("../../assets/images/logos/cfhs.png"),
    date: "2020–2024",
    body:
      "Tucson, AZ · President and lead programmer of a state-champion FIRST Tech Challenge team\n" +
      "National Hispanic Scholar · AP Scholar with Distinction · FIRST LEGO League Mentor & Coach Award (coach and judge since 2020)",
  },
];

export default function EducationAwardsPage() {
  return (
    <Container>
      <SectionTitle title="Education" />
      {SCHOOLS.map((s) => (
        <View key={s.title} style={styles.row}>
          <View style={styles.logo}>
            <OrgLogo source={s.logo} letter={s.letter} url={s.url} />
          </View>
          <View style={styles.entry}>
            <Entry title={s.title} orgUrl={s.url} date={s.date} body={s.body} />
          </View>
        </View>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  logo: { marginRight: 14 },
  entry: { flex: 1 },
});
