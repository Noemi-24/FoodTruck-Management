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
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800">
                <h2 id="category-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">{category ? t('categoryModal.editTitle') : t('categoryModal.createTitle')}</h2>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    aria-label={t('categoryModal.placeholderName')}
                    placeholder={t('categoryModal.placeholderName')}
                    value={form.name}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-8"
                />

                <div className="mt-6 flex justify-end gap-3">
                    <button 
                        aria-label={loading ? t('productModal.loading') : category ? t('categoryModal.saveButton') : t('categoryModal.createButton')}
                        type="submit" 
                        disabled={loading} 
                        className="rounded-md bg-blue-700 px-4 py-2 text-white font-medium cursor-pointer hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700">
                        {loading ? t('productModal.loading') : category ? t('categoryModal.saveButton') : t('categoryModal.createButton')}
                    </button>

                    <button 
                        aria-label={t('categoryModal.cancelButton')}
                        type="button" 
                        onClick={onClose} 
                        className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium cursor-pointer">
                        {t('categoryModal.cancelButton')}
                    </button>
                </div>

                </form>
            </div>
        </div>
    );
}

export default CategoryModal;