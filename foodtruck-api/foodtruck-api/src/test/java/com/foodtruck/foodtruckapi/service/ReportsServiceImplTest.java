package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.response.DailySalesResponse;
import com.foodtruck.foodtruckapi.dto.response.MonthlyExpenseResponse;
import com.foodtruck.foodtruckapi.dto.response.PopularItemResponse;
import com.foodtruck.foodtruckapi.entity.DailySales;
import com.foodtruck.foodtruckapi.entity.MonthlyExpenses;
import com.foodtruck.foodtruckapi.entity.PopularItem;
import com.foodtruck.foodtruckapi.enums.ExpenseCategory;
import com.foodtruck.foodtruckapi.repository.DailySalesRepository;
import com.foodtruck.foodtruckapi.repository.MonthlyExpensesRepository;
import com.foodtruck.foodtruckapi.repository.PopularItemsRepository;
import com.foodtruck.foodtruckapi.service.impl.ReportsServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static com.foodtruck.foodtruckapi.enums.ExpenseCategory.FUEL;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReportsServiceImplTest {
    @InjectMocks
    private ReportsServiceImpl reportsServiceImpl;

    @Mock
    private MonthlyExpensesRepository monthlyExpensesRepository;

    @Mock
    private PopularItemsRepository popularItemsRepository;

    @Mock
    private DailySalesRepository dailySalesRepository;

    @Test
    void testGetMonthlyExpenses() {
        // ARRANGE
        MonthlyExpenses monthlyExpenses = new MonthlyExpenses("2026-03", FUEL, 10, BigDecimal.valueOf(55));

        when(monthlyExpensesRepository.findAll()).thenReturn(List.of(monthlyExpenses));

        // ACT
        List<MonthlyExpenseResponse> result = reportsServiceImpl.getMonthlyExpenses();

        // ASSERT
        assert result.size() == 1;
        MonthlyExpenseResponse response = result.get(0);
        assert response.getMonth().equals("2026-03");
        assert response.getCategory() == FUEL;
        assert response.getExpenseCount() == 10;
        assert response.getTotalAmount().equals(BigDecimal.valueOf(55));
    }

    @Test
    void testGetPopularItems() {
        // ARRANGE
        PopularItem popularItem = new PopularItem(1, "Burger", "Food", 100, BigDecimal.valueOf(500));

        when(popularItemsRepository.findAll()).thenReturn(List.of(popularItem));

        // ACT
        List<PopularItemResponse> result = reportsServiceImpl.getPopularItems();

        // ASSERT
        assert result.size() == 1;
        PopularItemResponse response = result.get(0);
        assert response.getProductId() == 1L;
        assert response.getName().equals("Burger");
        assert response.getCategoryName().equals("Food");
        assert response.getTimesOrdered() == 100L;
        assert response.getTotalRevenue().equals(BigDecimal.valueOf(500));
    }

    @Test
    void testGetDailySales() {
        // ARRANGE
        DailySales dailySales = new DailySales(LocalDate.now(), 5L, BigDecimal.valueOf(800));

        when(dailySalesRepository.findAll()).thenReturn(List.of(dailySales));

        // ACT
        List<DailySalesResponse> result = reportsServiceImpl.getDailySales();

        // ASSERT
        assert result.size() == 1;
        DailySalesResponse response = result.get(0);
        assert response.getSaleDate().equals(LocalDate.now());
        assert response.getTotalOrders() == 5L;
        assert response.getTotalRevenue().equals(BigDecimal.valueOf(800));
    }
}
