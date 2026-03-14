import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';

const SignInScreen = ({ navigation }) => { 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6 && cleaned.length <= 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length > 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }
    return formatted;
  };

  const handleChangeText = (text) => {
    console.log("Dữ liệu nhận được:", text);
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted || '');
    const rawNumber = text.replace(/\D/g, '');
    if (rawNumber.length === 0) {
      setStatusMessage('');
    } else if (rawNumber.length < 10) {
      setStatusMessage('Đang nhập... (Cần đủ 10 số)');
    } else if (rawNumber.length === 10) {
      setStatusMessage('Số điện thoại hợp lệ');
    } else {
      setStatusMessage('Số điện thoại không được quá 10 số');
    }
  };

  const isReady = phoneNumber.replace(/\D/g, '').length === 10;

  const handleContinue = () => {
    if (isReady) {
      navigation.navigate('Home', { phone: phoneNumber });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Đăng nhập</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Nhập số điện thoại</Text>
          <Text style={styles.description}>
          </Text>

          <TextInput
            style={[styles.input, { borderBottomColor: isReady ? '#0033FF' : '#E8E8E8', outlineStyle: 'none' }]}
            placeholder="Nhập số điện thoại của bạn"
            
            keyboardType="phone-pad" 
            
          
             autoFocus={true}

            onChangeText={handleChangeText} 
            maxLength={13} 
          />
          {statusMessage !== '' && (
            <Text style={[styles.statusText, { color: isReady ? 'green' : '#FF9500' }]}>
              {statusMessage}
            </Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: isReady ? '#0033FF' : '#E8E8E8' }]}
          disabled={!isReady}
          onPress={handleContinue}
        >
          <Text style={[styles.buttonText, { color: isReady ? '#fff' : '#999' }]}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, paddingHorizontal: 20 },
  header: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  content: { flex: 1, marginTop: 40 },
  title: { fontSize: 22, fontWeight: '600', color: '#000', marginBottom: 10 },
  description: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 40 },
  input: { fontSize: 20, borderBottomWidth: 1, paddingVertical: 10, color: '#000' },
  statusText: { marginTop: 10, fontSize: 13, fontStyle: 'italic' },
  button: { height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});

export default SignInScreen;