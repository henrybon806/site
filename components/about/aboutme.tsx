import React from "react";
import { View, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import { Stack } from "expo-router";
import Container from "../layout/container";
import AboutTitle from "./title";
import BioParagraphs from "./bio";
import StatsRow from "./statrow";
import Portrait from "./portrait";
import PhotoCard from "./photocard";

export default function AboutPage() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <>
      <Stack.Screen options={{ title: "About", headerShown: true }} />
      <View style={{ flex: 1, backgroundColor: "#F5F6FB" }}>
        <Container>
          <AboutTitle />

          <View style={[styles.hero, isWide ? styles.heroRow : styles.heroCol]}>
            <View style={styles.leftCol}>
              <BioParagraphs />
              <StatsRow
                items={[
                  { value: "5+", label: "Projects built" },
                  { value: "3.67", label: "UC Berkeley GPA" },
                ]}
              />
            </View>

            <View style={styles.rightCol}>
              <Portrait
                source={{ uri: "https://placehold.co/600x600.jpg" }} // replace with your portrait URL or require()
                size={240}
              />
            </View>
          </View>

          <PhotoCard
            title="A favorite moment"
            image={{ uri: "https://placehold.co/1000x700.jpg" }} // swap for your photo
            caption="Weekend hike with my corgi co-pilot."
          />
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 24, gap: 24, alignItems: "center" },
  heroRow: { flexDirection: "row", justifyContent: "space-between" },
  heroCol: { flexDirection: "column" },

  leftCol: { flex: 1, maxWidth: 700, gap: 18, alignSelf: "stretch" },
  rightCol: { width: 280, alignItems: "center" },
});