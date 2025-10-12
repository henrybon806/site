import AboutPage from "@/components/about/aboutme";
import ContactPage from "@/components/contact/getintouch";
import EducationAwardsPage from "@/components/education/education";
import ExperiencePage from "@/components/experience/experience";
import Hero from "@/components/landing/landing";
import ProjectsPage from "@/components/projects/projects";
import SkillsPage from "@/components/skills/skills";
import { useScrollContext } from "@/context/ScrollContext";
import React, { useRef } from "react";
import { View } from "react-native";

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
      <View ref={heroRef}><Hero /></View>
      <View ref={aboutRef}><AboutPage /></View>
      <View ref={experienceRef}><ExperiencePage /></View>
      <View ref={educationRef}><EducationAwardsPage /></View>
      <View ref={projectsRef}><ProjectsPage /></View>
      <View ref={skillsRef}><SkillsPage /></View>
      <View ref={contactRef}><ContactPage /></View>
    </View>
  );
}