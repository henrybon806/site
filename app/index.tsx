import AboutPage from "@/components/about/aboutme";
import ContactPage from "@/components/contact/getintouch";
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
    console.log("Registered all section refs");
  }, [registerSectionRef]);

  return (
    <View style={{ flex: 1 }}>
      <Head>
        <title>Henry Bonomolo</title>
      </Head>
      <View ref={heroRef}><Hero /></View>
      <View ref={experienceRef} style={styles.sectionExperience}><ExperiencePage /></View>
      <View ref={educationRef} style={styles.sectionEducation}><EducationAwardsPage /></View>
      <View ref={projectsRef} style={styles.sectionProjects}><ProjectsPage /></View>
      <View ref={skillsRef} style={styles.sectionSkills}><SkillsPage /></View>
      <View ref={contactRef} style={styles.sectionContact}><ContactPage /></View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionAbout: { backgroundColor: "#FFFFFF" },
  sectionExperience: { backgroundColor: "#F9F9F9" }, 
  sectionEducation: { backgroundColor: "#F6F6F6" }, 
  sectionProjects: { backgroundColor: "#FBFBFB" },
  sectionSkills: { backgroundColor: "#F3F3F3" }, 
  sectionContact: { backgroundColor: "#F6F6F6" },
});