import { Feather, Ionicons } from "@expo/vector-icons"
import { Linking, Pressable, StyleSheet, Text, View } from "react-native"

export type ContactItem = {
  label: string
  value: string
  href: string
  icon?: { pack: "ion" | "feather"; name: string }
}

export default function ContactCard({ label, value, href, icon }: ContactItem) {
  const IconComp = icon?.pack === "feather" ? Feather : Ionicons

  const onPress = () => Linking.openURL(href)

  // determine brand colors based on label/href/icon name
  const key = (label || "" + href || "" + (icon?.name || "")).toLowerCase()

  let iconColor = "#16A34A" // fallback green
  let iconBg = "#ECFDF5"
  let iconBorder = "#DCFCE7"

  if (key.includes("linkedin") || key.includes("logo-linkedin")) {
    iconColor = "#0A66C2"
    iconBg = "#E6F2FB"
    iconBorder = "#D6EAFB"
  } else if (key.includes("github") || key.includes("logo-github")) {
    // use a purple accent for GitHub icons
    iconColor = "#6F42C1"
    iconBg = "#F3F0FF"
    iconBorder = "#E9E2FF"
  } else if (key.includes("mail") || key.includes("gmail") || key.includes("mailto")) {
    iconColor = "#EA4335"
    iconBg = "#FFF1F0"
    iconBorder = "#FFE6E4"
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconBox, { backgroundColor: iconBg, borderColor: iconBorder }]}>
        {icon ? <IconComp name={icon.name as any} size={32} color={iconColor} /> : null}
      </View>
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
    borderColor: "#E2E8F0",
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
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#DCFCE7",
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
    color: "#4B5563",
    fontWeight: "400",
    textAlign: "center",
  },
})
