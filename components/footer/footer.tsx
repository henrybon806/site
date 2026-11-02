import { colors, currentTheme, followSystemTheme, fonts, setTheme, Theme, COLUMN_MAX } from '@/constants/theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EMAIL_TEXT, LinkRow, useMailto } from '../contact/getintouch';
import SectionTitle from '../experience/title';
import { boxStyles } from '../layout/container';
import Link from '../layout/link';
import { useMazeBlock } from '../layout/pagemaze';

function ThemeToggle() {
  // Unknown until mounted: the server render can't know the visitor's theme.
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    setThemeState(currentTheme());
    return followSystemTheme(setThemeState);
  }, []);

  const choose = (t: Theme) => {
    setTheme(t);
    setThemeState(t);
  };

  return (
    <View style={styles.toggle} accessibilityRole="radiogroup" accessibilityLabel="Color theme">
      {(['light', 'dark'] as const).map((t, i) => (
        <React.Fragment key={t}>
          {i > 0 ? <Text style={styles.text}> / </Text> : null}
          <Text
            accessibilityRole="radio"
            accessibilityState={{ checked: theme === t }}
            onPress={() => choose(t)}
            style={[styles.text, styles.option, theme === t && styles.active]}
          >
            {t}
          </Text>
        </React.Fragment>
      ))}
    </View>
  );
}

// Set by the deploy workflow; absent in local builds.
const COMMIT = process.env.EXPO_PUBLIC_COMMIT ?? "";
const BUILT_AT = process.env.EXPO_PUBLIC_BUILT_AT ?? ""; // YYYY-MM-DD
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Rendered after mount so the static HTML and the first client render always match.
function BuildInfo() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !COMMIT || !BUILT_AT) return null;
  const [y, m, d] = BUILT_AT.split("-").map(Number);
  return (
    <Text style={styles.text}>
      Updated {MONTHS[m - 1]} {d}, {y} ·{' '}
      <Link href={`https://github.com/henrybon806/site/commit/${COMMIT}`} style={[styles.text, styles.source]}>
        {COMMIT.slice(0, 7)}
      </Link>
    </Text>
  );
}

// The closing section: contact, then the colophon (copyright, what the mazes are, theme).
const Footer = () => {
  const blockRef = useMazeBlock();
  const mailto = useMailto();
  return (
    <View dataSet={{ print: "hide" }} style={styles.container}>
      <View ref={blockRef} style={[boxStyles.box, styles.inner]}>
        <SectionTitle title="Contact" />
        <Text style={styles.lead}>
          Reach out about roles, research, or anything you&apos;re building. The fastest way is{' '}
          <Link href={mailto} style={styles.emailLink}>{EMAIL_TEXT}</Link>.
        </Text>
        <LinkRow footer />

        <View style={styles.colophon}>
          <View style={styles.colophonRow}>
            <Text style={styles.text}>© {new Date().getFullYear()} Henry Bonomolo</Text>
            <ThemeToggle />
          </View>
          <Text style={styles.text}>
            The side mazes race two search algorithms on the same mirrored maze ·{' '}
            <Link href="https://github.com/henrybon806/site" style={[styles.text, styles.source]}>
              source ↗
            </Link>
          </Text>
          <BuildInfo />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: COLUMN_MAX,
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  inner: {
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  lead: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.body,
    marginBottom: 14,
  },
  colophon: {
    gap: 6,
    marginTop: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  colophonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  text: {
    flexShrink: 1,
    fontFamily: fonts.mono,
    fontSize: 11,
    lineHeight: 18,
    color: colors.muted,
  },
  emailLink: { color: colors.text, textDecorationLine: 'underline', textDecorationColor: colors.line },
  source: { textDecorationLine: 'underline', textDecorationColor: colors.line },
  toggle: { flexDirection: 'row', alignItems: 'center' },
  option: { textTransform: 'uppercase', letterSpacing: 0.8 },
  active: { color: colors.text, textDecorationLine: 'underline' },
});

export default Footer;
