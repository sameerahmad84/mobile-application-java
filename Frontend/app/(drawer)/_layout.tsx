import React from "react";
import { Drawer } from "expo-router/drawer";
import { View, StyleSheet, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import {  useAuth } from "../../utils/AuthContext";

export default function _layout() {
  const { user, logout } = useAuth();
  return (
      <Drawer
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <View style={styles.headerContainer}>
              <Image source={{ uri: user?.profileImage }} style={styles.logo} />
              <Text style={styles.username}>{user?.fullName}</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => {logout(); }} />
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
        <Drawer.Screen name="order/index" options={{ title: "Order Status" }} />
      </Drawer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    marginRight: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
