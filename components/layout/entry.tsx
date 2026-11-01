import { colors, fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { openLink } from "../contact/getintouch";

type Props = PropsWithChildren<{
  title: string;
  kind?: string;
  date?: string;
  link?: string;
  orgUrl?: string; // links just the organization: the part of the title after the last " · "
  body?: string;
  tags?: string[];
  style?: StyleProp<ViewStyle>;
}>;

// One row in a section: "Title · Org" on the left, mono date on the right, then body and tags.
export default function Entry({ title, kind, date, link, orgUrl, body, tags, style, children }: Props) {
  const split = orgUrl ? title.lastIndexOf(" · ") : -1;
  const arrow = <Text> <Feather name="arrow-up-right" size={14} color={colors.text} /></Text>;

  return (
    <View style={[styles.wrap, style]}>
      {kind ? <Text style={styles.kind}>{kind}</Text> : null}
      <View style={styles.header}>
        {split >= 0 ? (
          <Text style={styles.title}>
            {title.slice(0, split + 3)}
            <Text style={styles.orgLink} onPress={() => openLink(orgUrl!)} accessibilityRole="link">
              {title.slice(split + 3)}
              {arrow}
            </Text>
          </Text>
        ) : (
          <Text style={styles.title} onPress={link ? () => openLink(link) : undefined}>
            {title}
            {link ? arrow : null}
          </Text>
        )}
        {date ? <Text style={styles.date}>{date}</Text> : null}
      </View>

      {body ? <Text style={styles.body}>{body}</Text> : null}
      {children}

      {tags?.length ? (
        <View style={styles.tags}>
          {tags.map((t) => (
            <Text key={t} style={styles.tag}>{t}</Text>
          ))}
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
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
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
