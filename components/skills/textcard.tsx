import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TextCard({ title, text }: { title?: string; text: string }) {
  const isFun = !title;
  
  const funCardStyle = isFun ? styles.funCard : {};
  const funTextStyle = isFun ? styles.funText : {};

  return (
    <View style={[styles.card, funCardStyle]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={[styles.text, funTextStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // --- Base Card Style (Applies to all) ---
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  title: { 
    fontSize: 15, 
    fontWeight: "800", 
    color: "#111827", 
    marginBottom: 6 
  },
  text: { 
    fontSize: 14, 
    color: "#4B5563", 
    lineHeight: 20, 
    textAlign: "left"
  },

  // --- Interesting/Fun Styles (Applied when 'title' is missing) ---
  funCard: {
    backgroundColor: "#E0F2FE", 
    paddingVertical: 24, 
    paddingHorizontal: 20,
    borderWidth: 0, 
    shadowOpacity: 0.1,
  },
  funText: {
    fontSize: 16, 
    fontWeight: "600",
    color: "#075985", 
    textAlign: "center" as any, 
  },
});
