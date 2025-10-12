
import Header from "@/components/header/header";
import { ScrollProvider, useScrollContext } from "@/context/ScrollContext";
import { Slot } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

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
    <>
      <Header name="Henry Bonomolo" />
      <ScrollView 
        ref={scrollViewRef} 
        style={{ flex: 1 }} 
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Slot />
      </ScrollView>
    </>
  );
}