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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{expense ? t('expenseModal.editTitle') : t('expenseModal.createTitle')}</h2>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <form onSubmit={handleSubmit}>
                
                <select 
                    value={form.category}
                    onChange={(e) => setForm(prev => ({...prev, category: e.target.value as ExpenseCategory}))}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-8"
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
                    type="date"
                    name="date"
                    placeholder={t('expenseModal.placeholderDate')}
                    value={form.date}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                />
                <textarea
                    name="description"
                    placeholder={t('expenseModal.placeholderDescription')}
                    value={form.description}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                />
                <div className="relative">
                    <span className="absolute left-2 top-7 text-gray-500">$</span>
                    <input
                        type="number"
                        name="amount"
                        step="0.01"
                        placeholder={t('expenseModal.placeholderAmount')}
                        value={form.amount ?? ""}
                        onChange={handleChange}
                        className="pl-5 w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                    />
                </div>                

                <input
                    type="text"
                    name="receiptUrl"
                    placeholder={t('expenseModal.placeholderReceiptUrl')}
                    value={form.receiptUrl}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                />

                <div className="mt-6 flex justify-end gap-3">                  
                    <button type="submit" disabled={loading} className="rounded-md bg-blue-700 px-4 py-2 text-white font-medium cursor-pointer hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700">
                        {buttonLabel}
                    </button>

                    <button type="button" onClick={onClose} className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium cursor-pointer">
                        {t('expenseModal.cancelButton')}
                    </button>
                </div>

                </form>
            </div>
        </div>
    );
}

export default ExpenseModal