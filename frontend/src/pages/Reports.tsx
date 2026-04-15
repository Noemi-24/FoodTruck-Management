import { useState, useEffect} from 'react';
import { getPopularItems, getMonthlyExpenses, getDailySales } from '../services/reportsService';
import type { PopularItemResponse, MonthlyExpenseResponse, DailySalesResponse } from '../types/reports.types';
import{ useAuth } from '../context/AuthContext';
import { ResponsiveContainer, BarChart, Bar, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

function Reports(){
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [popularItems, setPopularItems] = useState<PopularItemResponse[]>([]);
    const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpenseResponse[]>([]);
    const [dailySales, setDailySales] = useState<DailySalesResponse[]>([]);
    const { user } = useAuth();
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    
    const fetchPopularItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getPopularItems();
            setPopularItems(result);
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    const fetchMonthlyExpenses = async () => {
        setLoading(true);
        setError(null);
        try{
            const result = await getMonthlyExpenses();
            setMonthlyExpenses(result);
        }catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    const fetchDailySales = async () => {
        setLoading(true);
        setError(null);
        try{
            const result = await getDailySales();
            setDailySales(result);
        }catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }   
    };

    useEffect(() => {
        fetchPopularItems();
        fetchMonthlyExpenses();
        fetchDailySales();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600 dark:text-gray-400">{t('reports.loading')}</p>
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
    );

    const groupedExpenses = monthlyExpenses.reduce((acc, expense) => {
        const existing = acc.find(e => e.month === expense.month);
        if (existing) {
            existing[expense.category] = expense.totalAmount;
        }else{
            acc.push({
                month: expense.month,
                [expense.category]: expense.totalAmount
            });
        }
        return acc;
    }, [] as any[]);

    const groupedCategories = monthlyExpenses.reduce((acc, expense) => {
        const existing = acc.find(e => e.category === expense.category);
        if (existing) {
            existing.totalAmount += expense.totalAmount;
        }else{
            acc.push({
                category: expense.category,
                totalAmount: expense.totalAmount
            });
        }
        return acc;
    }, [] as any[]);

    const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#d946ef', '#6b7280', '#eab308','#ec4899', '#78716c', '#881337', '#020617', '#1d4ed8' ];

    return(
        <div className="w-full max-w-7xl mx-auto p-8">
            <div className='mb-8'>
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('reports.greeting')}, {user?.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{t('reports.admin')}</p>
            </div>
            <div className=' grid grid-cols-1 mb-8'>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
                    <h2 className='text-xl font-bold text-gray-900 text-center dark:text-white mb-4'>{t('reports.monthlyExpensesTitle')}</h2>
                    <ResponsiveContainer width='100%' height={300} minWidth={400}>
                        <BarChart data={groupedExpenses} barSize={40} barGap={8} barCategoryGap='20%'>
                            <XAxis dataKey='month' tickFormatter={(value)=>{
                                const [year, month] = value.split('-');
                                return new Date(year, month-1).toLocaleString('en-US', {month:'long'});
                            }} stroke='#9ca3af'/>                            
                            <YAxis tickFormatter={(value)=> `$${value.toLocaleString()}`} stroke='#9ca3af'/>
                            <Tooltip formatter={(value, name) => [`$${Number(value).toLocaleString()}`, t(`reports.categories.${name}`)]}
                                labelFormatter={(label)=> {
                                    if(!label || typeof label !== 'string') return label;
                                    const parts = label.split('-');
                                    if(parts.length < 2) return label;
                                    return new Date(Number(parts[0]), Number(parts[1]) - 1).toLocaleString(i18n.language === 'es' ? 'es-MX' : 'en-US', {month:'long', year:'numeric'});
                                }}/>
                            <Bar dataKey='INGREDIENTS' fill='#84cc16'  activeBar={{ fill: '#86efac', stroke: 'black' }}/>
                            <Bar dataKey='FUEL' fill='#f97316' activeBar={{ fill: '#fdba74', stroke: 'black' }}/>
                            <Bar dataKey='MAINTENANCE' fill='#ef4444' activeBar={{ fill: '#fca5a5', stroke: 'black' }}/>
                            <Bar dataKey='PERMITS' fill='#ec4899' activeBar={{ fill: '#f472b6', stroke: 'black' }}/>
                            <Bar dataKey='SALARIES' fill='#3b82f6' activeBar={{ fill: '#60a5fa ', stroke: 'black' }}/>
                            <Bar dataKey='MARKETING'fill='#f59e0b' activeBar={{ fill: '#fcd34d', stroke: 'black' }}/>
                            <Bar dataKey='SUPPLIES' fill='#a855f7' activeBar={{ fill: '#c084fc', stroke: 'black' }}/>
                            <Bar dataKey='OTHER' fill='#475569' activeBar={{ fill: '#94a3b8', stroke: 'black' }}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
                    <h2 className='text-xl font-bold text-gray-900 text-center dark:text-white mb-4'>{t('reports.expensesByCategoryTitle')}</h2>
                    <ResponsiveContainer width='100%' height={400} minWidth={400}>
                        <PieChart>
                            <Pie
                                data={groupedCategories}
                                dataKey="totalAmount" 
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                label
                                innerRadius="60%"
                                outerRadius="75%"
                                // Corner radius is the rounded edge of each pie slice
                                cornerRadius="50%"
                                fill="#8884d8"
                                // padding angle is the gap between each pie slice
                                paddingAngle={5}                                 
                            >                             
                            {groupedCategories.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`$${Number(value).toLocaleString()}`, t(`reports.categories.${name}`)]}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>          

                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
                    <h2 className='text-xl font-bold text-gray-900 text-center dark:text-white mb-4'>{t('reports.salesTitle')}</h2>
                    <ResponsiveContainer width='100%' height={400} minWidth={400}>
                        <LineChart data={dailySales} >
                            <XAxis dataKey="saleDate" tickFormatter={(value)=>
                                new Date(value + 'T00:00:00').toLocaleDateString('en-US', { month:'short', day:'numeric'})
                            }/>
                            <YAxis yAxisId='right'/>
                            <YAxis yAxisId='left' orientation='right'/>
                            <Tooltip formatter={(value, name) => name === 'Revenue' ? [`$${Number(value).toLocaleString()}`, name] : [value, name]}
                                labelFormatter={(label)=> {
                                    if(!label || typeof label !== 'string') return label;
                                    const parts = label.split('-');
                                    if(parts.length < 2) return label;
                                    return new Date(Number(parts[0]), Number(parts[1]) - 1).toLocaleString(i18n.language === 'es' ? 'es-MX' : 'en-US', {month:'long', year:'numeric'});
                                }}/>
                            <Line yAxisId='left' dataKey="totalRevenue" stroke='#1d4ed8' name= {t('reports.sales.Revenue')}/>
                            <Line yAxisId='right' dataKey="totalOrders" stroke='#00C49F' name={t('reports.sales.Orders')}/>
                            <Legend/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>      
            </div>

            <div className=' grid grid-cols-1 mb-8'>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
                    <h2 className='text-xl font-bold text-gray-900 text-center dark:text-white mb-4'>{t('reports.popularDishesTitle')}</h2>
                    <ResponsiveContainer width='100%' height={400} minWidth={400}>
                        <BarChart data={popularItems} layout='vertical'>
                            <XAxis type='number' allowDecimals={false}/>
                            <YAxis type='category' dataKey='name' width={160}/>
                            <Tooltip/>
                            <Bar dataKey='timesOrdered' name={t('reports.sales.totalOrders')}>
                                {popularItems.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>      
            </div>
           
        </div>
    )
}

export default Reports;