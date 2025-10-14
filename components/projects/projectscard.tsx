import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Animated,
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type TagProps = {
  text: string;
  color: {
    text: string;
    bg: string;
    border: string;
  };
};

function Tag({ text, color }: TagProps) {
  return (
    <View style={[tagStyles.tag, { backgroundColor: color.bg, borderColor: color.border }]}>
      <Text style={[tagStyles.tagText, { color: color.text }]}>{text}</Text>
    </View>
  );
}

const tagStyles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
  },
});

const TAG_COLORS_MAP = {
  // Core Languages
  typescript: { text: "#3178C6", bg: "#EAF3FF", border: "#A8CCF9" },
  javascript: { text: "#92400E", bg: "#FFF7ED", border: "#FED7AA" },
  python: { text: "#10B981", bg: "#D1FAE5", border: "#6EE7B7" },
  java: { text: "#B45309", bg: "#FEF3C7", border: "#FCD34D" },
  kotlin: { text: "#7C3AED", bg: "#F3E8FF", border: "#C4B5FD" },

  // Frameworks & Libraries
  react: { text: "#0369A1", bg: "#E0F2FE", border: "#7DD3FC" },
  expo: { text: "#4B5563", bg: "#F3F4F6", border: "#D1D5DB" },
  "react native": { text: "#2563EB", bg: "#DBEAFE", border: "#93C5FD" },
  node: { text: "#059669", bg: "#D1FAE5", border: "#6EE7B7" },
  express: { text: "#374151", bg: "#F3F4F6", border: "#D1D5DB" },

  // Databases & APIs
  supabase: { text: "#0F766E", bg: "#F0FDFA", border: "#5EEAD4" },
  postgres: { text: "#1E40AF", bg: "#E0E7FF", border: "#93C5FD" },
  api: { text: "#0F766E", bg: "#F0FDFA", border: "#5EEAD4" },
  rest: { text: "#0369A1", bg: "#E0F2FE", border: "#7DD3FC" },
  etl: { text: "#4B5563", bg: "#F3F4F6", border: "#D1D5DB" },

  // Cloud, CI/CD, Infra
  "github actions": { text: "#4338CA", bg: "#E0E7FF", border: "#A5B4FC" },
  "ci/cd": { text: "#7C3AED", bg: "#F3E8FF", border: "#C4B5FD" },
  cloud: { text: "#155E75", bg: "#ECFEFF", border: "#67E8F9" },

  // Data Science & AI
  rl: { text: "#2563EB", bg: "#DBEAFE", border: "#93C5FD" },
  "data engineering": { text: "#1D4ED8", bg: "#DBEAFE", border: "#93C5FD" },
  "data viz": { text: "#7E22CE", bg: "#FAE8FF", border: "#E9D5FF" },
  "ml": { text: "#7E22CE", bg: "#FAE8FF", border: "#E9D5FF" },
  "pytorch": { text: "#DC2626", bg: "#FEE2E2", border: "#FCA5A5" },
  "numpy": { text: "#0369A1", bg: "#E0F2FE", border: "#7DD3FC" },

  // Robotics & Hardware
  robotics: { text: "#1E3A8A", bg: "#DBEAFE", border: "#93C5FD" },
  ble: { text: "#0E7490", bg: "#ECFEFF", border: "#67E8F9" },
  "gpu": { text: "#2563EB", bg: "#DBEAFE", border: "#93C5FD" },
  "eda": { text: "#334155", bg: "#F1F5F9", border: "#94A3B8" },

  // Tools & Platforms
  discord: { text: "#6366F1", bg: "#E0E7FF", border: "#A5B4FC" },
  "expo router": { text: "#4B5563", bg: "#F3F4F6", border: "#D1D5DB" },
  "postgrest": { text: "#0F766E", bg: "#F0FDFA", border: "#5EEAD4" },
  supabasecli: { text: "#0F766E", bg: "#F0FDFA", border: "#5EEAD4" },

  // UI / Product
  ux: { text: "#B91C1C", bg: "#FEE2E2", border: "#FCA5A5" },
  a11y: { text: "#B45309", bg: "#FEF3C7", border: "#FCD34D" },
  "design systems": { text: "#BE185D", bg: "#FCE7F3", border: "#F9A8D4" },

  // Misc / General
  research: { text: "#0E7490", bg: "#ECFEFF", border: "#67E8F9" },
  education: { text: "#15803D", bg: "#DCFCE7", border: "#86EFAC" },
  algorithms: { text: "#334155", bg: "#F1F5F9", border: "#94A3B8" },
  "data structures": { text: "#475569", bg: "#F1F5F9", border: "#CBD5E1" },
  "signal processing": { text: "#78350F", bg: "#FEF3C7", border: "#FCD34D" },
};

const DEFAULT_TAG_COLOR = { text: "#4B5563", bg: "#F3F4F6", border: "#D1D5DB" }; // Gray

const getTagColor = (text: string) => {
  const key = text.toLowerCase().trim();
  return (TAG_COLORS_MAP as any)[key] || DEFAULT_TAG_COLOR;
};

