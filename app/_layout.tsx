import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The Tabs Group */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* The Detail Page - "modal" makes it slide up on iOS */}
      <Stack.Screen
        name="details/[id]"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Holiday Details",
        }}
      />
    </Stack>
  );
}
