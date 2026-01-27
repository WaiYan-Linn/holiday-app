import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Button, Platform, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // removed shouldShowAlert to fix the warning
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    // Request permissions on mount
    requestPermissions();
  }, []);

  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("You need to enable notifications for this to work!");
    }

    // Required for Android 8.0+ to show banners
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  }

  const scheduleTest = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "10-Second Test",
        body: "This should appear after a delay.",
      },
      trigger: {
        // Use seconds directly, or use the explicit type:
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
      },
    });
    console.log("Notification scheduled!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Test 10s Notification" onPress={scheduleTest} />
    </View>
  );
}
