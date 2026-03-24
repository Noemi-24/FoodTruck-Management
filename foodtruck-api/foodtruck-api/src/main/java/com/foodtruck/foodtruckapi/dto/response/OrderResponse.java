package com.foodtruck.foodtruckapi.dto.response;

import com.foodtruck.foodtruckapi.enums.OrderStatus;
import com.foodtruck.foodtruckapi.enums.PaymentMethod;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    Integer orderId;
    String customerName;
    String customerPhone;
    String customerEmail;
    BigDecimal total;
    OrderStatus status;
    PaymentMethod paymentMethod;
    LocalDateTime orderDate;
    List<OrderItemResponse> items;
    LocalDateTime updateAt;

    //Processed by user info
    Integer processedByUserId;
    String processedByUserName;

}
