package com.foodtruck.foodtruckapi.repository;

import com.foodtruck.foodtruckapi.entity.DailySales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailySalesRepository extends JpaRepository<DailySales, LocalDate> {
    Optional<DailySales> findBySaleDate(LocalDate saleDate);
}
