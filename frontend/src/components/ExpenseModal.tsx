import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import type { ExpenseCategory, ExpenseResponse, UpdateExpenseRequest, CreateExpenseRequest } from "../types/expense.types";
import { createExpense, updateExpense } from "../services/expenseService";

interface ModalProps{
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly expense: ExpenseResponse | null;
    readonly onSuccess: (updatedexpense: ExpenseResponse) => void;
}

const initialState: UpdateExpenseRequest = { 
    category: 'OTHER',
    date: "",
    amount: 0,
    description: "",
    receiptUrl: ""
}

function ExpenseModal({ isOpen, onClose, expense, onSuccess }: ModalProps) { 
    const [form, setForm] = useState<UpdateExpenseRequest>(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (expense) {
        setForm({
            category: expense.category,
            date: expense.date,
            amount: expense.amount,
            description: expense.description,                    
            receiptUrl: expense.receiptUrl
        });
        } else {
        setForm(initialState);
        }
    }, [expense]);

    if (!isOpen) return null;

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let parsedValue;
        if (type === "checkbox") {
            parsedValue = (e.target as HTMLInputElement).checked;
        } else if (type === "number") {
            parsedValue = value === "" ? null : Number(value);
        } else {
            parsedValue = value;
        }
        
        setForm(prev => ({...prev, [name]: parsedValue}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!form.category || !form.amount || !form.description) {
        setError(t('expenseModal.errorRequired'));
        return;
        }

        setLoading(true);
        setError(null);

        try {
            if(expense === null){
                const newExpense = await createExpense(form as CreateExpenseRequest);
                onSuccess(newExpense);
                onClose();
                return;

            }else{
                const updatedexpense: ExpenseResponse = {
                    ...expense,
                    ...form
                };        
                // connecta API
                await updateExpense(expense.expenseId, form);        
                onSuccess(updatedexpense);
                onClose();
            }
        } catch {
            setError(expense ? t('expenseModal.errorUpdate') : t('expenseModal.errorCreate'));
        } finally {
            setLoading(false);
        }
    };     
    
    let buttonLabel;
    if (loading) {
        buttonLabel = t('expenseModal.loading');
    } else if (expense) {
        buttonLabel = t('expenseModal.saveButton');
    } else {
        buttonLabel = t('expenseModal.createButton');
    }
        
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true" 
            aria-labelledby="expense-modal-title">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-7 shadow-xl border border-gray-200 dark:border-gray-700 modal-enter">
                <h2 id="expense-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{expense ? t('expenseModal.editTitle') : t('expenseModal.createTitle')}</h2>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <form onSubmit={handleSubmit}>
                
                <select 
                    aria-label={t('expenseModal.category.choose')}
                    value={form.category}
                    onChange={(e) => setForm(prev => ({...prev, category: e.target.value as ExpenseCategory}))}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                >
                    <option value="INGREDIENTS">{t('expenseModal.category.ingredients')}</option>
                    <option value="FUEL">{t('expenseModal.category.fuel')}</option>
                    <option value="MAINTENANCE">{t('expenseModal.category.maintenance')}</option>
                    <option value="PERMITS">{t('expenseModal.category.permits')}</option>
                    <option value="SALARIES">{t('expenseModal.category.salaries')}</option>
                    <option value="MARKETING">{t('expenseModal.category.marketing')}</option>
                    <option value="SUPPLIES">{t('expenseModal.category.supplies')}</option>
                    <option value="OTHER">{t('expenseModal.category.other')}</option>
                </select>
            
                <input
                    aria-label={t('expenseModal.placeholderDate')}
                    type="date"
                    name="date"
                    placeholder={t('expenseModal.placeholderDate')}
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                />
                <textarea
                    aria-label={t('expenseModal.placeholderDescription')}
                    name="description"
                    placeholder={t('expenseModal.placeholderDescription')}
                    value={form.description}
                    onChange={handleChange}
                   className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                />
                <div className="relative mt-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                        aria-label={t('expenseModal.placeholderAmount')}
                        type="number"
                        name="amount"
                        step="0.01"
                        placeholder={t('expenseModal.placeholderAmount')}
                        value={form.amount ?? ""}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 pl-8 pr-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>                

                <input
                    aria-label={t('expenseModal.placeholderReceiptUrl')}
                    type="text"
                    name="receiptUrl"
                    placeholder={t('expenseModal.placeholderReceiptUrl')}
                    value={form.receiptUrl}
                    onChange={handleChange}
                   className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                />

                <div className="mt-6 flex justify-end gap-3"> 
                    <button 
                        aria-label={t('expenseModal.cancelButton')}
                        type="button" 
                        onClick={onClose} 
                        className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium transition">
                        {t('expenseModal.cancelButton')}
                    </button>

                    <button 
                        aria-label={buttonLabel}
                        type="submit" 
                        disabled={loading} 
                        className="rounded-lg bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 font-medium transition disabled:opacity-50">
                        {buttonLabel}
                    </button>                    
                </div>

                </form>
            </div>
        </div>
    );
}

export default ExpenseModal