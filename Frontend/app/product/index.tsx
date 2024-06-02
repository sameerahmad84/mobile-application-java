import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import fetchInstance from "../../utils/fetchInstance";
import { useLocalSearchParams } from "expo-router";
import { Loader } from "../../utils/Loader";
import CurrencyFormatter from "../../utils/CurrencyFormatter";
import { useAuth } from "../../utils/AuthContext";
import QuantityCounterModal from "../../utils/QuantityCounterModal";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({});
  const { productId } = useLocalSearchParams();
  const { user, addToCart,cartItems } = useAuth();
  const getProduct = async () => {
    try {
      const response = await fetchInstance(`/products/get/${productId}`, {
        method: "GET",
      });
      if (response) {
        setProduct({
          ...response,
          images: [response.productImage1, response.productImage2],
        });
      }
    } catch {}
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const addComment = () => {
    // Implement your comment submission logic here
    const newComment = {
      id: new Date().getTime(),
      user: user.fullName,
      text: commentText,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem} key={item.id}>
      <Feather name="user" size={24} color="black" />
      <View style={{ marginLeft: 8 }}>
        <Text>{item.user}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {product ? (
        <>
          <View style={styles.imageContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product?.images?.map((image, index) => (
                <Image
                  key={index}
                  style={styles.productImage}
                  source={{ uri: image }}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.productTitle}>{product?.name}</Text>
            <Text style={styles.productPrice}>
              <CurrencyFormatter amount={product?.price} />
            </Text>
            <Text style={styles.productDescription}>
              {product?.description}
            </Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={() => setShowModal(true)}>
            <Feather name="shopping-cart" size={24} color="white" />
            <Text style={{ color: "white", marginLeft: 8 }}>Add to Cart</Text>
          </TouchableOpacity>
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsHeader}>Comments</Text>
            <View style={styles.commentInput}>
              <TextInput
                placeholder="Add a comment..."
                style={styles.commentInputText}
                value={commentText}
                onChangeText={(text) => setCommentText(text)}
              />
              <TouchableOpacity
                style={styles.commentButton}
                onPress={addComment}
              >
                <Feather name="send" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {comments.map((item, index) => renderCommentItem({ item }))}
            </ScrollView>
          </View>
          <QuantityCounterModal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            onAddToCart={(quantity) => addToCart(product, quantity)}
          />
        </>
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 400,
  },
  productImage: {
    width: 360,
    height: 420,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  productTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 20,
  },
  productPrice: {
    color: "green",
    marginBottom: 16,
    fontSize: 16,
  },
  productDescription: {
    lineHeight: 20,
    fontSize: 14,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  commentsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  commentsHeader: {
    fontSize: 18,
    marginBottom: 8,
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentInputText: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
  },
  commentButton: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    padding: 16,
  },
  commentItem: {
    marginVertical: 8,
    borderRadius: 8,
    borderColor: "#CED4DA",
    borderWidth: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Page;
