import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export type ExperienceItem = {
  role: string;
  org: string;
  link?: string;
  location: string;
  date: string;
  description: string;
  tags?: string[];
  accentColor?: string;
};

const getDomainName = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch (e) {
    return "(Link)";
  }
};

export default function ExperienceCard({
  role,
  org,
  link,
  location,
  date,
  description,
  tags = [],
  accentColor = "#64748b",
}: ExperienceItem) {
  const linkText = link ? getDomainName(link) : '';

  return (
    <View style={styles.card}>
      <View style={styles.headerWrapper}>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.subWrapper}>
        {link ? (
          <Pressable onPress={() => Linking.openURL(link)} style={styles.orgLinkContainer}>
            <Text style={[styles.orgLink, { color: accentColor }]}>{org}</Text>
            <Text style={[styles.linkDomain, { color: accentColor }]}> ({linkText})</Text>
          </Pressable>
        ) : (
          <Text style={[styles.org, { color: accentColor }]}>{org}</Text>
        )}
        <Text style={styles.location}>{location}</Text>
      </View>

      <Text style={styles.desc}>{description}</Text>

      <View style={styles.tagRow}>
        {tags.map((t, i) => (
          <View key={i} style={[styles.tag, {
            backgroundColor: `${accentColor}10`,
            borderColor: `${accentColor}25`
          }]}>
            <Text style={[styles.tagText, { color: accentColor }]}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 8,
  },
  role: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    flexShrink: 1,
    marginRight: 4,
  },
  date: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
    flexShrink: 0,
    marginLeft: 'auto',
  },

  subWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    flexWrap: "wrap",
    gap: 4,
  },
  // New wrapper for organization and link to keep them together
  orgLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
    flexShrink: 1,
  },
  org: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
    flexShrink: 1,
  },
  orgLink: {
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
  },
  linkDomain: {
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "underline",
    flexShrink: 0,
  },
  location: {
    fontSize: 13,
    color: "#6B7280",
    flexShrink: 0,
    marginLeft: 'auto',
  },

  desc: {
    fontSize: 14,
    lineHeight: 22,
    color: "#374151",
    marginTop: 8
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12
  },
  tag: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500"
  },
});