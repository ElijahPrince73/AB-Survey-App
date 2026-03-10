import { router } from 'expo-router';
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Survey() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Anheuser-Busch</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={() => router.push("/survey")}>Login</Text>
      </Pressable>
      <Text style={styles.registerText}>Don't have an account?</Text>
      <Pressable style={styles.secondaryButton}>
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
    backgroundColor: "#C9A24A",
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
  }
});