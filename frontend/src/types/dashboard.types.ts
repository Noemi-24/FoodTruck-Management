export interface DashboardStatsResponse{
    ordersToday: number;
    revenueToday: number;
    pendingOrders: number;
    expensesToday: number | null;
}