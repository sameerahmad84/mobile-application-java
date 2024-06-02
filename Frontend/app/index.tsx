import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Page() {
  const local = useLocalSearchParams();

  const [loggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    if (local.loggedIn) {
      setLoggedIn(true);
    }
  }, [local.loggedIn]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       <StatusBar
        style="auto"
        backgroundColor="transparent"
        translucent={true}
      />
      {loggedIn ? (
        <Redirect href="/(drawer)/(tabs)/home" />
      ) : (
        <Redirect href="/login" />
      )}
    </View>
  );
}
