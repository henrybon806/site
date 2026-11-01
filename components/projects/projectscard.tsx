import { colors } from "@/constants/theme";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, useWindowDimensions, View } from "react-native";
import Entry from "../layout/entry";

export type ProjectCardData = {
  title: string;
  kind?: string;
  year: string;
  image?: ImageSourcePropType;
  summary: string;
  tags?: string[];
  linkUrl?: string;
};

export default function ProjectCard({ data }: { data: ProjectCardData }) {
  const { width } = useWindowDimensions();
  const entry = (
    <Entry title={data.title} kind={data.kind} date={data.year} link={data.linkUrl} body={data.summary} tags={data.tags} />
  );

  if (!data.image) return entry;

  return (
    <View style={[styles.row, width < 640 && styles.stack]}>
      <Image source={data.image} style={[styles.img, width < 640 && styles.imgFull]} />
      <View style={styles.text}>{React.cloneElement(entry, { style: { marginBottom: 0 } })}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 24, marginBottom: 32 },
  stack: { flexDirection: "column", gap: 14 },
  img: {
    width: 208,
    height: 140,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  imgFull: { width: "100%", height: 180 },
  text: { flex: 1 },
});
