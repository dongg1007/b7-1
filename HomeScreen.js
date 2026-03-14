import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { phone } = route.params || { phone: 'Người dùng' };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Đăng nhập thành công!</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Quay lại Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subTitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  button: { 
    backgroundColor: '#0033FF', 
    paddingHorizontal: 30, 
    paddingVertical: 12, 
    borderRadius: 8 
  },
  buttonText: { color: '#fff', fontWeight: '600' }
});

export default HomeScreen;