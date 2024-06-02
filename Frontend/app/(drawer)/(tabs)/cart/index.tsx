import React, {  useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Modal
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CurrencyFormatter from "../../../../utils/CurrencyFormatter";
import { useAuth } from "../../../../utils/AuthContext";
import CartItem from "../../../../utils/CartItem";
import fetchInstance from "../../../../utils/fetchInstance";
const Page = () => {
  const {
    cartItems,
    setCartItems,
    user
  } = useAuth();

  const calculateTotal = () => {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
    }
    return total;
  };
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const togglePaymentModal = () => {
    setPaymentModalVisible(!isPaymentModalVisible);
  };

  const createOrder = async () => {
    //In body we will pass order_date, status, total_amount, user_id
    const order = {
      //yyyyy-MM-dd
      orderDate: new Date().toISOString().slice(0, 10),
      status: "Pending",
      totalAmount: calculateTotal().toFixed(2),
      user: { userId: user.userId },
    };
    const response = await fetchInstance("/orders/add", {
      method: "POST",
      body: JSON.stringify(order),
    });
    if (response) {
      individualOrder(response.orderId);
    } else {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
  };

  const handlePayment = async () => {
    if (selectedPaymentMethod === "cash") {
      await createOrder();
      togglePaymentModal();
    } else if (selectedPaymentMethod === "online") {
      await createOrder();
      togglePaymentModal();
    } else {
      ToastAndroid.show("Please select a payment method", ToastAndroid.SHORT);
    }
  };

  const individualOrder = async (orderId) => {
    if (orderId) {
      const orderItem = cartItems.map((item) => {
        return {
          order: { orderId: orderId },
          quantity: item.quantity,
          subtotal: (item.price * item.quantity).toFixed(2),
          product: { productId: item.productId },
        };
      });
      fetchInstance("/orderItems/addAll", {
        method: "POST",
        body: JSON.stringify(orderItem),
      });
      setCartItems([]);
      setSelectedPaymentMethod(null);
      ToastAndroid.show(
        "Order created successfully with order id " + orderId,
        ToastAndroid.SHORT
      );

    } else {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
  };
 
  return (
    <View
      style={styles.container}
    >
      <ScrollView style={styles.cartItemsContainer}>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <View key={item.productId} style={{ marginBottom: 16 }}>
              <CartItem
                key={item.productId}
                item={item}
                onQuantityChange={(product, quantity) => {
                  const updatedCartItems = cartItems.map((cartItem) => {
                    if (cartItem.productId === product.productId) {
                      return {
                        ...cartItem,
                        quantity,
                      };
                    }
                    return cartItem;
                  });
                  setCartItems(updatedCartItems);
                }}
                onRemoveItem={(product) => {
                  const updatedCartItems = cartItems.filter(
                    (cartItem) => cartItem.productId !== product.productId
                  );
                  setCartItems(updatedCartItems);
                }}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text>No items in cart</Text>
          </View>
        )}
      </ScrollView>
      {cartItems && cartItems.length > 0 && (
        <>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>
              <CurrencyFormatter amount={calculateTotal()} />
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={togglePaymentModal}
          >
            <Feather name="shopping-cart" size={24} color="white" />
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
      <Modal
        visible={isPaymentModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.paymentModal}>
            <Text style={styles.paymentHeader}>Select Payment Method</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === "cash" && styles.selectedOption,
              ]}
              onPress={() => setSelectedPaymentMethod("cash")}
            >
              <Text>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
            disabled
              style={[
                styles.paymentOption,
                selectedPaymentMethod === "online" && styles.selectedOption,
              ]}
              onPress={() => setSelectedPaymentMethod("online")}
            >
              <Text>Online Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={togglePaymentModal}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handlePayment}
            >
              <Text>Confirm Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cartItemsContainer: {
    flex: 1,
    marginBottom: 50,
  },
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDetails: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  itemTotal: {
    fontSize: 16,
    marginLeft: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    bottom: 40,
  },
  totalText: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutText: {
    color: "white",
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: "center",
    //screen height
    paddingTop: Dimensions.get("window").height / 3,
  },
  // Payment Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    elevation: 5,
  },
  paymentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paymentOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
    color: "white",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Page;
