import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function _layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} initialRouteName="home">
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: () => <Feather name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="catalog/index"
        options={{
          title: "Catalog",
          tabBarLabel: "Catalog",
          tabBarIcon: () => <Feather name="list" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Search",
          tabBarLabel: "Search",
          tabBarIcon: () => <Feather name="search" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: "Cart",
          tabBarLabel: "Cart",
          tabBarIcon: () => (
            <Feather name="shopping-cart" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
