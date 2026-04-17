import { getAllExpenses } from "../services/expenseService";
import type { ExpenseResponse } from "../types/expense.types";
import { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { type Column , Table} from "../components/Table";
import ExpenseModal from "../components/ExpenseModal";
import SkeletonTable from '../components/SkeletonTable';

function Expenses(){
    const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [selectedExpense, setSelectedExpense] = useState<ExpenseResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

    const fetchExpenses = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllExpenses();
            setExpenses(result);
        } catch (error) {
            setError(error instanceof Error ? error.message: "Failed to load expenses");
            
        }finally{
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchExpenses();
    }, []);

    const columns: Column<ExpenseResponse>[] = [
        { 
            header: "Id", 
            render: (expense) => `${expense.expenseId}` 
        },
        { 
            header: t('expenses.tableHeaders.category'), 
            render: (expense) => `${expense.category}` 
        },
        { 
            header: t('expenses.tableHeaders.description'), 
            render: (expense) => `${expense.description}` 
        },
        { 
            header: t('expenses.tableHeaders.amount'), 
            render: (expense) => `$${expense.amount.toFixed(2)}`
        },
        { 
            header: t('expenses.tableHeaders.date'), 
            render: (expense) => new Date(expense.date + 'T00:00:00').toLocaleDateString('en-US', {
                month: '2-digit', day: '2-digit', year: 'numeric'
            })
        },
        { 
            header:  t('expenses.tableHeaders.receiptUrl'),  
            render: (expense) => (
                <img
                    src={expense.receiptUrl}
                    alt={expense.category}
                    className='w-10 h-10 rounded object-cover'
                />
            ) 
        },
        { 
            header:  t('expenses.tableHeaders.actions'),  
            render: (expense) => 
                <button 
                    aria-label={t('expenses.tableHeaders.edit')}
                    onClick={() => handleEditExpense(expense)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white px-3 py-1 rounded text-sm transition-all duration-200 hover:scale-105 active:scale-95">
                    {t('expenses.tableHeaders.edit')}
                </button>
        }
    ];

    const handleEditExpense = (expense: ExpenseResponse) => {
        setSelectedExpense(expense);
        setIsModalOpen(true);
    };

    const handleCreateExpense = () => {
        setSelectedExpense(null);
        setIsModalOpen(true);
    };


    if (loading) return (
        <div className="w-full max-w-6xl p-8">
            <SkeletonTable />
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
    );

    return(
        <div className="w-full max-w-6xl bg-gray-50 dark:bg-gray-900 p-6">
            <div className="my-12 flex justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('expenses.title')}</h1>
                <button 
                    aria-label={t('expenses.newExpenseButton')}
                    onClick={() => handleCreateExpense()} 
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95" >
                    {t('expenses.newExpenseButton')}
                </button>
            </div>
            <div>
                <Table data={expenses} columns={columns} rowKey={(expense) => expense.expenseId} ariaLabel={t('expenses.tableAriaLabel')}/>
                <ExpenseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    expense={selectedExpense}
                    onSuccess={() => {setIsModalOpen(false); setSelectedExpense(null); fetchExpenses();}}
                />
            </div>  
                      
        </div>
    )
}

export default Expenses;