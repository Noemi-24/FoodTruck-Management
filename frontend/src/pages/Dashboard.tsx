import{ useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';

function Dashboard(){
    const { user, isAdmin } = useAuth();
    const { t } = useTranslation();


    return (
        <>
        <div >            
            <div >
                <h1>{t('dashboard.welcome')}, {user?.name}</h1>
                {isAdmin && <p>{t('dashboard.admin')}</p>}
                {!isAdmin && <p>{t('dashboard.employee')}</p>}
            </div>
            <div>
                <Card/>
                <Card/>
                <Card/>
                <Card/>

            </div>  
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    action
                </button>
            </div>  
            <div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td >John Doe</td>
                            <td >John Doe</td>
                            <td >John Doe</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
        
        </>   
    )
}

export default Dashboard

//className ="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 shadow-xl ring-gray-900/5