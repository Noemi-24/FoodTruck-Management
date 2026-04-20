import { HandPlatter } from "lucide-react";
import type { ProductResponse } from "../types/product.types";
import { useTranslation } from 'react-i18next';

interface CardProps{
    readonly product: ProductResponse;
    readonly onAddToCart: (product: ProductResponse) => void;
}

function ProductoCard({product, onAddToCart}: CardProps){
    const { t } = useTranslation();
    return (   

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md overflow-hidden">
            <img 
                className="w-full h-40 object-cover bg-gray-200" 
                src={product.imageUrl} 
                onError={(e) => (e.currentTarget.src = '/tacos.jpg')} 
                alt={product.name} 
            />
        
            <div className="p-6 sm:p-5">
                {/* Special bagde */}
                {product.isSpecial && (
                    <span className="inline-flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3">
                        <HandPlatter className="w-3 h-3" />
                        {t('newOrder.special')}
                    </span>
                )}        
                 {/* Product's name  */}
                <h5 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {product.name}
                </h5>
                {/* Product's description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                </p>
                {/* Footer */}
                <div className="flex items-center justify-between gap-3">
                    <p className="text-blue-700 dark:text-blue-400">
                        <span className="text-2xl font-bold">${Math.floor(product.price)}</span>
                        <sup className="text-sm font-semibold">{String(product.price.toFixed(2)).split('.')[1]}</sup>
                    </p>
                    <button 
                        onClick={() => onAddToCart(product)} 
                        aria-label={t('newOrder.addButton')} 
                        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                        {t('newOrder.addButton')} 
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default ProductoCard