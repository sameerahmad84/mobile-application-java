package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
}