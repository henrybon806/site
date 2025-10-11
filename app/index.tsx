import AboutPage from "@/components/about/aboutme";
import Hero from "@/components/landing/landing";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <>
      <View style={styles.page}>
        <Hero />
        <AboutPage />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
     flex: 1, 
  },
});