import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Container from "../layout/container";
import BioParagraphs from "./bio";
import PhotoCard from "./photocard";
import Portrait from "./portrait";
import StatsRow from "./statrow";
import AboutTitle from "./title";

export default function AboutPage() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <>
      <View >
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
                source={require("../../assets/images/profile.jpeg")}
                size={240}
              />
            </View>
          </View>

          <PhotoCard
            title="A favorite moment"
            image={require("../../assets/images/fll.jpg")}
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