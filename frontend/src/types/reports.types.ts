export interface PopularItemResponse{
    productId: number;
    name: string;
    categoryName: string;
    timesOrdered: number;
    totalRevenue: number;
}

export interface MonthlyExpenseResponse {
    month: string;
    category: ExpenseCategory;
    expenseCount: number;
    totalAmount: number;
}

export interface DailySalesResponse{
    saleDate: Date;
    totalOrders: number;
    totalRevenue: number;
}

export type ExpenseCategory = 'INGREDIENTS' | 'FUEL' | 'MAINTENANCE' | 'PERMITS' | 'SALARIES' | 'MARKETING' | 'SUPPLIES' | 'OTHER';