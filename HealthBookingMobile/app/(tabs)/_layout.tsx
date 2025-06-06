import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="explore" 
        options={{ 
          title: 'Đặt Lịch Khám',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: 'white'
        }} 
      />
    </Stack>
  );
}
