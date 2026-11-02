import { colors } from "@/constants/theme";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { useWindowWidth } from "../layout/usewidth";
import Entry from "../layout/entry";
import Diagram, { DiagramSpec } from "./diagram";
import FlipThumb from "./flipthumb";

export type ProjectCardData = {
  title: string;
  kind?: string;
  year: string;
  image?: ImageSourcePropType;
  summary: string;
  tags?: string[];
  linkUrl?: string;
  links?: { label: string; url: string }[]; // shown under the tags, e.g. Live and Code
  diagram?: DiagramSpec; // drawn in place of a screenshot
};

export default function ProjectCard({ data }: { data: ProjectCardData }) {
  const width = useWindowWidth();
  const entry = (
    <Entry title={data.title} kind={data.kind} date={data.year} link={data.linkUrl} body={data.summary} tags={data.tags} links={data.links} />
  );

  if (!data.image && !data.diagram) return entry;
  const narrow = width > 0 && width < 640;

  return (
    <View style={[styles.row, narrow && styles.stack]}>
      {data.image && data.diagram ? (
        <FlipThumb image={data.image} diagram={data.diagram} title={data.title} style={[styles.thumb, narrow && styles.imgFull]} />
      ) : data.diagram ? (
        <View dataSet={{ print: "hide" }} style={[styles.img, styles.diagram, narrow && styles.imgFull]}>
          <Diagram spec={data.diagram} title={data.title.replace(/\W+/g, "-")} />
        </View>
      ) : (
        <Image dataSet={{ print: "hide" }} source={data.image!} style={[styles.img, narrow && styles.imgFull]} />
      )}
      <View style={styles.text}>{React.cloneElement(entry, { style: { marginBottom: 0 } })}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 24, marginBottom: 32 },
  stack: { flexDirection: "column", gap: 14 },
  img: {
    width: 208,
    height: 152, // close to the screenshots' ~4:3 shape, so little gets cropped
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  diagram: { padding: 4 },
  thumb: { width: 208, height: 152 },
  imgFull: { width: "100%", height: undefined, aspectRatio: 1.37 },
  text: { flex: 1 },
});
