import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import fetchInstance from "../../utils/fetchInstance";
import { useAuth } from "../../utils/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleLogin = async () => {
    if (email !== "" || password !== "") {
      try {
        const response = await fetchInstance("/users/authUser", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (response !== null) {
          login(response);
          return router.push({ pathname: "/", params: { loggedIn: true } });
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  return (
    <View style={loginStyling.container}>
      <TextInput
        style={loginStyling.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={loginStyling.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={loginStyling.button} onPress={handleLogin}>
        <Text style={loginStyling.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={loginStyling.text}>
        Don't have an account?
        <Link style={loginStyling.linkText} href="/signup">
          {" "}
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default LoginScreen;

const loginStyling = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    marginVertical: 10,
  },
  linkText: {
    color: "#3498db",
  },
});
