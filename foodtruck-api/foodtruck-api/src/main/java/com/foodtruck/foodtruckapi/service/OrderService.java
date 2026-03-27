package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateOrderRequest;
import com.foodtruck.foodtruckapi.dto.response.OrderResponse;
import com.foodtruck.foodtruckapi.entity.Order;
import com.foodtruck.foodtruckapi.enums.OrderStatus;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getAllOrders();
    OrderResponse getOrderById(Integer id);
    OrderResponse updateOrderStatus(Integer id, OrderStatus status);
    OrderResponse createOrder(CreateOrderRequest orderRequest);
}
