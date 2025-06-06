import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status?: string;
}

const API_URL = 'http://localhost:3000/api/appointments';

export default function ExploreScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get<Appointment[]>(API_URL);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleBookAppointment = async () => {
    if (!patientName || !doctorName || !date || !time) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      await axios.post(API_URL, { patientName, doctorName, date, time });
      Alert.alert('Thành công', 'Đặt lịch thành công!');
      setPatientName(''); setDoctorName(''); setDate(''); setTime('');
      fetchAppointments();
    } catch (error) {
      Alert.alert('Lỗi', 'Lỗi khi đặt lịch: ' + (error as any).message);
    }
  };

  const renderItem = ({ item }: { item: Appointment }) => (
    <View style={styles.item}>
      <Text>Bệnh nhân: {item.patientName}</Text>
      <Text>Bác sĩ: {item.doctorName}</Text>
      <Text>Ngày: {new Date(item.date).toLocaleDateString('vi-VN')}</Text> {/* Sửa lỗi: bọc trong <Text> */}
      <Text>Giờ: {item.time}</Text> {/* Sửa lỗi: bọc trong <Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt Lịch Khám</Text>
      <TextInput style={styles.input} value={patientName} onChangeText={setPatientName} placeholder="Tên bệnh nhân" />
      <TextInput style={styles.input} value={doctorName} onChangeText={setDoctorName} placeholder="Tên bác sĩ" />
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Ngày (YYYY-MM-DD)" />
      <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="Giờ (HH:MM)" />
      <Button title="Đặt Lịch" onPress={handleBookAppointment} />
      <Text style={styles.title}>Danh Sách Lịch Khám</Text>
      <FlatList data={appointments} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});