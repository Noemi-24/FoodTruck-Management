package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.model.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();
    Order getOrderById(Integer id);
    Order createOrder(Order order);
    Order updateOrder(Integer id, Order order);
    void deleteOrder(Integer id);
}
