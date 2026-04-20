import type { OrderResponse } from "../types/order.types";
import { useTranslation } from 'react-i18next';

interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly order: OrderResponse | null;
}

function KitchenOrderModal({ isOpen, onClose, order}: ModalProps){
    const { t } = useTranslation();

    if (!isOpen) return null;
    if (!order) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-gray-800 p-5 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[90vh] modal-enter">
                 <div className="flex justify-end mb-3">
                    <button 
                        onClick={onClose} 
                        aria-label={t('orders.closeButton')}
                        className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium transition">
                        {t('orders.closeButton')}
                    </button>                    
                </div>

                {/* Info */}
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Order</p>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">#{order.orderId}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{order.customerName}</p>
                </div>

                {/* Item list */}
                <div>
                    {order.items?.map((orderItem) => (
                        <div key={orderItem.orderItemId} className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 py-4">
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-lg">{orderItem.productName}</p>
                                {orderItem.notes && <p className="text-sm text-gray-500 dark:text-gray-400 italic">{orderItem.notes}</p>}
                            </div>
                            <span className="text-lg font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                                x{orderItem.quantity}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default KitchenOrderModal