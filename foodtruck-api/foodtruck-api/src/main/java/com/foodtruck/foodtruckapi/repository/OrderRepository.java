package com.foodtruck.foodtruckapi.repository;

import com.foodtruck.foodtruckapi.entity.Order;
import com.foodtruck.foodtruckapi.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Long countByStatus(OrderStatus status);

}
