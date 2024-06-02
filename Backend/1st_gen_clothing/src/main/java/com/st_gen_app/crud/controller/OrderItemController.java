package com.st_gen_app.crud.controller;

import com.st_gen_app.crud.entity.OrderItem;
import com.st_gen_app.crud.entity.User;
import com.st_gen_app.crud.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/orderItems")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping("/add")
    public OrderItem addOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.saveOrderItem(orderItem);
    }
    @PostMapping("/addAll")
    public List<OrderItem> addAllOrdersItem(@RequestBody List<OrderItem> orderItems)
    {
        return orderItemService.saveAllOrdersItem(orderItems);
    }
    @GetMapping("/getAll")
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    @GetMapping("/get/{id}")
    public Optional<OrderItem> getOrderItemById(@PathVariable Integer id) {
        return orderItemService.getOrderItemById(id);
    }

    @PutMapping("/update")
    public OrderItem updateOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.updateOrderItem(orderItem);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteOrderItem(@PathVariable Integer id) {
        return orderItemService.deleteOrderItem(id);
    }
}