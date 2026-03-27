package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.dto.request.CreateOrderRequest;
import com.foodtruck.foodtruckapi.dto.request.OrderItemRequest;
import com.foodtruck.foodtruckapi.dto.response.OrderResponse;
import com.foodtruck.foodtruckapi.enums.OrderStatus;
import com.foodtruck.foodtruckapi.exception.BadRequestException;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.mapper.OrderMapper;
import com.foodtruck.foodtruckapi.entity.Order;
import com.foodtruck.foodtruckapi.entity.OrderItem;
import com.foodtruck.foodtruckapi.entity.Product;
import com.foodtruck.foodtruckapi.repository.OrderRepository;
import com.foodtruck.foodtruckapi.service.OrderService;
import com.foodtruck.foodtruckapi.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final OrderMapper orderMapper;

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(orderMapper::toOrderResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrderById(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Order", "id", id));
        return orderMapper.toOrderResponse(order);
    }

    @Override
    public OrderResponse updateOrderStatus(Integer id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        return orderMapper.toOrderResponse(updatedOrder);
    }

    @Transactional
    @Override
    public OrderResponse createOrder(CreateOrderRequest orderRequest) {
        // Create order entity
        Order order = new Order();
        order.setCustomerName(orderRequest.getCustomerName());
        order.setCustomerPhone(orderRequest.getCustomerPhone());
        order.setCustomerEmail(orderRequest.getCustomerEmail());
        order.setStatus(orderRequest.getStatus());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setNotes(orderRequest.getNotes());

        // Process items and calculates total
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest: orderRequest.getItems()){
            // Find product
            Product product = productService.getProductById(itemRequest.getProductId());

            // Validate product availability
            if (!product.getAvailable()) {
                throw new BadRequestException("Product " + product.getName() + " is not available");
            }
            // Create OrderItem
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPriceAtOrder(product.getPrice());

            // Calculate subtotal
            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            orderItem.setSubtotal(subtotal);
            orderItem.setNotes(itemRequest.getNotes());
            orderItem.setOrder(order);

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(subtotal);
        }

        // Set total and add items to order
        order.setTotal(totalAmount);
        order.setOrderItems(orderItems);

        // Save order
        Order savedOrder = orderRepository.save(order);

        // Convert to a Response
        return orderMapper.toOrderResponse(savedOrder);
    }
}
