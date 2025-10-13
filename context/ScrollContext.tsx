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
  scrollProgress: number; // 0 to 1 representing scroll progress
  handleScroll: (event: any) => void;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollContext must be used within ScrollProvider");
  return ctx;
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [sectionRefs, setSectionRefs] = useState<ScrollSectionRefs>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const registerSectionRef = (section: string, ref: React.RefObject<View>) => {
    setSectionRefs((prev) => ({ ...prev, [section]: ref }));
  };

  const scrollToSection = (section: string) => {
    console.log(`Scrolling to section: ${section}`);
    console.log(`Available refs: ${Object.keys(sectionRefs).join(", ")}`);
    
    const ref = sectionRefs[section];
    if (ref?.current && scrollViewRef.current) {
      console.log("Found ref and scrollView, measuring layout");
      ref.current.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x: number, y: number) => {
          console.log(`Scrolling to y: ${y}`);
          scrollViewRef.current?.scrollTo({ y, animated: true });
        },
        (error: Error) => console.log("Failed to measure layout", error)
      );
    } else {
      console.log(`Missing ref (${!!ref?.current}) or scrollView (${!!scrollViewRef.current})`);
    }
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const scrollHeight = contentSize.height;
    const viewHeight = layoutMeasurement.height;
    
    const maxScroll = scrollHeight - viewHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
    
    setScrollProgress(progress);
    console.log(`Scroll progress: ${Math.round(progress * 100)}%`);
  };

  return (
    <ScrollContext.Provider value={{ scrollToSection, sectionRefs, registerSectionRef, scrollViewRef, scrollProgress, handleScroll }}>
      {children}
    </ScrollContext.Provider>
  );
}
