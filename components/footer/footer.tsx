import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={[styles.container, {
      backgroundColor: '#fff',
      borderColor: '#e5e7eb',
    }]}>
      <View style={styles.linkRow}>
        <Text style={[styles.copyright, { color: '#6b7280' }]}>
            © {new Date().getFullYear()} Henry Bonomolo. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    gap: 4,
  },
  linkRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  link: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  separator: {
    fontSize: 12,
  },
  copyright: {
    fontSize: 11,
  },
});

export default Footer;