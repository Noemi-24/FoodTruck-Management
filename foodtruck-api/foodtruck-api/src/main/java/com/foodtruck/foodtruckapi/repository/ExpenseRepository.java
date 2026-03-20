package com.foodtruck.foodtruckapi.repository;

import com.foodtruck.foodtruckapi.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
}
