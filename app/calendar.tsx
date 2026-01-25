import { GlassCard } from '@/components/GlassCard';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';

export default function RemindScreen() {
  const router = useRouter();

  return (
    <GlassCard style={{ marginTop: 100, padding: 10 }}>
      <Calendar
        theme={{
          calendarBackground: 'transparent',
          textSectionTitleColor: '#007AFF',
          todayTextColor: '#007AFF',
          dayTextColor: '#1A1A1B',
        }}
        onDayPress={(day) => {
          // Pass the selected date to the Modal
          router.push({ pathname: '/modal', params: { date: day.dateString } });
        }}
      />
    </GlassCard>
  );
}