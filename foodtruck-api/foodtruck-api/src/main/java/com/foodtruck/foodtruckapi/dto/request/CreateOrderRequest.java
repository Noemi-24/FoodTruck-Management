package com.foodtruck.foodtruckapi.dto.request;

import com.foodtruck.foodtruckapi.enums.OrderStatus;
import com.foodtruck.foodtruckapi.enums.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequest {
    @NotBlank(message = "Customer name is required")
    String customerName;

    @NotBlank(message = "Phone is required")
    String customerPhone;

    @Email(message = "Invalid email format")
    String customerEmail;

    @NotNull(message = "Payment method is required")
    PaymentMethod paymentMethod;

    @NotNull(message = "Status is required")
    OrderStatus status;

    String notes;

    @NotEmpty(message = "Order must have at least one item")
    @Valid
    List<OrderItemRequest> items;

}
