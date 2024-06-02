package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.OrderItem;
import com.st_gen_app.crud.entity.User;
import com.st_gen_app.crud.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
    public List<OrderItem> saveAllOrdersItem(List<OrderItem> orders)
    {
        return orderItemRepository.saveAll(orders);
    }
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> getOrderItemById(Integer orderItemId) {
        return orderItemRepository.findById(orderItemId);
    }

    public String deleteOrderItem(Integer orderItemId) {
        orderItemRepository.deleteById(orderItemId);
        return "Order Item Removed !! " + orderItemId;
    }

    public OrderItem updateOrderItem(OrderItem orderItem) {
        OrderItem existingOrderItem = orderItemRepository.getById(orderItem.getOrderItemId());
        existingOrderItem.setOrder(orderItem.getOrder());
        existingOrderItem.setProduct(orderItem.getProduct());
        existingOrderItem.setQuantity(orderItem.getQuantity());
        existingOrderItem.setSubtotal(orderItem.getSubtotal());

        return orderItemRepository.save(existingOrderItem);
    }
}