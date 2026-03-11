import { router } from 'expo-router';
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useAuth } from '../../context/AuthContext';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Survey() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth();

  const handelLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/authentication/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        setError(true)
        return
      }

      const data = await response.json();

      login(data.token, data.data.user)
    } catch (error) {
      console.log('Login Error', error);
    } finally {
      setLoading(false)
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Anheuser-Busch</Text>
      <TextInput style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && (<View><Text>Email or Password is incorrect</Text></View>)}
      <Pressable style={styles.button} onPress={handelLogin} disabled={loading}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.registerText}>Don't have an account?</Text>
      <Pressable style={styles.secondaryButton} onPress={() => router.push('/register')}>
        <Text style={styles.secondaryText}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
    marginBottom: 15
  },
  button: {
    backgroundColor: "#E5B611",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "700"
  },
  registerText: {
    marginTop: 30,
    marginBottom: 10,
    fontWeight: "600"
  },
  secondaryButton: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
    alignItems: "center"
  },
  secondaryText: {
    fontWeight: "600"
  },
  warning: {
    color: '#e7000b',
    fontWeight: "600"
  }
});