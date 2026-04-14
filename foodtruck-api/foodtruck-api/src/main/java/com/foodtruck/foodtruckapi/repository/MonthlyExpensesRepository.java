package com.foodtruck.foodtruckapi.repository;

import com.foodtruck.foodtruckapi.entity.MonthlyExpenses;
import com.foodtruck.foodtruckapi.entity.MonthlyExpensesPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthlyExpensesRepository extends JpaRepository<MonthlyExpenses, MonthlyExpensesPK> {
}
