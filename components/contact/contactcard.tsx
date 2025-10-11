import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon?: { pack: "ion" | "feather"; name: string };
};

export default function ContactCard({ label, value, href, icon }: ContactItem) {
  const IconComp = icon?.pack === "feather" ? Feather : Ionicons;

  const onPress = () => Linking.openURL(href);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.iconBox}>
        {icon ? <IconComp name={icon.name as any} size={22} color="#5B7CF7" /> : null}
      </View>
      <View style={styles.texts}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={1}>{value}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  pressed: { transform: [{ translateY: 1 }] },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  texts: { flex: 1 },
  label: { fontSize: 14, fontWeight: "700", color: "#111827" },
  value: { fontSize: 13, color: "#4B5563", marginTop: 2 },
});