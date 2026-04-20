import { getAllExpenses } from "../services/expenseService";
import type { ExpenseResponse } from "../types/expense.types";
import { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { type Column , Table} from "../components/Table";
import ExpenseModal from "../components/ExpenseModal";
import SkeletonTable from '../components/SkeletonTable';
import { Receipt } from 'lucide-react';

function Expenses(){
    const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [selectedExpense, setSelectedExpense] = useState<ExpenseResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
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
            header: t('expenses.tableHeaders.category'), 
            render: (expense) => `${expense.category}` 
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
            render: (expense) => expense.receiptUrl ? (
                <button
                    aria-label={t('expenses.tableHeaders.view')}
                    onClick={() => setReceiptUrl(expense.receiptUrl)}
                    className="text-blue-600 hover:underline text-sm"
                    >
                    {t('expenses.tableHeaders.view')}
                </button>   
            ):(
                <button
                    disabled
                    aria-label={t('expenses.tableHeaders.noReceipt')}
                    className="text-gray-400 text-sm cursor-not-allowed flex items-center gap-1"
                >
                    <Receipt className="w-4 h-4" />
                </button>
            )             
        },
        { 
            header:  t('expenses.tableHeaders.actions'),  
            render: (expense) => 
                <button 
                    aria-label={t('expenses.tableHeaders.edit')}
                    onClick={() => handleEditExpense(expense)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition">
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
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{t('expenses.title')}</h1>
                <button 
                    aria-label={t('expenses.newExpenseButton')}
                    onClick={() => handleCreateExpense()} 
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm">
                    {t('expenses.newExpenseButton')}
                </button>
            </div>
            <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
                    <Table data={expenses} columns={columns} rowKey={(expense) => expense.expenseId} ariaLabel={t('expenses.tableAriaLabel')}/>
                </div>
                
                <ExpenseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    expense={selectedExpense}
                    onSuccess={() => {setIsModalOpen(false); setSelectedExpense(null); fetchExpenses();}}
                />

                {receiptUrl && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl max-w-md w-full">
                        <img 
                            src={receiptUrl} 
                            className="w-full rounded-lg" 
                            alt={t('expenses.receipt')}
                            />
                        <button
                            onClick={() => setReceiptUrl(null)}
                            className="mt-4 w-full bg-gray-200 dark:bg-gray-700 py-2 rounded-lg"
                            aria-label={t('expenses.closeButton')}
                        >
                            {t('expenses.closeButton')}
                        </button>
                        </div>
                    </div>
                )}
            </div>  
                      
        </div>
    )
}

export default Expenses;