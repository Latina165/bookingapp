import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:3000/api/auth/register';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      const response = await axios.post(API_URL, { username, password });
      Alert.alert('Thành công', 'Đăng ký thành công! Vui lòng đăng nhập.');
      router.replace("/");
    } catch (error: any) {
      Alert.alert('Lỗi', 'Đăng ký thất bại: ' + (error.response?.data?.error || error.message));
    }
  };

  const navigateToLogin = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hospitalName}>🏥 Bệnh viện HUST</Text>
      <Text style={styles.title}>Đăng Ký</Text>
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
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
      />
      <Button title="Đăng Ký" onPress={handleRegister} />
      <View style={styles.buttonContainer}>
        <Button title="Quay lại Đăng Nhập" onPress={navigateToLogin} color="gray" />
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
  buttonContainer: {
    marginTop: 10
  }
});