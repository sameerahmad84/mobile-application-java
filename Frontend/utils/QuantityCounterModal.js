// QuantityCounterModal.js
import React, { useState } from 'react';
import { View, Text, ToastAndroid, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // If you don't have Ionicons installed, you can install it using: expo install @expo/vector-icons

const QuantityCounterModal = ({ isVisible, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCartPress = () => {
    onAddToCart(quantity);
    onClose();
    //Toast
    ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>Quantity: {quantity}</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity style={styles.controlButton} onPress={handleDecrement}>
              <Ionicons name="remove-circle-outline" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handleIncrement}>
              <Ionicons name="add-circle-outline" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCartPress}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  quantityText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  controlButton: {
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default QuantityCounterModal;
