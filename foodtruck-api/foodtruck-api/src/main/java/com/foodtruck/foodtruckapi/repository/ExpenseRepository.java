package com.foodtruck.foodtruckapi.repository;

import com.foodtruck.foodtruckapi.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.date = :date")
    BigDecimal sumAmountByExpenseDate(@Param("date") LocalDate date);
}
