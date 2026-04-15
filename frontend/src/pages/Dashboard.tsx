import{ useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect} from 'react';
import { getDashboardStats } from '../services/dashboardService';
import StatCard from '../components/StatsCard';
import { type DashboardStatsResponse } from '../types/dashboard.types';
import { ShoppingCart, DollarSign, Clock, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard(){
    const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");

    const { user, isAdmin } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect (() => {
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
        }
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600 dark:text-gray-400">{t('dashboard.loading')}</p>
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
    );

    return (
        
        <div className="w-full max-w-7xl mx-auto p-8">            
            <div className='mb-8'>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('dashboard.welcome')}, {user?.name}</h1>
                {isAdmin && <p className="text-gray-600 dark:text-gray-400">{t('dashboard.admin')}</p>}
                {!isAdmin && <p className="text-gray-600 dark:text-gray-400">{t('dashboard.employee')}</p>}
            </div>

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

            <div className="flex gap-4 mb-8">
                <button onClick={() => navigate('/orders/new')} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                    {t('dashboard.newOrderButton')}
                </button>
                {isAdmin && (
                    <button onClick={() => navigate('/expenses')} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                    {t('dashboard.addExpenseButton')}
                    </button>
                     
                )}
                {isAdmin && (
                    <button onClick={() => navigate('/categories')} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                    {t('dashboard.addCategoryButton')}
                    </button>
                )}
            </div> 
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2>{t('dashboard.recentOrderTitle')}</h2>
            </div>
            {/* <div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">title1</th>
                            <th scope="col" className="px-6 py-3">title2</th>
                            <th scope="col" className="px-6 py-3">title3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td>thing1</td>
                            <td>thing2</td>
                            <td>thing3</td>
                        </tr>
                    </tbody>
                </table>
                
            </div> */}
        </div>  
    )
}

export default Dashboard

//className ="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 shadow-xl ring-gray-900/5