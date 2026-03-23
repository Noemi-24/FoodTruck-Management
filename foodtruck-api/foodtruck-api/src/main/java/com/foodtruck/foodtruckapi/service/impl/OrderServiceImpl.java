package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.model.Order;
import com.foodtruck.foodtruckapi.repository.OrderRepository;
import com.foodtruck.foodtruckapi.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Integer id) {
        return orderRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Order", "id", id));
    }

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Integer id, Order order) {
        if(!orderRepository.existsById(id)){
            throw new ResourceNotFoundException("Order", "id", id);
        }
        order.setOrderId(id);
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Integer id) {
        if(!orderRepository.existsById(id)){
            throw new ResourceNotFoundException("Order", "id", id);
        }
        orderRepository.deleteById(id);
    }
}
