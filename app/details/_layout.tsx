import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

export default function DetailsLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Universal Background */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        }}
        style={StyleSheet.absoluteFill}
        blurRadius={18}
      />

      <Stack
        screenOptions={{
          headerTransparent: true,
          headerTintColor: "#1A1A1B",
          headerTitleStyle: { fontWeight: "700" },
          // No mask here, just the pure stack
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="[id]" options={{ headerTitle: "" }} />
      </Stack>
    </View>
  );
}
