import type { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from "../types/category.types";
import { useEffect, useState } from "react";
import { updateCategory, createCategory } from "../services/categoryService";
import { useTranslation } from 'react-i18next';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: CategoryResponse | null;
    onSuccess: (updatedCategory: CategoryResponse) => void;
}

const initialState: UpdateCategoryRequest = {
    name:""
};

function CategoryModal({ isOpen, onClose, category, onSuccess }: ModalProps) {  
    const [form, setForm] = useState<UpdateCategoryRequest>(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();


    useEffect(() => {
        if (category){
            setForm({
                name: category.name
            });
        }else {
            setForm(initialState);       
        }
    }, [category]);

    if (!isOpen) return null;

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setForm(prev => ({
        ...prev,
            [name]:
                type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : type === "number"
                ? value === "" ? null : Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  
        if (!form.name){
            setError(t('categoryModal.errorRequired'));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (!category){
                const newCategory = await createCategory(form as CreateCategoryRequest);
                onSuccess(newCategory);
                onClose();
                return;
            }else{
                const updatedCategory: CategoryResponse ={
                    ...category,
                    ...form
                };

                await updateCategory(category.categoryId, form);

                onSuccess(updatedCategory);
                onClose();
            }
        } catch {
            setError(category ? t('categoryModal.errorUpdate') : t('categoryModal.errorCreate'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" 
            role="dialog"
            aria-modal="true" 
            aria-labelledby="category-modal-title">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-7 shadow-xl border border-gray-200 dark:border-gray-700 modal-enter">
                <h2 id="category-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category ? t('categoryModal.editTitle') : t('categoryModal.createTitle')}</h2>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    aria-label={t('categoryModal.placeholderName')}
                    placeholder={t('categoryModal.placeholderName')}
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                />

                <div className="mt-6 flex justify-end gap-3">
                     <button 
                        aria-label={t('categoryModal.cancelButton')}
                        type="button" 
                        onClick={onClose} 
                        className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium transition">
                        {t('categoryModal.cancelButton')}
                    </button>

                    <button 
                        aria-label={loading ? t('categoryModal.loading') : category ? t('categoryModal.saveButton') : t('categoryModal.createButton')}
                        type="submit" 
                        disabled={loading} 
                        className="rounded-lg bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 font-medium transition disabled:opacity-50">
                        {loading ? t('categiryModal.loading') : category ? t('categoryModal.saveButton') : t('categoryModal.createButton')}
                    </button>                   
                </div>

                </form>
            </div>
        </div>
    );
}

export default CategoryModal;