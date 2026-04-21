import { useState, useEffect, useMemo} from 'react';
import { type ProductResponse } from '../types/product.types';
import { getAllProducts, updateProductAvailability } from '../services/productService';
import { Table, type Column } from '../components/Table';
import ProductModal from '../components/ProductModal';
import { useTranslation } from 'react-i18next';
import{ useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import SkeletonTable from '../components/SkeletonTable';

function Products(){
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();
    const { isAdmin } = useAuth();

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllProducts();
            setProducts(result);
        } catch (error) {
            setError(error instanceof Error ? error.message: "Failed to load products");
            
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const getBooleanBadge = (value: boolean) =>
        value
            ? "px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
            : "px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700";

    const columns: Column<ProductResponse>[] = [
        { 
            header: t('products.tableHeaders.name'), 
            render: (product) => `${product.name}` 
        },
        { 
            header: t('products.tableHeaders.category'), 
            render: (product) => `${product.categoryName}` 
        },
        { 
            header: t('products.tableHeaders.price'), 
            render: (product) => `$${product.price.toFixed(2)}` 
        },
        { 
            header:  t('products.tableHeaders.image'),  
            render: (product) => (
                <img
                    loading="lazy"
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                />
            ) 
        },
        { 
            header:  t('products.tableHeaders.available'),  
            render: (product) => (
                <span className={getBooleanBadge(product.available)}>
                    {product.available ? t('common.yes') : t('common.no')}
                </span>
                )
        },
        { 
            header:  t('products.tableHeaders.special'), 
            render: (product) => (
                <span className={getBooleanBadge(product.isSpecial)}>
                    {product.isSpecial ? t('common.yes') : t('common.no')}
                </span>
                )
        },
        { 
            header:  t('products.tableHeaders.actions'),  
            render: (product) => (
            <div className="flex gap-2">
                {isAdmin &&
                    <button 
                        onClick={() => handleEditProduct(product)}
                        aria-label={t('products.editButton')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition">
                        {t('products.editButton')}
                    </button>
                }
                <button 
                    onClick={() => handleToggleAvailability(product.productId, !product.available)} 
                    aria-label={product.available ? t('products.disableButton') :  t('products.enableButton')} 
                    className={`${product.available ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white px-3 py-1.5 rounded-lg text-sm font-medium transition`}>
                    {product.available ? t('products.disableButton') :  t('products.enableButton')} 
                </button>
            </div>)
        }
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
            setError(error instanceof Error ? error.message: t('products.error')); 
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProduct = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const searchedProducts = useMemo(() => {
        return products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    if (loading) return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
            <div className="w-full">
                <SkeletonTable />
            </div>
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
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{t('products.title')}</h1>               
                {isAdmin && <button 
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95"  
                    aria-label={t('products.newProductButton')}
                    onClick={() => handleCreateProduct()}>
                    {t('products.newProductButton')}
                    </button>}
            </div>

            <SearchBar value={searchTerm} onChange={setSearchTerm}/>
            
            <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
                    <Table data={searchedProducts} columns={columns} rowKey={(product) => product.productId} ariaLabel={t('products.tableAriaLabel')}/>
                </div>
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