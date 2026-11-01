import { colors, currentTheme, followSystemTheme, fonts, setTheme, Theme } from '@/constants/theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { boxStyles } from '../layout/container';
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

const Footer = () => {
  const blockRef = useMazeBlock();
  return (
    <View style={styles.container}>
      <View ref={blockRef} style={[boxStyles.box, styles.inner]}>
        <Text style={styles.text}>
          © {new Date().getFullYear()} Henry Bonomolo
        </Text>
        <ThemeToggle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  inner: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
  },
  toggle: { flexDirection: 'row', alignItems: 'center' },
  option: { textTransform: 'uppercase', letterSpacing: 0.8 },
  active: { color: colors.text, textDecorationLine: 'underline' },
});

export default Footer;