// --- PROJECT CARD COMPONENT ---
export type ProjectCardData = {
  title: string;
  year: string;
  image: any;
  summary: string;
  tags?: string[];
  linkText?: string;
  linkUrl?: string;
  details?: string[];  
  learnings?: string[];
};

export default function ProjectCard({ data }: { data: ProjectCardData }) {
  const [flipped, setFlipped] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const flipTo = (toOne: boolean) => {
    Animated.spring(anim, {
      toValue: toOne ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start(() => setFlipped(toOne));
  };

  const rotateY = anim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  const rotateYBack = anim.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] });
  const frontOpacity = anim.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0] });
  const backOpacity  = anim.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1] });

  return (
    <View style={styles.wrap}>
      {/* FRONT */}
      <Animated.View
        style={[styles.card, styles.front, { transform: [{ rotateY }], opacity: frontOpacity }]}
        pointerEvents={flipped ? "none" : "auto"}
      >
        <Image source={data.image} style={styles.img} />
        <View style={styles.content}>
          <View style={styles.upperContent}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.year}>{data.year}</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
          
          <View style={styles.bottomContent}>
            {!!data.tags?.length && (
              <View style={styles.tags}>
                {/* NOW uses the tag text (t) to look up the color type */}
                {data.tags.map((t, i) => <Tag key={i} text={t} color={getTagColor(t)} />)}
              </View>
            )}

            {data.linkUrl ? (
              <Pressable style={styles.linkRow} onPress={() => Linking.openURL(data.linkUrl!)}>
                <Ionicons name="open-outline" size={16} color="#2563EB" />
                <Text style={styles.linkText}>{data.linkText ?? "Open"}</Text>
              </Pressable>
            ) : null}
          </View>
        </View>

        <Pressable style={styles.infoBtn} onPress={() => flipTo(true)} accessibilityLabel="Flip for more">
          <Ionicons name="swap-horizontal-outline" size={18} color="#4B5563" />
        </Pressable>
      </Animated.View>

      {/* BACK */}
      <Animated.View
        style={[styles.card, styles.back, { transform: [{ rotateY: rotateYBack }], opacity: backOpacity }]}
        pointerEvents={flipped ? "auto" : "none"}
      >
        <View style={styles.backContent}>
          <Text style={styles.backTitle}>Build Notes</Text>
          {data.details?.map((d, i) => (
            <View key={i} style={styles.liRow}>
              <View style={styles.dot} />
              <Text style={styles.liText}>{d}</Text>
            </View>
          ))}

          {data.learnings?.length ? (
            <>
              <Text style={[styles.backTitle, { marginTop: 10 }]}>Lessons</Text>
              {data.learnings.map((d, i) => (
                <View key={i} style={styles.liRow}>
                  <View style={styles.dot} />
                  <Text style={styles.liText}>{d}</Text>
                </View>
              ))}
            </>
          ) : null}
        </View>

        <Pressable style={styles.infoBtn} onPress={() => flipTo(false)} accessibilityLabel="Flip back">
          <Ionicons name="swap-horizontal-outline" size={18} color="#4B5563" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 8, height: '100%' },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    height: '100%',

    backfaceVisibility: "hidden" as any,
  },
  front: { position: "relative", height: '100%' },
  back:  { position: "absolute", top: 8, left: 8, right: 8, bottom: 8 },

  img: { 
    width: "100%", 
    height: 170, 
    backgroundColor: "#F3F4F6",
    objectFit: "cover" as any,  // Ensure images display properly at different widths
  },
  content: { 
    padding: 14, 
    paddingHorizontal: 16,  // Slightly more horizontal padding for better readability on wider cards
    flex: 1,
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  upperContent: { 
    marginBottom: 12 
  },
  bottomContent: { 
    marginTop: 'auto'
  },
  title: { fontSize: 16, fontWeight: "800", color: "#111827" },
  year: { fontSize: 12, color: "#6B7280" },
  summary: { fontSize: 13, color: "#374151", lineHeight: 19, marginTop: 2, marginBottom: 12 },
  tags: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 6, 
    marginBottom: 10
  },

  linkRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 6,
    marginTop: 4
  },
  linkText: { color: "#2563EB", fontSize: 13, fontWeight: "600" },

  infoBtn: {
    position: "absolute", top: 10, right: 10,
    width: 32,
    height: 32, 
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1, borderColor: "#E5E7EB",
    alignItems: "center", 
    justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },

  backContent: { padding: 14, height: '100%', display: 'flex', flexDirection: 'column' },
  backTitle: { fontSize: 14, fontWeight: "800", color: "#111827" },
  liRow: { flexDirection: "row", gap: 8, alignItems: "flex-start", marginTop: 6 },
  liText: { flex: 1, fontSize: 13, color: "#374151", lineHeight: 19 },
  dot: { marginTop: 6, width: 6, height: 6, borderRadius: 3, backgroundColor: "#7C9CF5" },
});
