import React from "react";
import { View, StyleSheet } from "react-native";
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
  wrap: { gap: 12, maxWidth: 820, alignSelf: "center", width: "100%" },
});