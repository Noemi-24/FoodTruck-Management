package com.foodtruck.foodtruckapi.repository;

import com.foodtruck.foodtruckapi.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
