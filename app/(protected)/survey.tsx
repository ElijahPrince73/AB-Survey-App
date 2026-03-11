
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from '../../context/AuthContext';


export default function Survey() {

  const { logout } = useAuth();

  const handelLogin = async () => {

    logout()
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handelLogin}>
        <Text style={styles.buttonText}>Logout</Text>
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