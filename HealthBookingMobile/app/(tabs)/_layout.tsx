import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = false; // Thay bằng logic kiểm tra token
      if (!isAuthenticated) {
        router.replace("/index");
      } else {
        router.replace("/(tabs)/explore");
      }
      setIsReady(true);
    };
    checkAuth();
  }, [router]);

  if (!isReady) {
    return null;
  }

  return (
    <Stack initialRouteName="explore">
      <Stack.Screen name="explore" options={{ title: 'Đặt Lịch Khám' }} />
      <Stack.Screen name="register" options={{ title: 'Đăng Ký' }} />
    </Stack>
  );
}