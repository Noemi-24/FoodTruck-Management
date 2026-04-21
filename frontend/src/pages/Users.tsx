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

    const getBooleanBadge = (value: boolean) =>
        value
            ? "px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
            : "px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700";

    const getRoleBadge = (role: string) =>
        role === "ADMIN"
            ? "px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
            : "px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700";

    const columns: Column<UserResponse>[] = [
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
            render: (user) => (
                <span className={getRoleBadge(user.role)}>
                    {user.role}
                </span>
            )
        },
        { 
            header: t('users.tableHeaders.active'), 
            render: (user) => (
                <span className={getBooleanBadge(user.active)}>
                    {user.active ? t('common.yes') : t('common.no')}
                </span>
            )
        },
        { 
            header:  t('users.tableHeaders.actions'),  
            render: (user) => (
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleEditUser(user)}
                        aria-label={t('users.edit')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition">
                        {t('users.edit')}
                    </button>
                    <button 
                        onClick={() => handleToggleDeactive(user.userId, user.active)} 
                        aria-label={user.active ? t('users.disableButton') :  t('users.enableButton')} 
                        className={`${user.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white px-3 py-1.5 rounded-lg text-sm font-medium transition`}>
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
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('users.title')}</h1>
                <button 
                    onClick={() => handleCreateUser()} 
                    aria-label={t('users.newUserButton')}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95" >
                    {t('users.newUserButton')}
                    </button>
            </div>
            <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
                    <Table data={users} columns={columns} rowKey={(user) => user.userId} ariaLabel={t('users.tableAriaLabel')}/>
                </div>
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