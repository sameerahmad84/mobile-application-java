import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Text,
} from "react-native";
import fetchInstance from "../../../../utils/fetchInstance";
import { Loader } from "../../../../utils/Loader";
import { router } from "expo-router";
import CurrencyFormatter from "../../../../utils/CurrencyFormatter";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAdvancedFilterOpen, setAdvancedFilterOpen] = useState(false);
  const [selectedAdvancedFilter, setSelectedAdvancedFilter] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [filters, setFilters] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const response = await fetchInstance("/categories/getAll", {
        method: "GET",
      });
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };
  const escapeRegExpMatch = function (s) {
    return s?.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  const isExactMatch = (str, match) => {
    return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`).test(str);
  };
  const getAdvancedFilters = async () => {
    setFilters([]);
    try {
      const response = await fetchInstance("/brands/getAll", {
        method: "GET",
      });
      setFilters(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterProducts = async () => {
    if (!selectedCategory) return;
    if (!selectedAdvancedFilter) return;
    setProductsData([]);
    setLoading(true);
    try {
      const response = await fetchInstance(
        `/products/filter?categoryId=${selectedCategory?.categoryId}&filterId=${selectedAdvancedFilter?.brandId}`,
        {
          method: "GET",
        }
      );
      setProductsData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setAdvancedFilters([]);
    if (filters) {
      filters.forEach((item) => {
        if (isExactMatch(item?.name, selectedCategory?.name))
          setAdvancedFilters((prev) => [...prev, item]);
      });
      if (selectedCategory?.name == "Men Tees") {
        setAdvancedFilters([
          filters?.find((item) => item?.name == "Men T-Shirt"),
        ]);
      }
    }
  }, [filters]);
  const toggleCategory = () => {
    setCategoryOpen(!isCategoryOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryOpen(false);
    setSelectedAdvancedFilter(null);
    getAdvancedFilters();
  };

  const toggleAdvancedFilter = () => {
    setAdvancedFilterOpen(!isAdvancedFilterOpen);
  };

  const selectAdvancedFilterOption = (option) => {
    setSelectedAdvancedFilter(option);
    setAdvancedFilterOpen(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.filterSection}>
        <Text style={styles.heading}>Categories:</Text>
        <TouchableOpacity onPress={toggleCategory}>
          <View style={styles.dropdownContainer}>
            <Text>{selectedCategory?.name || "Select Category"}</Text>
          </View>
        </TouchableOpacity>
        {isCategoryOpen && (
          <View style={styles.advancedFilterOptions}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category?.categoryId}
                style={styles.advancedFilter}
                onPress={() =>
                  selectCategory({
                    categoryId: category?.categoryId,
                    name: category.name,
                  })
                }
              >
                <Text>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={styles.filterSection}>
        <Text style={styles.heading}>Price Range:</Text>
        <View style={styles.priceRangeInputContainer}>
          <TextInput
            style={styles.priceRangeInput}
            placeholder="Min"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={(text) => setMinPrice(text.replace(/[^0-9]/g, ""))}
          />
          <Text style={styles.priceRangeSeparator}>-</Text>
          <TextInput
            style={styles.priceRangeInput}
            placeholder="Max"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={(text) => setMaxPrice(text.replace(/[^0-9]/g, ""))}
          />
        </View>
      </View>
      {selectedCategory && advancedFilters.length > 0 ? (
        <View style={styles.filterSection}>
          <Text style={styles.heading}>Advanced Filter:</Text>
          <TouchableOpacity onPress={toggleAdvancedFilter}>
            <View style={styles.dropdownContainer}>
              <Text>{selectedAdvancedFilter?.name || "Select Filter"}</Text>
            </View>
          </TouchableOpacity>
          {isAdvancedFilterOpen && advancedFilters.length > 0
            ? advancedFilters.map((item,index) => (
                <View style={styles.advancedFilterOptions} key={index}>
                  <TouchableOpacity
                    onPress={() => selectAdvancedFilterOption(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              ))
            : null}
        </View>
      ) : null}
      <TouchableOpacity style={styles.applyButton} onPress={getFilterProducts}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
      {/* Display filtered products */}
      {loading ? (
        <View style={{marginTop: 140}}>
        <Loader />
        </View>
      ) : productsData.length > 0 ? (
        <View style={{paddingBottom: 30}}>
          {productsData
            .filter((product) => {
              const priceRangeFilter =
                (!minPrice || product.price >= parseInt(minPrice, 10)) &&
                (!maxPrice || product.price <= parseInt(maxPrice, 10));
              return priceRangeFilter;
            })
            .map((item) => (
              <TouchableOpacity onPress={() =>
                router.push({
                  pathname: "/product",
                  params: { productId: item.productId },
                })
              } key={item.productId} style={styles.productItem}>
                <Image
                  style={styles.productImage}
                  source={{ uri: item.productImage1 }}
                  resizeMode="cover"
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productCategory}>
                    Category:{" "}
                    {
                      advancedFilters.find(
                        (f) => f?.categoryId == item?.categoryId
                      )?.name
                    }
                  </Text>
                  <Text style={styles.productPrice}>
                    Price: <CurrencyFormatter amount={item.price} />
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 180 }}>
        <Text>No products found</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterSection: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  advancedFilterOptions: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  priceRangeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceRangeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    marginRight: 5,
  },
  priceRangeSeparator: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  applyButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
  },
  applyButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  productImage: {
    width: 80,
    height: 120,
    marginRight: 16,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 14,
    color: "#888",
  },
  productPrice: {
    fontSize: 16,
    color: "green",
    marginTop: 8,
  },
  advancedFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default Page;
