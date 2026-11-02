import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export type ScrollSectionRefs = {
  [key: string]: React.RefObject<any>;
};

export type ScrollContextType = {
  scrollToSection: (section: string, animated?: boolean) => void;
  sectionRefs: ScrollSectionRefs;
  registerSectionRef: (section: string, ref: React.RefObject<any>) => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollContext must be used within ScrollProvider");
  return ctx;
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [sectionRefs, setSectionRefs] = useState<ScrollSectionRefs>({});
  const scrollViewRef = useRef<ScrollView>(null);

  const registerSectionRef = (section: string, ref: React.RefObject<View>) => {
    setSectionRefs((prev) => ({ ...prev, [section]: ref }));
  };

  const scrollToSection = (section: string, animated = true) => {
    const ref = sectionRefs[section];
    if (ref?.current && scrollViewRef.current) {
      ref.current.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x: number, y: number) => {
          scrollViewRef.current?.scrollTo({ y, animated });
        },
        (error: Error) => console.warn("Failed to measure layout", error)
      );
      // Keep the URL shareable: /#projects opens straight to Projects.
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", section === "Home" ? window.location.pathname : `#${section.toLowerCase()}`);
      }
    }
  };

  // On load, jump to the section named in the URL hash once its ref is registered.
  const pendingHash = useRef(typeof window !== "undefined" ? window.location.hash.slice(1).toLowerCase() : "");
  useEffect(() => {
    const hash = pendingHash.current;
    if (!hash) return;
    const section = Object.keys(sectionRefs).find((s) => s.toLowerCase() === hash);
    const ref = section ? sectionRefs[section] : undefined;
    if (!ref?.current || !scrollViewRef.current) return;
    pendingHash.current = "";
    const timer = setTimeout(() => {
      ref.current.measureLayout(
        scrollViewRef.current?.getInnerViewNode(),
        (x: number, y: number) => scrollViewRef.current?.scrollTo({ y, animated: false }),
        () => {}
      );
    }, 300); // after fonts and images settle the layout
    return () => clearTimeout(timer);
  }, [sectionRefs]);

  return (
    <ScrollContext.Provider value={{ scrollToSection, sectionRefs, registerSectionRef, scrollViewRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
