import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface TabButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  isFocused?: boolean;
}

export function TabButton({ icon, isFocused, ...props }: TabButtonProps) {
  return (
    <Pressable {...props} style={styles.button}>
      <Ionicons
        name={icon}
        size={24}
        color={isFocused ? "#007AFF" : "#8E8E93"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, alignItems: "center", justifyContent: "center" },
});
