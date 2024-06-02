import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CurrencyFormatter from './CurrencyFormatter';
import { Swipeable } from 'react-native-gesture-handler';

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onQuantityChange(item, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(item, quantity - 1);
    }
  };

  const renderRightActions = (_, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={() => onRemoveItem(item)}>
        <View style={styles.deleteButton}>
          <Ionicons name="trash-bin-outline" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.cartItemContainer}>
        <Image style={styles.productImage} source={{ uri: item.productImage1 }} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.itemDetails}>
            <CurrencyFormatter amount={item.price} /> x {item.quantity}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.itemTotal}>
            <CurrencyFormatter amount={item.price * quantity} />
          </Text>
          <View style={styles.quantityAdjustment}>
            <TouchableOpacity onPress={handleDecrement}>
              <Ionicons name="remove-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement}>
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    height: 100,
  },
  productImage: {
    width: 80,
    height: '100%',
    resizeMode: 'contain',
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 12,
    color: '#777',
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  quantityAdjustment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
});

export default CartItem;
