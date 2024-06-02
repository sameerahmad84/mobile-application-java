package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount,Integer> {
}