import { useEffect, useState } from "react";
import type { ProductResponse, UpdateProductRequest, CreateProductRequest } from "../types/product.types";
import { updateProduct, createProduct } from "../services/productService";
import { useTranslation } from 'react-i18next';
import { getAllCategories } from "../services/categoryService";
import { type CategoryResponse } from "../types/category.types";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductResponse | null;
    onSuccess: (updatedProduct: ProductResponse) => void;
}

const initialState: UpdateProductRequest = {
    categoryId: undefined,
    name: "",
    description: "",
    price: undefined,
    imageUrl: "",
    isSpecial: false
};

function ProductModal({ isOpen, onClose, product, onSuccess }: ModalProps) {  
    const [form, setForm] = useState<UpdateProductRequest>(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const [categories, setCategories] = useState<CategoryResponse []>([]);

    // Load product when open modal
    useEffect(() => {
        if (product) {
        setForm({
            categoryId: product.categoryId,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            isSpecial: product.isSpecial
        });
        } else {
        setForm(initialState);
        }
    }, [product]);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllCategories();
            setCategories(result);
        } catch (error) {
            setError(error instanceof Error ? error.message: "Failed to load categories");
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []); 

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

        if (!form.name || !form.price) {
            setError(t('productModal.errorRequired'));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (!product){
                const newProduct = await createProduct(form as CreateProductRequest);
                onSuccess(newProduct);
                onClose();
                return;
            }else {
                const updatedProduct: ProductResponse = {
                    ...product,
                    ...form
                };
                // connecta API
                await updateProduct(product.productId, form);

                onSuccess(updatedProduct);
                onClose();
            }
        } catch {
            setError(product ? t('productModal.errorUpdate') : t('productModal.errorCreate'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 "
            role="dialog"
            aria-modal="true" 
            aria-labelledby="product-modal-title">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-7 shadow-xl border border-gray-200 dark:border-gray-700 modal-enter">
                <h2 id="product-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product ? t('productModal.editTitle') : t('productModal.createTitle')}</h2>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <form onSubmit={handleSubmit}>
            
                <input
                    type="text"
                    aria-label={t('productModal.placeholderName')}
                    name="name"
                    placeholder={t('productModal.placeholderName')}
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                />

                <textarea
                    name="description"
                    aria-label={t('productModal.placeholderDescription')}
                    placeholder={t('productModal.placeholderDescription')}
                    value={form.description}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                />
                <div className="relative mt-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        aria-label={t('productModal.placeholderPrice')}
                        placeholder={t('productModal.placeholderPrice')}
                        value={form.price ?? ""}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 pl-8 pr-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <input
                    type="text"
                    name="imageUrl"
                    aria-label={t('productModal.placeholderImageUrl')}
                    placeholder={t('productModal.placeholderImageUrl')}
                    value={form.imageUrl}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                />

                <select  
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                    value={form.categoryId}
                    aria-label={t('productModal.choose')}
                    onChange={(e) => setForm(prev => ({...prev, categoryId: Number(e.target.value)}))}>
                    <option value="">{t('productModal.choose')}</option>
                    {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mt-4">
                    <input
                        type="checkbox"
                        name="isSpecial"
                        aria-label={t('productModal.specialLabel')}
                        checked={form.isSpecial}
                        onChange={handleChange}
                        className="w-4 h-4 accent-blue-600"
                    />
                    {t('productModal.specialLabel')}
                </label>

                <div className="mt-6 flex justify-end gap-3">
                    <button 
                        aria-label={t('productModal.cancelButton')}
                        type="button" onClick={onClose} 
                        className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium transition">
                        {t('productModal.cancelButton')}
                    </button>

                    <button 
                        aria-label={loading ? t('productModal.loading') : product ? t('productModal.saveButton') : t('productModal.createButton')}
                        type="submit" disabled={loading} 
                        className="rounded-lg bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 font-medium transition disabled:opacity-50">
                        {loading ? t('productModal.loading') : product ? t('productModal.saveButton') : t('productModal.createButton')}
                    </button>                    
                </div>

                </form>
            </div>
        </div>
    );
}

export default ProductModal;
