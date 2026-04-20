import type { OrderResponse, OrderStatus } from "../types/order.types";
import { useTranslation } from 'react-i18next';
import SkeletonTable from "./SkeletonTable";
import { updateOrderStatus } from '../services/orderService';
import { useState } from 'react';

interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly order: OrderResponse | null;
  readonly onSuccess: () => void;
}

function KitchenOrderModal({ isOpen, onClose, order, onSuccess}: ModalProps){
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const { t } = useTranslation();

    const handleUpdateStatus = async (id: number, status: OrderStatus) => {
        setLoading(true);
        try{
            await updateOrderStatus(id, status);
            onSuccess();
        }catch (error){
            setError(error instanceof Error ? error.message: t('orders.error')); 
        }finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;
    if (!order) return null;

     if (loading) return (
        <div className="w-full max-w-6xl p-8">
            <SkeletonTable />
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
    );

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl rounded-lg bg-white p-4 sm:p-6 shadow-2xl dark:bg-gray-800 overflow-y-auto max-h-[90vh] dark:text-gray-300  modal-enter">
                 <div className="flex justify-end mb-3">
                    <button 
                        onClick={onClose} 
                        aria-label={t('orders.closeButton')}
                        className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium cursor-pointer">
                        {t('orders.closeButton')}
                    </button>                    
                </div>
                <div>
                    <p>#{order.orderId}</p>
                    <p>{order.customerName}</p>
                </div>
                <div>
                    {order.items?.map((orderItem) => (
                        <div key={orderItem.orderItemId} className="flex justify-between items-start border-b py-3">
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-lg">{orderItem.productName}</p>
                                {orderItem.notes && <p className="text-sm text-gray-500 dark:text-gray-400 italic">{orderItem.notes}</p>}
                            </div>
                            <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">x{orderItem.quantity}</span>
                        </div>
                    ))}
                </div>
                <select 
                    value={order.status}
                    aria-label={t('orders.status.choose')}
                    onChange={(e) => handleUpdateStatus(order.orderId, e.target.value as OrderStatus)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500"
                >
                    <option value="PENDING">{t('orders.status.pending')}</option>
                    <option value="IN_PREPARATION">{t('orders.status.inPreparation')}</option>
                    <option value="READY">{t('orders.status.ready')}</option>
                </select>
            </div>
        </div>
    );
}

export default KitchenOrderModal