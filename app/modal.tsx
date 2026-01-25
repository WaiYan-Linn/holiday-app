import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';

// Dynamically import only when needed to avoid top-level crash in Expo Go
let Notifications: any;
if (Platform.OS !== 'web') {
  Notifications = require('expo-notifications');
}

export default function ReminderModal() {
  const { date } = useLocalSearchParams();
  const [note, setNote] = useState('');
  const router = useRouter();

  const saveReminder = async () => {
    // If on Expo Go and it still complains, we wrap in try-catch
    try {
      if (!Notifications) {
        Alert.alert("Error", "Notifications not supported on this platform");
        return;
      }

      // 1. Check permissions
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert("Permission Required", "Please enable notifications in settings.");
          return;
        }
      }

      // 2. Schedule Local Only
      const [year, month, day] = (date as string).split('-').map(Number);
      const triggerDate = new Date(year, month - 1, day, 9, 0, 0);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder! 🔔",
          body: note || "You have a planned event today!",
          sound: true,
          priority: 'high',
        },
        trigger: {
          date: triggerDate,
        },
      });

      Alert.alert("Success", `Reminder set for ${date}`);
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Notice", "Local notifications are restricted in this version of Expo Go. Use a development build for full features.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 40, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Add Note</Text>
      <Text style={{ fontSize: 16, color: '#666' }}>{date}</Text>
      
      <TextInput 
        placeholder="What's the plan?" 
        style={{ 
          borderBottomWidth: 2, 
          borderBottomColor: '#007AFF', 
          marginVertical: 30, 
          fontSize: 18,
          paddingBottom: 5
        }}
        onChangeText={setNote}
        multiline
      />
      
      <Button title="Save Reminder" onPress={saveReminder} color="#007AFF" />
      <View style={{ marginTop: 10 }}>
        <Button title="Cancel" onPress={() => router.back()} color="#FF3B30" />
      </View>
    </View>
  );
}