import type { OrderResponse } from "../types/order.types";
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderResponse | null;
}

function OrderDetailModal({ isOpen, onClose, order}: ModalProps){
    const { t } = useTranslation();

    if (!isOpen) return null;
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl rounded-lg bg-white p-4 sm:p-6 shadow-2xl dark:bg-gray-800 overflow-y-auto max-h-[90vh] dark:text-gray-300">
                <div className="flex justify-end mb-3">
                    <button onClick={onClose} className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium cursor-pointer">{t('orders.closeButton')}</button>                    
                </div>
                <img src="/logo1.png" alt="login-image" className="w-48 h-auto mx-auto mb-3 dark:brightness-150"/>
                <div className="flex flex-col justify-center items-center gap-2">
                    <p className="text-xs"> 123 Main St. Columbus, OH</p>
                </div>
                <div className="flex flex-col gap-3 border-b py-6 text-xs">
                    <p className="flex justify-between">
                        <span>{t('orders.orderId')}:</span>
                        <span>#{order.orderId}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>{t('orders.processedBy')}:</span>
                        <span>{order.processedByUserName}</span>
                    </p>    
                    <p className="flex justify-between">
                        <span>{t('orders.tableHeaders.paymentMethod')}:</span>
                        <span>{order.paymentMethod}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>{t('orders.createdOn')}:</span>
                        <span>{new Date(order.orderDate).toLocaleString('en-US', { 
                                weekday: 'long', year: 'numeric', month: 'long', 
                                day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}
                        </span>
                    </p>  
                    <p className="flex justify-between">
                        <span>{t('orders.tableHeaders.status')}:</span>
                        <span>{order.status}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>{t('orders.lastUpdated')}:</span>
                        <span>{new Date(order.updatedAt).toLocaleString('en-US', { 
                                weekday: 'long', year: 'numeric', month: 'long', 
                                day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}</span>
                    </p>              
                </div>
                <div className="flex flex-col gap-3 border-b py-6 text-sm">
                    <h3 className="text-center">{t('orders.customer')}</h3>
                    <p className="flex justify-between">
                        <span>{t('orders.tableHeaders.name')}:</span>
                        <span>{order.customerName}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>{t('orders.phone')}:</span>
                        <span>{order.customerPhone}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>{t('orders.email')}:</span>
                        <span>{order.customerEmail}</span>
                    </p>
                </div>
                <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
                    <table className="w-full text-left mt-4">
                        <thead>
                            <tr>
                                <th className="w-full py-2 text-gray-700 dark:text-gray-300">{t('orders.product')}</th>
                                <th className="min-w-[44px] py-2 text-gray-700 dark:text-gray-300">{t('orders.qty')}</th>
                                <th className="min-w-[44px] py-2 text-gray-700 dark:text-gray-300">{t('orders.price')}</th>
                                <th className="min-w-[44px] py-2 text-gray-700 dark:text-gray-300">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items?.map((orderItem) => (
                                <tr key={orderItem.orderItemId} className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="flex-1 py-2 text-gray-900 dark:text-gray-200">{orderItem.productName}</td>
                                    <td className="min-w-[44px] text-gray-900 dark:text-gray-200">{orderItem.quantity}</td>
                                    <td className="min-w-[44px] text-gray-900 dark:text-gray-200">${orderItem.priceAtOrder}</td>
                                    <td className="min-w-[44px] text-gray-900 dark:text-gray-200">${orderItem.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between pt-4 ">
                        <span className="font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="font-bold text-gray-900 dark:text-white">${order.total}</span>
                    </div>
                    <div className="border-b border border-dashed"></div>
                    <div className="py-4 justify-center items-center flex flex-col gap-2">
                        <p>ftms-info@foodtruck.com</p>
                        <p>1-800-123-4567</p>
                    </div>
                </div>   
            </div>
        </div>
    );
}
export default OrderDetailModal