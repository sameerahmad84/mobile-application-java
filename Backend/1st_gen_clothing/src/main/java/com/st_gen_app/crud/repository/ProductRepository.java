package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Integer> {
}