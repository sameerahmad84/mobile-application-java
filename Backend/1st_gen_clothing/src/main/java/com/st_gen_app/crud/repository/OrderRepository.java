package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Integer> {
}