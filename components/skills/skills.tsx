import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import SectionTitle from "../experience/title";
import Container from "../layout/container";
import BulletCard from "./bulletcard";
import SkillCarousel from "./carousel";
import TextCard from "./textcard";

const SP = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

export default function SkillsPage() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <View style={styles.page}>
      <Container>
        <SectionTitle title="Skills & Expertise" accent="#F97316" />

        {/* Lead-in paragraph */}
        <View style={styles.leadWrap}>
          <TextCard text="I learn best by building and teaching. My experience comes from real projects like ARES, Spike Inclusive, and FitRealm, along with research, internships, and mentoring in communities ranging from FTC robotics to Berkeley teams." />        
        </View>

        {/* 2-col on wide, stacked on narrow */}
        <View style={[styles.grid, isWide ? styles.row : styles.col]}>
          <View style={[styles.left, isWide && styles.leftPad]}>
            <SkillCarousel
              items={[
                {
                  title: "Teaching & Leadership",
                  sub: "3+ years",
                  blurb:
                    "Led robotics and teaching teams while mentoring hundreds of students. Built tools and workflows to make learning smoother and more scalable.",
                  bullets: [
                    "Mentor & coach across FTC and Berkeley orgs",
                    "Curriculum design & technical guidance",
                    "Data-driven teaching tools (ARES)"
                  ],
                  tone: "indigo",
                },
                {
                  title: "Full-Stack & DevOps",
                  sub: "TypeScript • React • Node",
                  blurb:
                    "Develop and deploy reproducible systems with strong data layers and clean CI/CD pipelines.",
                  bullets: [
                    "Expo / React Native apps",
                    "Next.js & Expo Router",
                    "Supabase / Postgres APIs",
                    "GitHub Actions automation"
                  ],
                  tone: "blue",
                },
                {
                  title: "Data, ML & RL",
                  sub: "Python • NumPy • PyTorch (basics)",
                  blurb:
                    "Build analytics pipelines and experiment with reinforcement learning and decision-making systems.",
                  bullets: [
                    "Feature-based RL from CS188 projects",
                    "ARES data metrics & visualization",
                    "Solar irradiance API ETL pipeline"
                  ],
                  tone: "teal",
                },
                {
                  title: "Robotics & EDA",
                  sub: "FTC • GPU-accelerated algorithms",
                  blurb:
                    "Created autonomous robotics systems and explored GPU heuristics for hardware design automation.",
                  bullets: [
                    "ARES web & Discord analytics",
                    "Autonomous pathfinding / OPR analysis",
                    "CUDA / GPU research experiments"
                  ],
                  tone: "purple",
                },
                {
                  title: "Mobile & BLE",
                  sub: "iOS • Android • Bluetooth LE",
                  blurb:
                    "Build native-quality mobile apps for education and research, integrating sensors and BLE devices.",
                  bullets: [
                    "Spike Inclusive iPad app",
                    "Android RMSSD stress-monitor app",
                    "BLE connectivity & permissions"
                  ],
                  tone: "rose",
                },
                {
                  title: "Product & UX",
                  sub: "Idea → Prototype → Launch",
                  blurb:
                    "Care about clarity and momentum: ship fast, refine fast, and make tools people actually use.",
                  bullets: [
                    "Design systems & theming consistency",
                    "Accessible, documented interfaces",
                    "Rapid iteration & user testing"
                  ],
                  tone: "amber",
                },
              ]}
            />
          </View>

          <View style={[styles.right, isWide ? styles.rightPad : styles.rightStack]}>
            <BulletCard
              title="Key Achievements"
              bullets={[
                "Built ARES, a public FTC analytics platform and Discord bot used by robotics teams",
                "Created Spike Inclusive, an iPad app for accessible LEGO Spike programming in classrooms",
                "Developed a Solar Data API pipeline for Energesque",
                "Built an Android RMSSD heart-rate app for stress research at the University of Arizona",
              ]}
            />
            <View style={styles.cardSpacer} />
            <TextCard
              title="Learning Philosophy"
              text="Teaching is leverage. Build clarity, reduce friction, and share tools so others move faster. Prefer working code over vibes, reproducibility over heroics, and communities over solo genius."
            />
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  leadWrap: {
    marginTop: SP.sm,
    marginBottom: SP.lg,
  },

  grid: {
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  col: {
    flexDirection: "column",
  },

  left: {
    flex: 1,
    marginBottom: SP.lg,
  },
  leftPad: {
    paddingRight: SP.lg, 
    marginBottom: 0,
  },

  right: {
    flex: 1,
  },
  rightPad: {
    paddingLeft: SP.lg
  },
  rightStack: {
  },

  cardSpacer: {
    height: SP.lg,
  },
});