import { View, Text, ActivityIndicator } from "react-native";

export const Loader = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Loading...</Text>
  </View>
);
