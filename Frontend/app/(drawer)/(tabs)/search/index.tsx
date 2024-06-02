import React, { useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CurrencyFormatter from "../../../../utils/CurrencyFormatter";
import fetchInstance from "../../../../utils/fetchInstance";
import { Loader } from "../../../../utils/Loader";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    if (!searchText) {
      return;
    }
    setLoading(true);
    setFilteredProducts([]);
    try {
      const response = await fetchInstance(
        "/products/search?keyword=" + searchText + "",
        {
          method: "GET",
        }
      );
      setFilteredProducts(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity  onPress={() =>
      router.push({
        pathname: "/product",
        params: { productId: item.productId },
      })
    } key={item.productId} style={{ flex: 1, margin: 8 }}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={{ uri: item.productImage1 }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
        >
          <View style={{ width: "100%" }}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.productPrice}>
              <CurrencyFormatter amount={item.price} />
            </Text>
          </View>
          {/* <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleFavoritePress(item.id)}
          >
            <Feather name="heart" size={24} color="black" />
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 8,
          paddingVertical: 5,
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Search products"
          style={styles.input}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Feather name="search" size={26} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loader />
      ) : filteredProducts.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.productId}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            ListFooterComponent={() => <View style={{ height: 16 }} />}
            ListHeaderComponent={() => <View style={{ height: 16 }} />}
            contentInset={{ top: 16, left: 16, bottom: 16, right: 16 }}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No products found</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  input: {
    width: "85%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
  },
  searchButton: {
    borderRadius: 8,
    width: "auto",
    height: "85%",
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 4,
  },
  productContainer: {
    width: 150,
    height: 220,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  favoriteButton: {
    marginLeft: 8,
  },
};

export default Page;
