import type { OrderResponse } from "../types/order.types";
import { useTranslation } from 'react-i18next';
import { getStatusBadge } from "../utils/statusBadge";

interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly order: OrderResponse | null;
}

function OrderDetailModal({ isOpen, onClose, order}: ModalProps){
    const { t } = useTranslation();

    if (!isOpen) return null;
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800 p-5 sm:p-7 shadow-xl border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[90vh] modal-enter">
                {/* Headear */}
                <div className="text-center border-b border-dashed pb-4 mb-4">
                    <img src="/logo1.png" alt="logo" className="w-32 h-auto mx-auto mb-2 dark:brightness-150" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Food Truck Management System</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">123 Main St. Columbus, OH</p>
                </div>
                {/* Info */}
                <div className="flex flex-col gap-3 border-b py-6 text-xs">
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.orderId')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">#{order.orderId}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.processedBy')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{order.processedByUserName}</span>
                    </p>    
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.tableHeaders.paymentMethod')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.createdOn')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{new Date(order.orderDate).toLocaleString('en-US', { 
                                weekday: 'long', year: 'numeric', month: 'long', 
                                day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}
                        </span>
                    </p>  
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.tableHeaders.status')}:</span>
                        <span className={getStatusBadge(order.status)}>
                            {order.status.replaceAll("_", " ")}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.lastUpdated')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{new Date(order.updatedAt).toLocaleString('en-US', { 
                                weekday: 'long', year: 'numeric', month: 'long', 
                                day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}</span>
                    </p>              
                </div>
                <div className="flex flex-col gap-3 border-b py-6 text-sm">
                    <h3 className="text-center">{t('orders.customer')}</h3>
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.tableHeaders.name')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{order.customerName}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.phone')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{order.customerPhone}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{t('orders.email')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{order.customerEmail}</span>
                    </p>
                </div>
                {/* Item table */}
                <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
                    <table 
                        role="table" 
                        aria-label={t('orders.details')}
                        className="w-full text-left mt-4">
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
                                    <td 
                                        className="flex-1 py-2 text-gray-900 dark:text-gray-200"
                                    >   
                                        <div>
                                            <p>{orderItem.productName}</p>
                                            {orderItem.notes && (
                                            <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">
                                                {orderItem.notes}
                                            </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="min-w-[44px] text-gray-900 dark:text-gray-200">{orderItem.quantity}</td>
                                    <td className="min-w-[44px] text-gray-900 dark:text-gray-200">${orderItem.priceAtOrder}</td>
                                    <td className="min-w-[44px] text-gray-900 dark:text-gray-200">${orderItem.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Total section */}
                    <div className="flex justify-between pt-4 text-base">
                        <span className="font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="font-bold text-blue-700 dark:text-blue-400">${order.total}</span>
                    </div>
                    <div className="border-b border border-dashed"></div>
                    <div className="py-4 justify-center items-center flex flex-col gap-2">
                        <p>ftms-info@foodtruck.com</p>
                        <p>1-800-123-4567</p>
                    </div>
                </div> 
                <div className="flex justify-end">
                    <button 
                        onClick={onClose} 
                        aria-label={t('orders.closeButton')}
                        className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium transition">
                        {t('orders.closeButton')}
                    </button>                    
                </div>  
            </div>
        </div>
    );
}
export default OrderDetailModal