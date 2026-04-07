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
        <div>
            <div>
                <h2>Edit Product</h2>

                {error && <p>{error}</p>}

                <form onSubmit={handleSubmit}>
                
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price ?? ""}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={form.imageUrl}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="categoryId"
                    placeholder="Category ID"
                    value={form.categoryId ?? ""}
                    onChange={handleChange}
                />

                <label>
                    <input
                        type="checkbox"
                        name="isSpecial"
                        checked={form.isSpecial}
                        onChange={handleChange}
                    />
                    Special Product
                </label>

                <div style={{ marginTop: "10px" }}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </div>

                </form>
            </div>
        </div>
    );
}

export default ProductModal;
