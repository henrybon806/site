import React from "react";
import { StyleSheet, View } from "react-native";
import ContactCard, { ContactItem } from "./contactcard";

export default function ContactList({ items }: { items: ContactItem[] }) {
  return (
    <View style={styles.wrap}>
      {items.map((it, i) => (
        <ContactCard key={i} {...it} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    maxWidth: 960,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});