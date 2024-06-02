package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.Product;
import com.st_gen_app.crud.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Integer productId) {
        return productRepository.findById(productId);
    }

    public String deleteProduct(Integer productId) {
        productRepository.deleteById(productId);
        return "Product Removed !! " + productId;
    }

    public Product updateProduct(Product product) {
        Product existingProduct = productRepository.getById(product.getProductId());
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setSeason(product.getSeason());

        return productRepository.save(existingProduct);
    }

    public List<Product> getTrendProducts(){
        List<Product> allProducts=getAllProducts();
        // Shuffle the list
        Collections.shuffle(allProducts);

        // Get a sublist with the desired number of random products
        List<Product> randomProducts = allProducts.subList(0, Math.min(10, allProducts.size()));

        return randomProducts;
    }

    public List<Product> searchProducts(String keyword) {
        List<Product> allProducts = getAllProducts();
        List<Product> searchResults = new ArrayList<>();

        // Loop through all products and check if the keyword is present in the product name
        for (Product product : allProducts) {
            if (product.getName().toLowerCase().contains(keyword.toLowerCase())) {
                searchResults.add(product);
            }
        }
        return searchResults;
    }

    public List<Product> filterProducts(Integer categoryId,Integer filterId)
    { List<Product> allProducts = getAllProducts();
        List<Product> filteredProducts = new ArrayList<>();
        for (Product product : allProducts) {
            if ((categoryId.equals(product.getCategory().getCategoryId())) &&
                    ( filterId.equals(product.getBrand().getBrandId())) ){
                filteredProducts.add(product);
            }
        }
        return filteredProducts;
    }
}