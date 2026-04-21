import { useState, useEffect} from 'react';
import type { OrderResponse, OrderStatus } from '../types/order.types';
import { getAllOrders, updateOrderStatus } from '../services/orderService';
import { Table, type Column} from '../components/Table';
import { useTranslation } from 'react-i18next';
import OrderDetailModal from '../components/OrderDetailModal';
import { useNavigate } from "react-router-dom";
import SkeletonTable from '../components/SkeletonTable';
import { getStatusBadge } from '../utils/statusBadge';
import KitchenOrderModal from '../components/KitchenOrderModal';

function Orders(){
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
    const [isKitchenModalOpen, setIsKitchenModalOpen] = useState(false);
    const [kitchenOrder, setKitchenOrder] = useState<OrderResponse | null>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllOrders();
            setOrders(result);
        } catch (error) {
            setError(error instanceof Error ? error.message: "Failed to load orders");
            
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchOrders();
    },[]);

    const handleUpdateStatus = async (id: number, status: OrderStatus) => {
        setLoading(true);
        try{
            await updateOrderStatus(id, status);
            fetchOrders();
            setKitchenOrder(prev => prev ? {...prev, status} : null);
        }catch (error){
            setError(error instanceof Error ? error.message: t('orders.error')); 
        }finally {
            setLoading(false);
        }
    };

    const columns: Column<OrderResponse>[] =[
        {
            header: t('orders.tableHeaders.orderNumber'),
            render: (order) => `${order.orderId}`
        },
        {
            header: t('orders.tableHeaders.name'), 
            render: (order) => `${order.customerName}`
        },
        {
            header: "Total",
            render: (order) => `$${order.total.toFixed(2)}`
        },
        {
            header:  t('orders.tableHeaders.status'), 
            render: (order) => (
                <span className={getStatusBadge(order.status)}>
                    {order.status.replaceAll("_", " ")}
                </span>
            )
        },
        {
            header:  t('orders.tableHeaders.date'), 
            render: (order) => (new Date(order.orderDate).toLocaleString('en-US', { 
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                }))
        },
        {
            header:  t('orders.tableHeaders.actions'), 
            render: (order) => (
                <div className="flex gap-2">                    
                    <select 
                        value={order.status}
                        aria-label={t('orders.status.choose')}
                        onChange={(e) => handleUpdateStatus(order.orderId, e.target.value as OrderStatus)}
                        className="min-w-[140px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500"
                    >
                        <option value="PENDING">{t('orders.status.pending')}</option>
                        <option value="IN_PREPARATION">{t('orders.status.inPreparation')}</option>
                        <option value="READY">{t('orders.status.ready')}</option>
                        <option value="DELIVERED">{t('orders.status.delivered')}</option>
                        {order.status === 'PENDING' && (
                            <option value="CANCELLED">{t('orders.status.cancelled')}</option>
                        )}
                
                    </select>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleViewDetails(order)} 
                            aria-label={t('orders.viewDetailsButton')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                        >
                            {t('orders.viewDetailsButton')}
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleViewKitchen(order)} 
                            aria-label={t('orders.kitchenButton')}
                            disabled={order.status === 'READY' || order.status === 'DELIVERED' || order.status === 'CANCELLED'}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {t('orders.kitchenButton')}
                        </button>
                    </div>
                </div>
                
            )
        
        }
    ];
 
    const handleViewDetails = (order: OrderResponse) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleViewKitchen = (order: OrderResponse) => {
        setKitchenOrder(order);
        setIsKitchenModalOpen(true);
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

    return(
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('orders.title')}</h1>
                <button 
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm" 
                    aria-label={t('orders.newOrderButton')}
                    onClick={() => navigate('/orders/new')}>
                    {t('orders.newOrderButton')}
                    </button>
            </div>
            <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
                    <Table data={orders} columns={columns} rowKey={(order) => order.orderId} ariaLabel={t('orders.tableAriaLabel')}/>
                </div>
                <OrderDetailModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    order={selectedOrder}
                />
                <KitchenOrderModal
                    isOpen={isKitchenModalOpen}
                    onClose={() => setIsKitchenModalOpen(false)}
                    order={kitchenOrder}
                />
            </div> 
        </div>
    )
}

export default Orders;

