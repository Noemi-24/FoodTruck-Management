import { useState, useEffect} from 'react';
import { type CategoryResponse } from '../types/category.types';
import { getAllCategories } from '../services/categoryService';
import { Table, type Column } from '../components/Table';
import { useTranslation } from 'react-i18next';
import{ useAuth } from '../context/AuthContext';
import CategoryModal from '../components/CategoryModal';
import SkeletonTable from '../components/SkeletonTable';

function Category(){
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();
    const { isAdmin } = useAuth();

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

    const columns: Column<CategoryResponse>[] = [
        { 
            header: t('categories.tableHeaders.name'), 
            render: (category) => `${category.name}` 
        },
        { 
            header:  t('categories.tableHeaders.actions'),  
            render: (category) => (
            <div className="flex gap-2">
                {isAdmin &&
                    <button onClick={() => handleEditCategory(category)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                    >{t('categories.editButton')}
                </button>
                }                
            </div>
            )
        }
    ];

    const handleEditCategory = (category: CategoryResponse) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleCreateCategory = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

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

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{t('categories.title')}</h1>
                {isAdmin && <button 
                    aria-label={t('categories.newCategoryButton')}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm"  
                    onClick={() => handleCreateCategory()}>{t('categories.newCategoryButton')}
                </button>}
            </div>
            <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
                    <Table data={categories} columns={columns} rowKey={(category) => category.categoryId} ariaLabel={t('categories.tableAriaLabel')}/>
                </div>
                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    category={selectedCategory}
                    onSuccess={() => {setIsModalOpen(false); setSelectedCategory(null); fetchCategories();}}
                />
            </div>  
                      
        </div>
    )
}

export default Category