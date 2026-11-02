
import Header from "@/components/header/header";
import PageMaze from "@/components/layout/pagemaze";
import { ScrollProvider, useScrollContext } from "@/context/ScrollContext";
import { Slot } from "expo-router";
import { ensureThemeLoaded } from "@/constants/theme";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function RootLayout() {
  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  );
}

function AppContent() {
  const { scrollViewRef } = useScrollContext();

  useEffect(ensureThemeLoaded, []);

  return (
    <View style={{ flex: 1 }}>
      <PageMaze />
      <Header name="Henry Bonomolo" />
      <ScrollView
        ref={scrollViewRef}
        dataSet={{ print: "scroll" }}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Slot />
      </ScrollView>
    </View>
  );
}
