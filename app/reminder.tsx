import * as Notifications from "expo-notifications";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    // Replacing the deprecated shouldShowAlert:
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function ReminderScreen() {
  const [selectedDay, setSelectedDay] = useState("");

  async function testFastNotification() {
    console.log("Permission status: granted");

    try {
      console.log("Attempting to schedule...");

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Fast Test Success! ",
          body: "10 seconds are up.",
          priority: Notifications.AndroidNotificationPriority.MAX,
        },
        trigger: {
          // Changed back to seconds for the 'Fast' test
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 10,
        },
      });

      console.log("Scheduled! ID:", id);
      alert("Check back in 10 seconds!");
    } catch (error: any) {
      console.log("Schedule Error:", error);
      alert("Schedule Error: " + error.message);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Holiday Reminder</Text>

      <View style={styles.calendarCard}>
        <Calendar
          onDayPress={(day: any) => setSelectedDay(day.dateString)}
          markedDates={{
            [selectedDay]: { selected: true, selectedColor: "#007AFF" },
          }}
          theme={{
            todayTextColor: "#007AFF",
            arrowColor: "#007AFF",
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.dateText}>
          {selectedDay ? `Selected: ${selectedDay}` : "Pick a date"}
        </Text>
        <Button
          title="Schedule Reminder"
          onPress={testFastNotification}
          disabled={!selectedDay}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 100 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  calendarCard: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  infoContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 15,
  },
  dateText: { fontSize: 16, marginBottom: 10, textAlign: "center" },
});
