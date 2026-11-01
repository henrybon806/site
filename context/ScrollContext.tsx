import React, { createContext, useContext, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export type ScrollSectionRefs = {
  [key: string]: React.RefObject<any>;
};

export type ScrollContextType = {
  scrollToSection: (section: string) => void;
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

  const scrollToSection = (section: string) => {
    const ref = sectionRefs[section];
    if (ref?.current && scrollViewRef.current) {
      ref.current.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x: number, y: number) => {
          scrollViewRef.current?.scrollTo({ y, animated: true });
        },
        (error: Error) => console.warn("Failed to measure layout", error)
      );
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollToSection, sectionRefs, registerSectionRef, scrollViewRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
