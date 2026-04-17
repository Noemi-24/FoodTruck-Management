import { useState, useEffect } from 'react';
import { type UserResponse } from '../types/user.types';
import { getAllUsers, deactivateUser, reactivateUser } from '../services/userService';
import { useTranslation } from 'react-i18next';
import { type Column , Table} from "../components/Table";
import UserModal from '../components/UserModal';
import SkeletonTable from '../components/SkeletonTable';

function Users(){
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            //uncomment to see skeleton
            //await new Promise(resolve => setTimeout(resolve, 3000));
            const result = await getAllUsers();
            setUsers(result);
        } catch (error) {
            setError(error instanceof Error ? error.message: "Failed to load Users");
            
        }finally{
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const columns: Column<UserResponse>[] = [
        { 
            header: "Id", 
            render: (user) => `${user.userId}` 
        },
        { 
            header: t('users.tableHeaders.name'), 
            render: (user) => `${user.name}` 
        },
        { 
            header: t('users.tableHeaders.email'), 
            render: (user) => `${user.email}` 
        },
        { 
            header: t('users.tableHeaders.role'), 
            render: (user) => `${user.role}`
        },
        { 
            header: t('users.tableHeaders.active'), 
            render: (user) => user.active ? t('common.yes') : t('common.no')
        },
        { 
            header:  t('users.tableHeaders.actions'),  
            render: (user) => (
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleEditUser(user)}
                        aria-label={t('users.edit')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white px-3 py-1 rounded text-sm transition-all duration-200 hover:scale-105 active:scale-95">
                        {t('users.edit')}
                    </button>
                    <button 
                        onClick={() => handleToggleDeactive(user.userId, user.active)} 
                        aria-label={user.active ? t('users.disableButton') :  t('users.enableButton')} 
                        className={`${user.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white px-3 py-1 rounded text-sm transition-all duration-200 hover:scale-105 active:scale-95`}>
                        {user.active ? t('users.disableButton') :  t('users.enableButton')} 
                    </button>
                </div>
            )
        }
    ];

    const handleEditUser = (user: UserResponse) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleToggleDeactive = async (id: number, active: boolean) => {
        try {
            if (active) {
                await deactivateUser(id);
            } else {
                await reactivateUser(id);
            }
            fetchUsers();
        } catch (error) {
            setError(error instanceof Error ? error.message: t('users.error')); 
        }
    };

    const handleCreateUser = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

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
        <div className="w-full max-w-6xl bg-gray-50 dark:bg-gray-900 p-6">
            <div className="my-12 flex justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('users.title')}</h1>
                <button 
                    onClick={() => handleCreateUser()} 
                    aria-label={t('users.newUserButton')}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95" >
                    {t('users.newUserButton')}
                    </button>
            </div>
            <div>
                <Table data={users} columns={columns} rowKey={(user) => user.userId} ariaLabel={t('users.tableAriaLabel')}/>
                <UserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={selectedUser}
                    onSuccess={() => {setIsModalOpen(false); setSelectedUser(null); fetchUsers();}}
                />
            </div>  
                      
        </div>
    )
}

export default Users