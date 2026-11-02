import { colors, fonts } from "@/constants/theme";
import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Link from "./link";

type Props = PropsWithChildren<{
  title: string;
  kind?: string;
  date?: string;
  link?: string;
  orgUrl?: string; // links just the organization: the part of the title after the last " · "
  body?: string;
  points?: string[];
  links?: { label: string; url: string }[]; // extra links under the tags, e.g. Live and Code
  tags?: string[];
  style?: StyleProp<ViewStyle>;
}>;

// One row in a section: "Title · Org" on the left, mono date on the right, then body and tags.
export default function Entry({ title, kind, date, link, orgUrl, body, points, links, tags, style, children }: Props) {
  const split = orgUrl ? title.lastIndexOf(" · ") : -1;
  const arrow = <Text style={styles.arrow}> ↗</Text>;

  return (
    <View dataSet={{ print: "keep" }} style={[styles.wrap, style]}>
      {kind ? <Text style={styles.kind}>{kind}</Text> : null}
      <View style={styles.header}>
        {split >= 0 ? (
          <Text style={styles.title}>
            {title.slice(0, split + 3)}
            <Link href={orgUrl!} style={styles.orgLink}>
              {title.slice(split + 3)}
              {arrow}
            </Link>
          </Text>
        ) : link ? (
          <Link href={link} style={styles.title}>
            {title}
            {arrow}
          </Link>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
        {date ? <Text style={styles.date}>{date}</Text> : null}
      </View>

      {body ? <Text style={styles.body}>{body}</Text> : null}
      {points?.length ? (
        <View style={styles.points}>
          {points.map((pt) => (
            <View key={pt} style={styles.point}>
              <Text style={styles.bullet}>–</Text>
              <Text style={styles.pointText}>{pt}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {children}

      {tags?.length || links?.length ? (
        <View style={styles.footerRow}>
          {tags?.length ? (
            <View style={styles.tags}>
              {tags.map((t) => (
                <Text key={t} style={styles.tag}>{t}</Text>
              ))}
            </View>
          ) : null}
          {links?.length ? (
            <View style={styles.links}>
              {links.map((l) => (
                <Link key={l.url} href={l.url} style={styles.extraLink}>
                  {l.label} ↗
                </Link>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 28 },
  kind: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.accent,
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16,
  },
  title: {
    flexShrink: 1,
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
  arrow: { fontSize: 13 },
  orgLink: {
    textDecorationLine: "underline",
    textDecorationColor: colors.line,
  },
  date: { flexShrink: 0, fontFamily: fonts.mono, fontSize: 12, color: colors.muted },
  body: {
    marginTop: 8,
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.body,
  },
  points: { marginTop: 8, gap: 4 },
  point: { flexDirection: "row", gap: 8 },
  bullet: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.muted },
  pointText: { flex: 1, fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.body },
  // Tags on the left, extra links on the right of the same row; wraps under on narrow widths.
  footerRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 10 },
  links: { flexDirection: "row", gap: 16 },
  extraLink: { fontFamily: fonts.mono, fontSize: 12, color: colors.text, textDecorationLine: "underline", textDecorationColor: colors.line },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.body,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
