import React, { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type Props = PropsWithChildren<{ href: string; style?: StyleProp<TextStyle> }>;

// A real <a href> on web (react-native-web renders Text with href as an anchor), so links can be
// Cmd-clicked, hovered to show the URL, copied, and followed by crawlers. External links open in
// a new tab; mailto stays in place.
export default function Link({ href, style, children }: Props) {
  const external = !href.startsWith("mailto:") && !href.startsWith("#");
  const anchor = {
    href,
    hrefAttrs: external ? { target: "_blank", rel: "noopener noreferrer" } : undefined,
  };
  return (
    <Text role="link" style={style} {...(anchor as object)}>
      {children}
    </Text>
  );
}
