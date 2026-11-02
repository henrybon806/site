import { PAGE_MAX } from "@/constants/theme";
import AboutPage from "@/components/about/aboutme";
import EducationAwardsPage from "@/components/education/education";
import ExperiencePage from "@/components/experience/experience";
import Footer from "@/components/footer/footer";
import Hero from "@/components/landing/landing";
import ProjectsPage from "@/components/projects/projects";
import SkillsPage from "@/components/skills/skills";
import { useScrollContext } from "@/context/ScrollContext";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Head from "expo-router/head";

export default function App() {
  // Get scroll context functions
  const { registerSectionRef } = useScrollContext();

  // Create section refs
  const heroRef = useRef<View>(null);
  const aboutRef = useRef<View>(null);
  const experienceRef = useRef<View>(null);
  const educationRef = useRef<View>(null);
  const projectsRef = useRef<View>(null);
  const skillsRef = useRef<View>(null);
  const contactRef = useRef<View>(null);

  // Register all section refs with the context
  React.useEffect(() => {
    registerSectionRef("Home", heroRef);
    registerSectionRef("About", aboutRef);
    registerSectionRef("Experience", experienceRef);
    registerSectionRef("Education", educationRef);
    registerSectionRef("Projects", projectsRef);
    registerSectionRef("Skills", skillsRef);
    registerSectionRef("Contact", contactRef);
  }, [registerSectionRef]);

  return (
    <View style={{ flex: 1 }}>
      <Head>
        <title>Henry Bonomolo</title>
      </Head>
      <View style={styles.page}>
        <View ref={heroRef}><Hero /></View>
        <View ref={aboutRef}><AboutPage /></View>
        <View ref={experienceRef}><ExperiencePage /></View>
        <View ref={projectsRef}><ProjectsPage /></View>
        <View ref={educationRef}><EducationAwardsPage /></View>
        <View ref={skillsRef}><SkillsPage /></View>
        <View ref={contactRef}><Footer /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Transparent reading column; the maze fades out behind it (see CONTENT_FADE in background.tsx).
  page: {
    flexGrow: 1,
    width: "100%",
    maxWidth: PAGE_MAX,
    alignSelf: "center",
  },
});
