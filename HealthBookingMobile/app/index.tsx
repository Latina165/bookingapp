import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.1.100:3000/api/auth/login'; // Thay IP máy tính

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      const response = await axios.post(API_URL, { username, password });
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      router.replace('/(tabs)/explore');
    } catch (error: any) {
      Alert.alert('Lỗi', 'Đăng nhập thất bại: ' + error.message);
    }
  };

  const navigateToRegister = () => {
    router.push('/(tabs)/register');
  };

  return (
    <View style={styles.container}>
      <Text>Bệnh viện Hust</Text>
      <Text>Đăng Nhập</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Tên đăng nhập" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Mật khẩu" secureTextEntry />
      <Button title="Đăng Nhập" onPress={handleLogin} />
      <Button title="Đăng Ký" onPress={navigateToRegister} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 },
});