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
          <TextCard text="I believe in learning through doing and teaching. My expertise comes from real projects (ARES, Spike Inclusive, FitRealm), research/internships, and mentoring communities—from FTC robotics to Berkeley courses." />
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
                    "Led 40+ member teaching teams and mentored 800+ students. Designed tools and workflows that scale support.",
                  bullets: ["Head/UGSI for Berkeley courses", "Curriculum & tooling", "Mentoring & project coaching"],
                  tone: "indigo",
                },
                {
                  title: "Full-Stack & DevOps",
                  sub: "TypeScript • React • Node",
                  blurb: "Ship reproducible web/mobile apps with CI, caching, and observability.",
                  bullets: ["Expo/React Native", "Next/Expo Router", "Supabase/Postgres, REST/WS", "GitHub Actions"],
                  tone: "blue",
                },
                {
                  title: "Data/ML & RL",
                  sub: "Python • NumPy • PyTorch (basics)",
                  blurb: "From coursework (CS188) to practical pipelines and analytics.",
                  bullets: ["Feature-based RL projects", "Data viz & metrics", "ETL for Solar Data API"],
                  tone: "teal",
                },
                {
                  title: "Robotics & EDA",
                  sub: "FTC • GPU/EDA experiments",
                  blurb: "Built ARES (public analytics) and explored GPU-accelerated heuristics for EDA.",
                  bullets: ["ARES Discord + web", "OPR/ratings pipelines", "CUDA/GPU curiosity projects"],
                  tone: "purple",
                },
                {
                  title: "Mobile & BLE",
                  sub: "iOS • Android • BLE",
                  blurb:
                    "Spike Inclusive iPad app for accessible robotics education; Android RMSSD app for research.",
                  bullets: ["Expo/Native Modules (as needed)", "BLE flows", "Store/Permissions"],
                  tone: "rose",
                },
                {
                  title: "Product & UX",
                  sub: "From idea → shipped",
                  blurb: "Tight loops: problems → prototypes → production. Clear docs and APIs.",
                  bullets: ["Design systems & theming", "A11y basics", "Docs/readmes/examples"],
                  tone: "amber",
                },
              ]}
            />
          </View>

          <View style={[styles.right, isWide ? styles.rightPad : styles.rightStack]}>
            <BulletCard
              title="Key Achievements"
              bullets={[
                "800+ students impacted across teaching and tools",
                "Built ARES (FTC analytics platform + Discord bot)",
                "Spike Inclusive iPad app deployed in schools",
                "Solar Data API + RMSSD research app",
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