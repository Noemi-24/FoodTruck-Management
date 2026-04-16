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

        <div className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <img className="w-full h-40 object-cover rounded-t-lg" src={product.imageUrl} onError={(e) => (e.currentTarget.src = '/tacos.jpg')} alt={product.name} />
        
            <div className="p-6 text-center">
                {product.isSpecial && <span className="inline-flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                   <HandPlatter className="w-3 h-3 text-blue-700 dark:text-blue-400"/>
                   {t('newOrder.special')} 
                </span> }           
                <h5 className="m-5 text-gray-900 dark:text-white font-semibold">{product.name}</h5>
                <p className="mb-5 text-left text-gray-500 dark:text-white font-semibold">{product.description}</p>
                <div className="flex justify-between">
                    <p className="text-blue-700 dark:text-blue-400">
                        <span className="text-2xl font-bold">${Math.floor(product.price)}</span>
                        <sup className="text-sm font-semibold">{String(product.price.toFixed(2)).split('.')[1]}</sup>
                    </p>
                    <button onClick={() => onAddToCart(product)} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                        {t('newOrder.addButton')} 
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default ProductoCard