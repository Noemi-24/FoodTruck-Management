import { useState, useEffect} from 'react';
import type { OrderResponse, OrderStatus } from '../types/order.types';
import { getAllOrders, updateOrderStatus } from '../services/orderService';
import { Table, type Column} from '../components/Table';
import { useTranslation } from 'react-i18next';
import OrderDetailModal from '../components/OrderDetailModal';
import { useNavigate } from "react-router-dom";

function Orders(){
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
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
        }catch (error){
            setError(error instanceof Error ? error.message: t('orders.error')); 
        }finally {
            setLoading(false);
        }
    };

    const columns: Column<OrderResponse>[] =[
        {
            header: "Id",
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
            render: (order) => `${order.status}`
        },
        {
            header:  t('orders.tableHeaders.paymentMethod'), 
            render: (order) => `${order.paymentMethod}`
        },
        {
            header:  t('orders.tableHeaders.date'), 
            render: (order) => (new Date(order.orderDate).toLocaleString('en-US', { 
                    month: '2-digit', day: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                }))
        },
        {
            header:  t('orders.tableHeaders.actions'), 
            render: (order) => (
                <div className="flex gap-2">                    
                    <select 
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.orderId, e.target.value as OrderStatus)}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500"
                    >
                        <option value="PENDING">{t('orders.status.pending')}</option>
                        <option value="IN_PREPARATION">{t('orders.status.inPreparation')}</option>
                        <option value="READY">{t('orders.status.ready')}</option>
                        <option value="DELIVERED">{t('orders.status.delivered')}</option>
                        <option value="CANCELLED">{t('orders.status.cancelled')}</option>
                    </select>
                    <div className="flex gap-2">
                        <button onClick={() => handleViewDetails(order)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white px-4 py-2 rounded text-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap">{t('orders.viewDetailsButton')}</button>
                    </div>
                </div>
                
            )
        
        }
    ];
 
    const handleViewDetails = (order: OrderResponse) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };
    

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600 dark:text-gray-400">{t('products.loading')}</p>
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
    );

    return(
        <div className="w-full max-w-6xl bg-gray-50 dark:bg-gray-900 p-6">
            <div className="my-12 flex justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('orders.title')}</h1>
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95"  onClick={() => navigate('/orders/new')}>{t('orders.newOrderButton')}</button>
            </div>
            <div>
                <Table data={orders} columns={columns} rowKey={(order) => order.orderId}/>
                <OrderDetailModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    order={selectedOrder}/>
            </div> 
        </div>
    )
}

export default Orders;

