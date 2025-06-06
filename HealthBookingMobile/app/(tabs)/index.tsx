import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:3000/api/auth/login';

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
      const errorMessage = error.response?.data?.error || error.message;
      Alert.alert('Lỗi', 'Đăng nhập thất bại: ' + errorMessage);
    }
  };

  const navigateToRegister = () => {
    router.push('/(tabs)/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hospitalName}>🏥 Bệnh viện HUST</Text>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput 
        style={styles.input} 
        value={username} 
        onChangeText={setUsername} 
        placeholder="Tên đăng nhập"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
        placeholder="Mật khẩu" 
        secureTextEntry 
      />
      <Button title="Đăng Nhập" onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Button title="Đăng Ký" onPress={navigateToRegister} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2196F3'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  registerContainer: {
    marginTop: 10
  }
});