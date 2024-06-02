// AuthContext.js
import { router } from "expo-router";
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const startRefresh = () => setRefreshing(true);
  const endRefresh = () => setRefreshing(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find(
      (item) => item.productId === product.productId
    );
    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const clearHistory = () => {
    while (router.canGoBack()) {
      // Pop from stack until one element is left
      router.back();
    }
    router.replace("/");
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    clearHistory();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        addToCart,
        cartItems,
        setCartItems,
        startRefresh,
        endRefresh,
        refreshing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
