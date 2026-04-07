export interface ExpenseResponse{
    expenseId: number;
    recordedByUserId: number;
    recordedByUserName: string;
    date: Date;
    amount: number;
    category: ExpenseCategory;
    description: string;
    receiptUrl: string;    
}

export type ExpenseCategory = 'INGREDIENTS' | 'FUEL' | 'MAINTENANCE' | 'PERMITS' | 'SALARIES' | 'MARKETING' | 'SUPPLIES' | 'OTHER';

export interface CreateExpenseRequest{
    recordedByUserId: number;
    date: Date;
    amount: number;
    category: ExpenseCategory;
    description: string;
    receiptUrl: string;
}

export interface UpdateExpenseRequest{
    date: Date;
    amount: number;
    category: ExpenseCategory;
    description: string;
    receiptUrl: string;
}

export interface Expense extends ExpenseResponse{
    createdAt: Date;
}