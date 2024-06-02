import { Stack } from "expo-router";
import { AuthProvider } from "../utils/AuthContext";
import { Platform } from "react-native";
export default function _layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: Platform.OS === "android" ? "dark" : undefined,
        }}
        initialRouteName="index"
      >
        <Stack.Screen name="index" options={{ title: "Main" }} />
        <Stack.Screen name="login/index" options={{ title: "Login" }} />
        <Stack.Screen name="signup/index" options={{ title: "Sign Up" }} />
        <Stack.Screen
          name="product/index"
          options={{ title: "Product Details", presentation: "modal" }}
        />
        <Stack.Screen name="[missing]" options={{ title: "404" }} />
      </Stack>
    </AuthProvider>
  );
}
