import { colors, fonts } from "@/constants/theme";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Diagram, { DiagramSpec } from "./diagram";

type Props = {
  image: ImageSourcePropType;
  diagram: DiagramSpec;
  title: string;
  style?: StyleProp<ViewStyle>;
};

// Project thumbnail: screenshot on the front, architecture diagram on the back. Click to flip.
export default function FlipThumb({ image, diagram, title, style }: Props) {
  const [flipped, setFlipped] = useState(false);
  const turn = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) turn.setValue(next ? 1 : 0);
    else
      Animated.timing(turn, {
        toValue: next ? 1 : 0,
        duration: 450,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }).start();
  };

  const front = turn.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const back = turn.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <View dataSet={{ print: "hide" }}>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={
          flipped ? `Show ${title} screenshot` : `Show ${title} architecture`
        }
        style={[styles.frame, style]}
      >
        <Animated.View
          style={[
            styles.face,
            { transform: [{ perspective: 800 }, { rotateY: front }] },
          ]}
        >
          <Image source={image} style={styles.image} />
        </Animated.View>
        <Animated.View
          style={[
            styles.face,
            styles.back,
            { transform: [{ perspective: 800 }, { rotateY: back }] },
          ]}
        >
          <Diagram spec={diagram} title={title.replace(/\W+/g, "-")} />
        </Animated.View>
      </Pressable>
      <Text onPress={toggle} style={styles.caption}>
        {flipped ? "⇄ show screenshot" : "⇄ show structure"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { position: "relative", cursor: "pointer" as any },
  face: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    overflow: "hidden",
    backfaceVisibility: "hidden",
  },
  back: { padding: 4 },
  image: { width: "100%", height: "100%" },
  caption: {
    marginTop: 6,
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.muted,
    cursor: "pointer" as any,
  },
});
