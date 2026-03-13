import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useAuth } from "../../context/AuthContext";

import { ApiError } from "../../services/ApiError";
import { api } from "../../services/api";

export default function Survey() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handelLogin = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const data = await api.post<LoginResponse>("/authentication/login", {
        email,
        password,
      });

      login(data.token, data.data.user);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Anheuser-Busch</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage && (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      )}
      <Pressable style={styles.button} onPress={handelLogin} disabled={loading}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.registerText}>Don't have an account?</Text>
      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/register")}
      >
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
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#E5B611",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
  registerText: {
    marginTop: 30,
    marginBottom: 10,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryText: {
    fontWeight: "600",
  },
  warning: {
    color: "#e7000b",
    fontWeight: "600",
  },
});
