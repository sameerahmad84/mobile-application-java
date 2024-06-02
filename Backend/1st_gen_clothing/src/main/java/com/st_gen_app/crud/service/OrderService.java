package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.Order;
import com.st_gen_app.crud.entity.Product;
import com.st_gen_app.crud.repository.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Integer orderId) {
        return orderRepository.findById(orderId);
    }
    public List<Order> getOrderByUserId(Integer userId){
    List<Order> allOrders=getAllOrders();
        List<Order> totalOrder = new ArrayList<>();
        for(Order order:allOrders){
            if(userId.equals(order.getUser().getUserId()))
            {
                totalOrder.add(order);
            }
        }

        return totalOrder;
    }
    public String deleteOrder(Integer orderId) {
        orderRepository.deleteById(orderId);
        return "Order Removed !! " + orderId;
    }

    public Order updateOrder(Order order) {
        Order existingOrder = orderRepository.getById(order.getOrderId());
        existingOrder.setUser(order.getUser());
        existingOrder.setOrderDate(order.getOrderDate());
        existingOrder.setStatus(order.getStatus());
        existingOrder.setTotalAmount(order.getTotalAmount());

        return orderRepository.save(existingOrder);
    }
}