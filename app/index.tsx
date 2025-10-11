import AboutPage from "@/components/about/aboutme";
import ContactPage from "@/components/contact/getintouch";
import EducationAwardsPage from "@/components/education/education";
import ExperiencePage from "@/components/experience/experience";
import Hero from "@/components/landing/landing";
import ProjectsPage from "@/components/projects/projects";
import SkillsPage from "@/components/skills/skills";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <>
      <View style={styles.page}>
        <Hero />
        <AboutPage />
        <ExperiencePage />
        <EducationAwardsPage />
        <ProjectsPage />
        <SkillsPage />
        <ContactPage />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
     flex: 1, 
  },
});