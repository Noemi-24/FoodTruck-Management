package com.foodtruck.foodtruckapi.mapper;

import com.foodtruck.foodtruckapi.dto.response.OrderItemResponse;
import com.foodtruck.foodtruckapi.dto.response.OrderResponse;
import com.foodtruck.foodtruckapi.model.Order;
import com.foodtruck.foodtruckapi.model.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    public OrderResponse toOrderResponse(Order order) {
        OrderResponse orderResponse = new OrderResponse();

        orderResponse.setOrderId(order.getOrderId());
        orderResponse.setCustomerName(order.getCustomerName());
        orderResponse.setCustomerPhone(order.getCustomerPhone());
        orderResponse.setCustomerEmail(order.getCustomerEmail());
        orderResponse.setTotal(order.getTotal());
        orderResponse.setStatus(order.getStatus());
        orderResponse.setPaymentMethod(order.getPaymentMethod());
        orderResponse.setOrderDate(order.getOrderDate());
        orderResponse.setUpdateAt(order.getUpdatedAt());

        // Setting items in order
        List<OrderItemResponse> itemsResponse = order.getOrderItems()
                .stream()
                .map(this::toOrderItemResponse)
                .toList();
        orderResponse.setItems(itemsResponse);

        // Processed by user (con null check)
        if (order.getProcessedByUser() != null) {
            orderResponse.setProcessedByUserId(order.getProcessedByUser().getUserId());
            orderResponse.setProcessedByUserName(order.getProcessedByUser().getName());
        }

        return orderResponse;
    }

    public OrderItemResponse toOrderItemResponse(OrderItem item) {
        OrderItemResponse orderItemResponse = new OrderItemResponse();

        orderItemResponse.setOrderItemId(item.getOrderItemId());
        orderItemResponse.setProductId(item.getProduct().getProductId());
        orderItemResponse.setProductName(item.getProduct().getName());
        orderItemResponse.setQuantity(item.getQuantity());
        orderItemResponse.setPriceAtOrder(item.getPriceAtOrder());
        orderItemResponse.setSubtotal(item.getSubtotal());
        orderItemResponse.setNotes(item.getNotes());

        return orderItemResponse;
    }
}
