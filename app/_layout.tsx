
import Header from "@/components/header/header";
import LifeBackground from "@/context/background";
import { ScrollProvider, useScrollContext } from "@/context/ScrollContext";
import { Slot } from "expo-router";
import React from "react";
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
  
  return (
    <View style={{ flex: 1 }}>
      <Header name="Henry Bonomolo" />
      <ScrollView 
        ref={scrollViewRef} 
        style={{ flex: 1 }} 
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <LifeBackground 
          cellSize={16}
          pathColor="#0c4a6e"
          visitedColor="#0c4a6e"
          wallColor="#1e3a5f"
          bgColor="#0b1020"
          opacity={0.9}
          tickMs={50}
        />
        <Slot />
      </ScrollView>
    </View>
  );
}