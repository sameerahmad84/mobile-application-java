package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand,Integer> {
}