import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

// Window width that is 0 on the server and on the first client render, so the static HTML
// and hydration agree (no React #418); the real width arrives right after mount.
export function useWindowWidth() {
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? width : 0;
}
