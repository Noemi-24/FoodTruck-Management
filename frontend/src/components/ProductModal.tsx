import { useEffect, useState } from "react";
import type { ProductResponse, UpdateProductRequest } from "../types/product.types";
import { updateProduct } from "../services/productService";

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

    // cargar producto al abrir modal
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

        if (!product) return;

        if (!form.name || !form.price) {
        setError("Name and price are required");
        return;
        }

        setLoading(true);
        setError(null);

        try {
            const updatedProduct: ProductResponse = {
                ...product,
                ...form
            };

            // connecta API
            await updateProduct(product.productId, form);

            onSuccess(updatedProduct);
            onClose();

        } catch {
            setError("Error updating product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Product</h2>

                {error && <p>{error}</p>}

                <form onSubmit={handleSubmit}>
            
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-8"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                />

                <input
                    type="number"
                    name="price"
                    step="0.01"
                    placeholder="Price"
                    value={form.price ?? ""}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={form.imageUrl}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                />

                <input
                    type="number"
                    name="categoryId"
                    placeholder="Category ID"
                    value={form.categoryId ?? ""}
                    onChange={handleChange}
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                />

                <label className="dark:text-white text-gray-700 text-sm mt-5">
                    <input
                        type="checkbox"
                        name="isSpecial"
                        checked={form.isSpecial}
                        onChange={handleChange}
                        className="dark:text-white text-gray-700 text-sm mt-5 mr-2"
                    />
                    Special Product
                </label>

                <div className="mt-6 flex justify-end gap-3">
                    <button type="submit" disabled={loading} className="rounded-md bg-blue-700 px-4 py-2 text-white font-medium cursor-pointer hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700">
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button type="button" onClick={onClose} className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium cursor-pointer">
                        Cancel
                    </button>
                </div>

                </form>
            </div>
        </div>
    );
}

export default ProductModal;
