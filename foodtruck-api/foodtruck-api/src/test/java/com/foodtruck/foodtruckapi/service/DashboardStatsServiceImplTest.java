package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.response.DashboardStatsResponse;
import com.foodtruck.foodtruckapi.entity.DailySales;
import com.foodtruck.foodtruckapi.repository.DailySalesRepository;
import com.foodtruck.foodtruckapi.repository.ExpenseRepository;
import com.foodtruck.foodtruckapi.repository.OrderRepository;
import com.foodtruck.foodtruckapi.service.impl.DashboardStatsServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static com.foodtruck.foodtruckapi.enums.OrderStatus.PENDING;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DashboardStatsServiceImplTest {
    @InjectMocks
    private DashboardStatsServiceImpl dashboardStatsServiceImpl;

    @Mock
    private DailySalesRepository dailySalesRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ExpenseRepository expenseRepository;

    @Test
    void testGetAllDashboardStats_AdminUser() {
        // ARRANGE
        Authentication auth = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        GrantedAuthority adminAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");

        when(securityContext.getAuthentication()).thenReturn(auth);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getAuthorities()).thenReturn((Collection) List.of(adminAuthority));
        SecurityContextHolder.setContext(securityContext);

        DailySales dailySales = new DailySales(LocalDate.now(), 5L, BigDecimal.valueOf(800));

        when(dailySalesRepository.findBySaleDate(any())).thenReturn(Optional.of(dailySales));
        when(orderRepository.countByStatus(PENDING)).thenReturn(5L);
        when(expenseRepository.sumAmountByExpenseDate(any())).thenReturn(BigDecimal.valueOf(100));

        // ACT
        DashboardStatsResponse result = dashboardStatsServiceImpl.getDashboardStats();

        // ASSERT
        assertNotNull(result.getOrdersToday());
        assertNotNull(result.getExpensesToday());
        assertEquals(5L, result.getOrdersToday());
        assertEquals(BigDecimal.valueOf(100), result.getExpensesToday());
    }

    @Test
    void testGetAllDashboardStats_EmployeeUser() {
        // ARRANGE
        Authentication auth = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        GrantedAuthority adminAuthority = new SimpleGrantedAuthority("ROLE_EMPLOYEE");

        when(securityContext.getAuthentication()).thenReturn(auth);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getAuthorities()).thenReturn((Collection) List.of(adminAuthority));
        SecurityContextHolder.setContext(securityContext);

        DailySales dailySales = new DailySales(LocalDate.now(), 5L, BigDecimal.valueOf(800));

        when(dailySalesRepository.findBySaleDate(any())).thenReturn(Optional.of(dailySales));
        when(orderRepository.countByStatus(PENDING)).thenReturn(5L);

        // ACT
        DashboardStatsResponse result = dashboardStatsServiceImpl.getDashboardStats();

        // ASSERT
        assertNotNull(result.getOrdersToday());
        assertNull(result.getExpensesToday());
        assertEquals(5L, result.getOrdersToday());
    }

    @Test
    void testGetAllDashboardStats_NotDailySales() {
        // ARRANGE
        Authentication auth = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        GrantedAuthority adminAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");

        when(securityContext.getAuthentication()).thenReturn(auth);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getAuthorities()).thenReturn((Collection) List.of(adminAuthority));
        SecurityContextHolder.setContext(securityContext);

        when(dailySalesRepository.findBySaleDate(any())).thenReturn(Optional.empty());
        when(orderRepository.countByStatus(PENDING)).thenReturn(0L);

        // ACT
        DashboardStatsResponse result = dashboardStatsServiceImpl.getDashboardStats();

        // ASSERT & VERIFY
        assertNotNull(result);
        assertEquals(0L, result.getOrdersToday());
        assertEquals(BigDecimal.ZERO, result.getRevenueToday());
        verify(dailySalesRepository).findBySaleDate(any());
        verify(orderRepository).countByStatus(PENDING);
    }

}
