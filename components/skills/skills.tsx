import { colors, fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";

const GROUPS = [
  { label: "Languages", items: "Python, Rust, TypeScript, JavaScript, Java, Swift, C, SQL, SystemVerilog" },
  { label: "Backend", items: "FastAPI, Flask, Node.js, Express, REST APIs, Postgres, Supabase, Firebase" },
  { label: "ML", items: "PyTorch, NumPy, Pandas, computer vision, reinforcement learning, Create ML" },
  { label: "Cloud", items: "Oracle Cloud Infrastructure, AWS, Azure, Docker, GitHub Actions, Vercel" },
  { label: "Frontend", items: "React, Next.js, Tailwind CSS" },
  { label: "Mobile", items: "React Native, Expo, iOS, Android" },
  { label: "Hardware", items: "Bluetooth LE, sensor integration, gantry control, FTC robotics" },
];

export default function SkillsPage() {
  return (
    <Container>
      <SectionTitle title="Skills" />
      <View style={styles.rows}>
      {GROUPS.map((g) => (
        <View key={g.label} style={styles.row}>
          <Text style={styles.label}>{g.label}</Text>
          <Text style={styles.items}>{g.items}</Text>
        </View>
      ))}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  rows: { paddingBottom: 14 },
  row: { flexDirection: "row", gap: 16, marginBottom: 10 },
  label: { width: 88, fontFamily: fonts.mono, fontSize: 12, lineHeight: 21, color: colors.muted },
  items: { flex: 1, fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.body },
});
