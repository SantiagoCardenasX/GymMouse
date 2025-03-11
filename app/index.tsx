import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Welcome to Gym Mouse</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/home')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSignUp} onPress={() => router.push('/signup')}>
        <Text style={styles.buttonSignUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#212121',
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#EBEBEB',
  },

  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#EBEBEB',
    marginBottom: 10,
  },

  button: {
    width: '80%',
    backgroundColor: '#FF7B24',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },

  buttonText: { 
    color: '#EBEBEB',
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  buttonSignUp: {
    width: '80%',
    backgroundColor: '#333333',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },

  buttonSignUpText: { 
    color: '#EBEBEB',
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

});