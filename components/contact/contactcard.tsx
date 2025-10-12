import { View, Text, StyleSheet, Pressable, Linking } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"

export type ContactItem = {
  label: string
  value: string
  href: string
  icon?: { pack: "ion" | "feather"; name: string }
}

export default function ContactCard({ label, value, href, icon }: ContactItem) {
  const IconComp = icon?.pack === "feather" ? Feather : Ionicons

  const onPress = () => Linking.openURL(href)

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.iconBox}>{icon ? <IconComp name={icon.name as any} size={32} color="#6366F1" /> : null}</View>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    flex: 1,
    minWidth: 0,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  content: {
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    letterSpacing: -0.3,
    textAlign: "center",
  },
  value: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "400",
    textAlign: "center",
  },
})
