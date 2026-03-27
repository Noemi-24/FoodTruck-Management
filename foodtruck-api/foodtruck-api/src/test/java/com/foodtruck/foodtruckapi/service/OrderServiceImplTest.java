package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateOrderRequest;
import com.foodtruck.foodtruckapi.dto.request.OrderItemRequest;
import com.foodtruck.foodtruckapi.dto.response.OrderResponse;
import com.foodtruck.foodtruckapi.entity.Order;
import com.foodtruck.foodtruckapi.entity.OrderItem;
import com.foodtruck.foodtruckapi.entity.Product;
import com.foodtruck.foodtruckapi.enums.OrderStatus;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.mapper.OrderMapper;
import com.foodtruck.foodtruckapi.repository.OrderItemRepository;
import com.foodtruck.foodtruckapi.repository.OrderRepository;
import com.foodtruck.foodtruckapi.repository.ProductRepository;
import com.foodtruck.foodtruckapi.repository.UserRepository;
import com.foodtruck.foodtruckapi.service.impl.OrderServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.foodtruck.foodtruckapi.enums.OrderStatus.*;
import static com.foodtruck.foodtruckapi.enums.PaymentMethod.CASH;
import static com.foodtruck.foodtruckapi.enums.PaymentMethod.STRIPE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceImplTest {
    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderItemRepository orderItemRepository;

    @Mock
    private OrderMapper orderMapper;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Mock
    private ProductService productService;

    @Test
    void testCreateOrder_Success(){
        // ARRANGE
        OrderItemRequest item1 = new OrderItemRequest();
        item1.setProductId(1);
        item1.setQuantity(2);

        OrderItemRequest item2 = new OrderItemRequest();
        item2.setProductId(2);
        item2.setQuantity(1);

        CreateOrderRequest request = new CreateOrderRequest();
        request.setCustomerName("test");
        request.setCustomerPhone("111-222-3333");
        request.setCustomerEmail("test@test.com");
        request.setStatus(IN_PREPARATION);
        request.setPaymentMethod(CASH);
        request.setItems(Arrays.asList(item1, item2));

       Product product1 = new Product();
       product1.setProductId(1);
       product1.setPrice(BigDecimal.valueOf(10.00));
       product1.setAvailable(true);

       Product product2 = new Product();
       product2.setProductId(2);
       product2.setPrice(BigDecimal.valueOf(15.00));
       product2.setAvailable(true);

       Order savedOrder = new Order();
       savedOrder.setOrderId(1);
       savedOrder.setCustomerName("test");
       savedOrder.setCustomerPhone("111-222-3333");
       savedOrder.setCustomerEmail("test@test.com");
       savedOrder.setStatus(IN_PREPARATION);
       savedOrder.setPaymentMethod(CASH);
       savedOrder.setTotal(BigDecimal.valueOf(35.00));

       OrderResponse orderResponse = new OrderResponse();
       orderResponse.setOrderId(1);
       orderResponse.setCustomerName("test");
       orderResponse.setCustomerPhone("111-222-3333");
       orderResponse.setCustomerEmail("test@test.com");
       orderResponse.setStatus(IN_PREPARATION);
       orderResponse.setPaymentMethod(CASH);
       orderResponse.setTotal(BigDecimal.valueOf(35.00));

        when(productService.getProductById(1)).thenReturn(product1);
        when(productService.getProductById(2)).thenReturn(product2);
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);
        when(orderMapper.toOrderResponse(savedOrder)).thenReturn(orderResponse);

        // ACT
        OrderResponse result = orderService.createOrder(request);

        // ASSERT
        assertNotNull(result);
        assertEquals(BigDecimal.valueOf(35.00), result.getTotal());
        verify(productService, times(2)).getProductById(anyInt());
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void  testGetOrderById_Success(){
        // ARRANGE
        Order savedOrder = new Order();
        savedOrder.setOrderId(1);
        savedOrder.setCustomerName("test");
        savedOrder.setCustomerPhone("111-222-3333");
        savedOrder.setCustomerEmail("test@test.com");
        savedOrder.setStatus(IN_PREPARATION);
        savedOrder.setPaymentMethod(STRIPE);
        savedOrder.setTotal(BigDecimal.valueOf(35.00));

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setOrderId(1);
        orderResponse.setCustomerName("test");
        orderResponse.setCustomerPhone("111-222-3333");
        orderResponse.setCustomerEmail("test@test.com");
        orderResponse.setStatus(IN_PREPARATION);
        orderResponse.setPaymentMethod(STRIPE);
        orderResponse.setTotal(BigDecimal.valueOf(35.00));

        when(orderRepository.findById(1)).thenReturn(Optional.of(savedOrder));
        when(orderMapper.toOrderResponse(savedOrder)).thenReturn(orderResponse);

        // ACT
        OrderResponse result = orderService.getOrderById(1);

        // ASSERT & VERIFY
        assertNotNull(result);
        assertEquals(BigDecimal.valueOf(35.00), result.getTotal());
        assertEquals(savedOrder.getOrderId(), result.getOrderId());
        assertEquals(savedOrder.getCustomerName(), result.getCustomerName());
        assertEquals(savedOrder.getCustomerPhone(), result.getCustomerPhone());
        assertEquals(savedOrder.getCustomerEmail(), result.getCustomerEmail());
        assertEquals(savedOrder.getStatus(), result.getStatus());
        assertEquals(savedOrder.getPaymentMethod(), result.getPaymentMethod());
        verify(orderRepository, times(1)).findById(1);
    }

    @Test
    void testGetOrderById_NotFound_ThrowsException(){
        // ARRANGE
        when(orderRepository.findById(999)).thenReturn(Optional.empty());
        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {orderService.getOrderById(999);});
        // VERIFY
        verify(orderRepository).findById(999);
    }

    @Test
    void testGetAllOrders_Success(){
        // ARRANGE
        List<Order> orders = new ArrayList<>();
        Order order1 = new Order();
        order1.setOrderId(1);
        order1.setCustomerName("test");
        order1.setCustomerPhone("111-222-3333");
        order1.setCustomerEmail("test@test.com");
        order1.setStatus(IN_PREPARATION);
        order1.setPaymentMethod(STRIPE);
        order1.setTotal(BigDecimal.valueOf(100.00));

        Order order2 = new Order();
        order2.setOrderId(2);
        order2.setCustomerName("test1");
        order2.setCustomerPhone("111-222-4444");
        order2.setCustomerEmail("test2@test.com");
        order2.setStatus(IN_PREPARATION);
        order2.setPaymentMethod(STRIPE);
        order2.setTotal(BigDecimal.valueOf(99.50));

        orders.add(order1);
        orders.add(order2);

        List<OrderResponse> orderResponseList = new ArrayList<>();
        OrderResponse orderResponse1 = new OrderResponse();
        orderResponse1.setOrderId(1);
        orderResponse1.setCustomerName("test");
        orderResponse1.setCustomerPhone("111-222-3333");
        orderResponse1.setCustomerEmail("test@test.com");
        orderResponse1.setStatus(IN_PREPARATION);
        orderResponse1.setPaymentMethod(STRIPE);
        orderResponse1.setTotal(BigDecimal.valueOf(100.00));

        OrderResponse orderResponse2 = new OrderResponse();
        orderResponse2.setOrderId(2);
        orderResponse2.setCustomerName("test1");
        orderResponse2.setCustomerPhone("111-222-4444");
        orderResponse2.setCustomerEmail("test2@test.com");
        orderResponse2.setStatus(IN_PREPARATION);
        orderResponse2.setPaymentMethod(STRIPE);
        orderResponse2.setTotal(BigDecimal.valueOf(99.50));

        orderResponseList.add(orderResponse1);
        orderResponseList.add(orderResponse2);

        when(orderRepository.findAll()).thenReturn(orders);
        when(orderMapper.toOrderResponse(order1)).thenReturn(orderResponse1);
        when(orderMapper.toOrderResponse(order2)).thenReturn(orderResponse2);

        // ACT
        List<OrderResponse> result = orderService.getAllOrders();

        // ASSERT
        assertEquals(2, result.size());
        verify(orderRepository).findAll();
    }

    @Test
    void testUpdateOrderStatus_Success() {
        // ARRANGE
        Order order = new Order();
        order.setOrderId(1);
        order.setStatus(PENDING);

        Order updatedOrder = new Order();
        updatedOrder.setOrderId(1);
        updatedOrder.setStatus(READY);

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setOrderId(1);
        orderResponse.setStatus(READY);

        when(orderRepository.findById(1)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(updatedOrder);
        when(orderMapper.toOrderResponse(updatedOrder)).thenReturn(orderResponse);

        // ACT
        OrderResponse result = orderService.updateOrderStatus(1, READY);

        // ASSERT
        assertNotNull(result);
        assertEquals(READY, result.getStatus());
        verify(orderRepository).findById(1);
        verify(orderRepository).save(any(Order.class));
    }
}
