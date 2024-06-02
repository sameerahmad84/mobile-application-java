import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import fetchInstance from "../../../../utils/fetchInstance";
import { Loader } from "../../../../utils/Loader";
import { useAuth } from "../../../../utils/AuthContext";
import { RefreshControl } from "react-native-gesture-handler";

const SliderBanner = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [sales, setSales] = useState([]);

  const getSales = async () => {
    try {
      const response = await fetchInstance("/sales/getAll", {
        method: "GET",
      });
      setSales(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  const renderItem = ({ item }) => (
    <Image
      key={item.saleId}
      style={bannerStyles.bannerImage}
      source={{ uri: item.saleImage }}
      resizeMode="cover"
    />
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((selectedIndex + 1) % sales.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedIndex, sales.length]);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(e) =>
        setSelectedIndex(
          e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
        )
      }
    >
      {sales.map((item) => renderItem({ item }))}
    </ScrollView>
  );
};

const bannerStyles = StyleSheet.create({
  bannerImage: {
    height: 520,

    width: 360,
    overflow: "hidden",
  },
});

const Page = () => {
  const router = useRouter();
  const { refreshing, startRefresh, endRefresh } = useAuth();
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    setCategories([]);
    try {
      const response = await fetchInstance("/categories/getAll", {
        method: "GET",
      });
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [trendProducts, setTrendProducts] = useState([]);
  const getTrendProducts = async () => {
    setTrendProducts([]);
    try {
      const response = await fetchInstance("/products/trendProducts", {
        method: "GET",
      });
      setTrendProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getTrendProducts();
  }, []);

  useEffect(() => {
    if (refreshing) {
      startRefresh();
      getCategories();
      getTrendProducts();
      endRefresh();
    }
  }, [refreshing]);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={startRefresh} />
        }
      >
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Image
              style={styles.logo}
              source={require("../../../../assets/images/logo.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/search")}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {categories.length > 0 && trendProducts.length > 0 ? (
          <>
            <ScrollView>
              <View style={{ flex: 1 }}>
                <SliderBanner />
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  style={styles.smallBannersContainer}
                >
                  {trendProducts.map((product) => (
                    <TouchableOpacity
                      key={product.productId}
                      onPress={() =>
                        router.push({
                          pathname: "/product",
                          params: { productId: product.productId },
                        })
                      }
                    >
                      <Image
                        style={styles.smallBanner}
                        source={{ uri: product.productImage1 }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <View style={styles.categoryContainer}>
                  <View style={styles.categoryCard}>
                    <Image
                      style={styles.categoryImage}
                      source={{ uri: categories[0]?.categoryImage }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View
                  style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}
                >
                  <View style={{ width: "50%" }}>
                    <Image
                      style={{
                        width: "100%",
                        height: 225,
                      }}
                      source={{ uri: categories[1]?.categoryImage }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Image
                      style={{
                        width: "100%",
                        height: 225,
                      }}
                      source={{ uri: categories[2]?.categoryImage }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Image
                      style={{
                        width: "100%",
                        height: 225,
                      }}
                      source={{ uri: categories[3]?.categoryImage }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Image
                      style={{
                        width: "100%",
                        height: 225,
                      }}
                      source={{ uri: categories[4]?.categoryImage }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View style={styles.categoryContainer}>
                  <View style={styles.categoryCard}>
                    <Image
                      style={styles.categoryImage}
                      source={{ uri: categories[5]?.categoryImage }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: Dimensions.get("window").height/1.2 }}>
            <Loader />
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logo: {
    width: 80,
    height: 40,
  },
  mainBanner: {
    height: 200,
    width: "100%",
    marginBottom: 16,
    borderRadius: 8,
  },
  smallBannersContainer: {
    marginBottom: 16,
  },
  smallBanner: {
    flex: 1,
    height: 250,
    width: 200,
    marginTop: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  categoryContainer: {
    flex: 1,
    padding: 0,
  },
  categoryCard: {
    width: "100%",
    height: "100%",
  },
  categoryImage: {
    width: "100%",
    height: 500,
  },
});

export default Page;
