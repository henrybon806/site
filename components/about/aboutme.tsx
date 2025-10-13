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

          {/* On mobile: show the title (above), then the portrait centered, then the bio + stats.
              On wide screens: show the original two-column layout with portrait on the right. */}
          {!isWide && (
            <View style={styles.mobilePortraitWrap}>
              <Portrait
                source={require("../../assets/images/profile.jpeg")}
                size={300}
              />
            </View>
          )}

          <View style={[styles.hero, isWide ? styles.heroRow : styles.heroCol]}>
            <View style={[styles.leftCol, !isWide && styles.leftColCenter]}>
              <BioParagraphs center={!isWide} />
              <StatsRow
                center={!isWide}
                items={[
                  { value: "5+", label: "Projects built" },
                  { value: "3.67", label: "UC Berkeley GPA" },
                ]}
              />
            </View>

            {isWide && (
              <View style={styles.rightCol}>
                <Portrait
                  source={require("../../assets/images/profile.jpeg")}
                  size={350}
                />
              </View>
            )}
          </View>

          <PhotoCard
            title="A favorite moment"
            image={require("../../assets/images/fll.jpg")}
            caption="Team photo after receiving the FIRST Lego League Mentor & Coach award."
          />
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 24, gap: 60, alignItems: "center", paddingHorizontal: 30 },
  heroRow: { flexDirection: "row", justifyContent: "space-between" },
  heroCol: { flexDirection: "column", alignItems: "center" },

  leftCol: { flex: 1, gap: 18, alignSelf: "stretch" },
  rightCol: { width: 350, alignItems: "stretch" },

  mobilePortraitWrap: { width: "100%", alignItems: "center", marginTop: 8, marginBottom: 8 },
  leftColCenter: { alignItems: "center" },
});