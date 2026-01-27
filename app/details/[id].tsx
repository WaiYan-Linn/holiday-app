import { GlassCard } from "@/components/GlassCard";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HolidayDetailScreen() {
  const { id, name, desc } = useLocalSearchParams();
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const holidayId = decodeURIComponent(id as string);
  const storageKey = `@note_${holidayId}`;

  // Load note on mount
  useEffect(() => {
    const loadNote = async () => {
      try {
        const savedNote = await AsyncStorage.getItem(storageKey);
        if (savedNote !== null) setNote(savedNote);
      } catch (e) {
        console.error("Failed to load note", e);
      }
    };
    loadNote();
  }, [holidayId]);

  // Save note function
  const saveNote = async () => {
    setIsSaving(true);
    try {
      await AsyncStorage.setItem(storageKey, note);
      // Optional: Add a haptic feedback or a small toast here
    } catch (e) {
      console.error("Failed to save note", e);
    } finally {
      setTimeout(() => setIsSaving(false), 500); // Small delay for UX
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Stack.Screen
          options={{ headerTitle: "Details", headerTransparent: true }}
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <GlassCard style={styles.mainCard} hero={true}>
            <Text style={styles.categoryText}>HOLIDAY INFO</Text>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{desc}</Text>
          </GlassCard>

          {/* --- NOTES SECTION --- */}
          <View style={styles.noteSection}>
            <Text style={styles.sectionLabel}>YOUR NOTES</Text>
            <GlassCard style={styles.inputCard}>
              <TextInput
                style={styles.input}
                placeholder="Add travel plans, reminders or traditions..."
                placeholderTextColor="rgba(0,0,0,0.3)"
                multiline
                value={note}
                onChangeText={setNote}
                onBlur={saveNote} // Auto-save when user finishes typing
              />

              <Pressable
                onPress={saveNote}
                style={({ pressed }) => [
                  styles.saveButton,
                  { opacity: pressed || isSaving ? 0.6 : 1 },
                ]}
              >
                <Ionicons
                  name={isSaving ? "checkmark-circle" : "save-outline"}
                  size={20}
                  color={isSaving ? "#28a745" : "#007AFF"}
                />
                <Text
                  style={[styles.saveText, isSaving && { color: "#28a745" }]}
                >
                  {isSaving ? "Saved" : "Save Note"}
                </Text>
              </Pressable>
            </GlassCard>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  scrollContent: { padding: 20, paddingTop: 110 },
  mainCard: { padding: 20, borderRadius: 24, marginBottom: 20 },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#007AFF",
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1B",
    marginBottom: 12,
  },
  description: { fontSize: 16, lineHeight: 24, color: "#444" },

  // Note Styles
  noteSection: { marginTop: 10 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#666",
    marginBottom: 10,
    marginLeft: 5,
  },
  inputCard: { padding: 15, borderRadius: 20 },
  input: {
    fontSize: 16,
    color: "#1A1A1B",
    minHeight: 100,
    textAlignVertical: "top", // For Android
    paddingTop: 0,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  saveText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#007AFF",
    marginLeft: 6,
  },
});
