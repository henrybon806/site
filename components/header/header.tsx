import { colors, COLUMN_MAX } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderLeft from "./leftside";
import HeaderRight from "./rightside";

type HeaderProps = {
  name?: string;
};

// The header is a bordered box exactly as wide as the content boxes, starting at the same
// height as the mazes' top border, so its edges continue the mazes' borders.
export default function Header({ name }: HeaderProps) {
  return (
    <View dataSet={{ print: "hide" }} style={styles.outer}>
      <View style={styles.bar}>
        <View style={styles.background}>
          <View style={styles.row}>
            <HeaderLeft name={name} />
            <View style={{ flex: 1 }} />
            <HeaderRight />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: "100%",
    zIndex: 10,
    paddingTop: 6, // matches EDGE in pagemaze.tsx
  },
  // Same geometry as Container + its box: COLUMN_MAX wide, 4px outside the box on each side.
  bar: {
    width: "100%",
    maxWidth: COLUMN_MAX,
    alignSelf: "center",
    height: 56,
    paddingHorizontal: 4,
  },
  background: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.line,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
