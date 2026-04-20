import{ useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo} from 'react';
import { getDashboardStats } from '../services/dashboardService';
import StatCard from '../components/StatsCard';
import { type DashboardStatsResponse } from '../types/dashboard.types';
import { ShoppingCart, DollarSign, Clock, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { OrderResponse } from '../types/order.types';
import { getAllOrders } from '../services/orderService';
import { Table, type Column } from '../components/Table';
import SkeletonTable from '../components/SkeletonTable';
import { getStatusBadge } from '../utils/statusBadge';

function Dashboard(){
    const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [orders, setOrders] = useState<OrderResponse[]>([]);

    const { user, isAdmin } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getDashboardStats();
            setStats(result);
        } catch (error) {
            setError(error instanceof Error ? error.message:  "An unknown error occurred");
        }finally{
            setLoading(false);
        }        
    };

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllOrders();
            setOrders(result);
        }catch (error) {
            setError(error instanceof Error ? error.message: "Failed to load orders");
        }finally{
            setLoading(false);
        }
    };   

    useEffect (() => {
        fetchStats();
        fetchOrders();
    }, []);

    const pendingOrders = useMemo(() => {
        return orders.filter(order => order.status === 'PENDING');
    },[orders]);

    const columns: Column<OrderResponse>[] = [
        { 
            header: t('orders.tableHeaders.name'), 
            render: (order) => `${order.customerName}` 
        },
        { 
            header: t('orders.tableHeaders.status'), 
            render: (order) => (
                <span className={getStatusBadge(order.status)}>
                    {order.status}
                </span>  
            ) 
        },
        { 
            header: "Total", 
            render: (order) => `$${order.total.toFixed(2)}` 
        },
        { 
            header: t('orders.tableHeaders.date'), 
            render: (order) => new Date(order.orderDate).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }) 
        }
    ];

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

    return (
        
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"> 
            {/* Greeting */}
            <div className='mb-8'>
                 <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">{t('dashboard.title')}</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{t('dashboard.welcome')}, {user?.name}</h1>
                {isAdmin && <p className="text-gray-600 dark:text-gray-400">{t('dashboard.admin')}</p>}
                {!isAdmin && <p className="text-gray-600 dark:text-gray-400">{t('dashboard.employee')}</p>}
            </div>

            {/* Stats Cards */}
            <div className={`grid gap-4 mb-8 ${
                isAdmin 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}>

                <StatCard title={t('dashboard.totalOrders')} value={stats?.ordersToday ?? 0} icon={ShoppingCart} />
                {isAdmin && ( 
                    <StatCard title={t('dashboard.expensesToday')} value={stats?.expensesToday ?? 0} icon={Wallet}/>
                )}
                {isAdmin && (
                        <StatCard title={t('dashboard.revenue')} value={stats?.revenueToday ?? 0} icon={DollarSign}/>
                )}
                <StatCard title={t('dashboard.pending')} value={stats?.pendingOrders ?? 0} icon={Clock}/>
            </div>  
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button 
                    aria-label={t('dashboard.newOrderButton')}
                    onClick={() => navigate('/orders/new')} 
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                    {t('dashboard.newOrderButton')}
                </button>
                {isAdmin && (
                    <button 
                        aria-label={t('dashboard.addExpenseButton')}
                        onClick={() => navigate('/expenses')}
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                        {t('dashboard.addExpenseButton')}
                    </button>
                     
                )}
                {isAdmin && (
                    <button 
                        aria-label={t('dashboard.addCategoryButton')}
                        onClick={() => navigate('/categories')} 
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                        {t('dashboard.addCategoryButton')}
                    </button>
                )}
                {isAdmin && (
                    <button 
                        aria-label={t('dashboard.addProductButton')}
                        onClick={() => navigate('/products')} 
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                        {t('dashboard.addProductButton')}
                    </button>
                )}
            </div>             
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">{t('dashboard.recentOrderTitle')}</h2>
                    <Table data={pendingOrders} columns={columns} rowKey={(order) => order.orderId} ariaLabel={t('dashboard.tableAriaLabel')}/>          
            </div>
        </div>  
    )
}

export default Dashboard

