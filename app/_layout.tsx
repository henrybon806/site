
import Header from "@/components/header/header";
import { Slot } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Header name="Henry Bonomolo" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Slot />
      </ScrollView>
    </>
  );
}