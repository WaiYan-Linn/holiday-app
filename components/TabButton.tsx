import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text } from 'react-native';

export function TabButton({ isFocused, label, icon, ...props }: any) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.onPress?.();
  };

  return (
    <Pressable {...props} onPress={handlePress} style={styles.button}>
      <Ionicons 
        name={icon as any} 
        size={24} 
        color={isFocused ? '#007AFF' : '#8E8E93'} 
      />
      <Text style={[styles.text, { color: isFocused ? '#007AFF' : '#8E8E93' }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: 'center', justifyContent: 'center', padding: 10 },
  text: { fontSize: 12, marginTop: 4, fontWeight: '600' }
});