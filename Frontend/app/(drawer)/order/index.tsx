import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import fetchInstance from "../../../utils/fetchInstance";
import CurrencyFormatter from "../../../utils/CurrencyFormatter";
import { useAuth } from "../../../utils/AuthContext";
import { RefreshControl } from "react-native-gesture-handler";

const Page = () => {
  const { user, refreshing, startRefresh, endRefresh } = useAuth();
  const [orderItems, setOrderItems] = useState([]);

  const getOrders = async () => {
    const response = await fetchInstance(
      `/orders/userOrders?userId=${user.userId}`,
      {
        method: "GET",
      }
    );

    setOrderItems(response);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (refreshing) {
      startRefresh();
      getOrders();
      endRefresh();
    }
  }, [refreshing]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={startRefresh} />
      }
    >
      <View>
        <View style={styles.container}>
          <View style={styles.orderStatusContainer}>
            <View style={styles.orderStatusHeader}>
              <Text style={styles.headerText}>Order Tracking</Text>
            </View>
            {orderItems && orderItems.length > 0 ? (
              <FlatList
                data={orderItems}
                keyExtractor={(item) => item.orderId.toString()}
                renderItem={({ item }) => (
                  <View style={styles.orderItem}>
                    <View>
                      <Text
                        style={{ fontWeight: "bold" }}
                      >{`Order ID:${item.orderId}`}</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {"Total Amount:  "}
                        <CurrencyFormatter amount={item.totalAmount} />
                      </Text>
                    </View>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No Orders</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVerticalTop: 6,
  },
  orderStatusContainer: {
    flex: 1,
  },
  orderStatusHeader: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  statusText: {
    fontWeight: "bold",
  },
});

export default Page;
