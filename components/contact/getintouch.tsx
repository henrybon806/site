import { colors, fonts } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Link from "../layout/link";

export const RESUME_URL = "https://resume.henrybonomolo.com";

// Shown spelled out, and the mailto link is only assembled in the browser after mount, so the
// address never appears in the static HTML that scrapers read.
export const EMAIL_TEXT = "hbono\u00A0[at]\u00A0berkeley\u00A0[dot]\u00A0edu";
const EMAIL_PARTS = ["hbono", "berkeley.edu"];

export function useMailto() {
  const [href, setHref] = useState("#contact");
  useEffect(() => setHref(`mailto:${EMAIL_PARTS.join("@")}`), []);
  return href;
}

export const CONTACT_LINKS = [
  { label: "Email", href: "email" }, // replaced with useMailto() when rendered
  { label: "LinkedIn", href: "https://www.linkedin.com/in/henrybonomolo" },
  { label: "GitHub", href: "https://github.com/henrybon806" },
];

const FOOTER_LINKS = [
  ...CONTACT_LINKS,
  { label: "LeetCode", href: "https://leetcode.com/u/hbono4" },
  { label: "Resume", href: RESUME_URL },
];

export function LinkRow({ footer = false }: { footer?: boolean }) {
  const mailto = useMailto();
  const links = (footer ? FOOTER_LINKS : CONTACT_LINKS).map((l) => (l.href === "email" ? { ...l, href: mailto } : l));
  return (
    <View style={styles.row}>
      {links.map((l) => (
        <Link key={l.label} href={l.href} style={styles.link}>
          {l.label}
          <Text style={styles.arrow}> ↗</Text>
        </Link>
      ))}
    </View>
  );
}

// The resume as a clear button, since it's the link recruiters look for first.
export function ResumeButton() {
  return (
    <Link href={RESUME_URL} style={styles.button}>
      Resume ↗
    </Link>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", columnGap: 20, rowGap: 8 },
  link: { fontFamily: fonts.sans, fontSize: 14, color: colors.text },
  arrow: { fontSize: 12 },
  button: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.bg,
    backgroundColor: colors.text,
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 7,
    overflow: "hidden",
  },
});
