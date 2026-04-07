import { useState, useEffect} from 'react';
import { type ProductResponse } from '../types/product.types';
import { getAllProducts, updateProductAvailability } from '../services/productService';
import { Table, type Column } from '../components/Table';
import ProductModal from '../components/ProductModal';

function Products(){
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllProducts();
            setProducts(result);
        } catch (error) {
            setError(error instanceof Error ? error.message: "An unknown error occurred");
            
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const columns: Column<ProductResponse>[] = [
        { 
        header: "Id", 
        render: (product) => `${product.productId}` 
        },
        { 
        header: "Name", 
        render: (product) => `${product.name}` 
        },
        { 
        header: "Description", 
        render: (product) => `${product.description}` 
        },
        { 
        header: "Category", 
        render: (product) => `${product.categoryName}` 
        },
        { 
        header: "Price", 
        render: (product) => `${product.price}` 
        },
        { 
        header: "Image", 
        render: (product) => `${product.imageUrl}` 
        },
        { 
        header: "Available", 
        render: (product) => `${product.available}` 
        },
        { 
        header: "Special", 
        render: (product) => `${product.isSpecial}` 
        },
        { 
        header: "Actions", 
        render: (product) => (
        <div className="flex gap-2">
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleToggleAvailability(product.productId, !product.available)}>
                {product.available ? 'Disable' : 'Enable'}
            </button>
        </div>)
        },
    ];

    const handleEditProduct = (product: ProductResponse) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleToggleAvailability = async (id: number, available: boolean) => {
        setLoading(true);
        try {
            await updateProductAvailability(id, available);
            fetchProducts();
        } catch (error) {
            setError(error instanceof Error ? error.message: "Failed to update availability"); 
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
    );

    return(
        <div>
            <div>
                <h1>Products</h1>
            </div>
            <div>
                <Table data={products} columns={columns} rowKey={(product) => product.productId}/>
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                    onSuccess={() => {setIsModalOpen(false); setSelectedProduct(null); fetchProducts();}}
                />
            </div>            
        </div>
    )
}

export default Products