import{ useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function Dashboard(){
    const { user, isAdmin } = useAuth();
    const { t } = useTranslation();


    return (
        <div className='min-h-screen flex items-center justify-center'>            
            <div className ="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 shadow-xl ring-gray-900/5">
                <h1>Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">{t('dashboard.welcome')}, {user?.name}</p>
                {isAdmin && <p>{t('dashboard.admin')}</p>}
                
            </div>
        </div>
        
    )
}

export default Dashboard