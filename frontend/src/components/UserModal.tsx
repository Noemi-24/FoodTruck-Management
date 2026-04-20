import type { UpdateUserRequest, UserResponse, UserRole, CreateUserRequest} from "../types/user.types";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { createUser, updateUser } from "../services/userService";

interface ModalProps{
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly user: UserResponse | null;
    readonly onSuccess: (updateuser: UserResponse) => void;
}

const initialUpdateState: UpdateUserRequest ={
    name: "",
    email:"",
    phone:"",
    role: 'EMPLOYEE' as UserRole,
}

const initialCreateState: CreateUserRequest ={
    name: "",
    email:"",
    phone:"",
    role: 'EMPLOYEE' as UserRole,
    password:""
}
function UserModal({ isOpen, onClose, user, onSuccess }: ModalProps ){
    const [form, setForm] = useState<CreateUserRequest | UpdateUserRequest>(initialCreateState || initialUpdateState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (user) {
        setForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        });
        } else {
        setForm(initialCreateState);
        }
    }, [user]);

    if (!isOpen) return null;

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setForm(prev => ({
        ...prev,
            [name]:
                type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : type === "number"
                ? value === "" ? null : Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!form.name || !form.email || !form.role) {
        setError(t('userModal.errorRequired'));
        return;
        }

        setLoading(true);
        setError(null);

        try {
            if(!user){
                const newUser = await createUser(form as CreateUserRequest);
                onSuccess(newUser);
                onClose();
                return;

            }else{
                const updateduser: UserResponse = {
                    ...user,
                    ...form
                };        
                // connecta API
                await updateUser(user.userId, form);        
                onSuccess(updateduser);
                onClose();
            }
        } catch {
            setError(user ? t('userModal.errorUpdate') : t('userModal.errorCreate'));
        } finally {
            setLoading(false);
        }
    };  

    return(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true" 
            aria-labelledby="user-modal-title">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-7 shadow-xl border border-gray-200 dark:border-gray-700 modal-enter">
                <h2 id="user-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user ? t('userModal.editTitle') : t('userModal.createTitle')}</h2>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        aria-label={t('userModal.placeholderName')}
                        name="name"
                        placeholder={t('userModal.placeholderName')}
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                    />
                    <input
                        type="email"
                        aria-label={t('userModal.placeholderEmail')}
                        name="email"
                        placeholder={t('userModal.placeholderEmail')}
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                    />
                    <input
                        type="phone"
                        name="phone"
                        aria-label={t('userModal.placeholderPhone')}
                        placeholder={t('userModal.placeholderPhone')}
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                    />
                    <select 
                        value={form.role}
                        aria-label={t('userModal.role.choose')}
                        onChange={(e) => setForm(prev => ({...prev, role: e.target.value as UserRole}))}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                    >
                        <option value="ADMIN">{t('userModal.role.admin')}</option>
                        <option value="EMPLOYEE">{t('userModal.role.employee')}</option>
                    </select>

                    {'password'in form && (
                        <input
                        type="password"
                        name="password"
                        aria-label={t('userModal.placeholderPassword')}
                        placeholder={t('userModal.placeholderPassword')}
                        value={form.password}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
                        />
                    )}

                    <div className="mt-6 flex justify-end gap-3"> 
                        <button 
                            type="button" 
                            aria-label={t('userModal.cancelButton')}
                            onClick={onClose} 
                            className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium transition">
                            {t('userModal.cancelButton')}
                        </button>

                        <button 
                            type="submit" 
                            aria-label={loading ? t('userModal.loading') : user ? t('userModal.saveButton') : t('userModal.createButton')}
                            disabled={loading} 
                            className="rounded-lg bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 font-medium transition disabled:opacity-50">
                            {loading ? t('userModal.loading') : user ? t('userModal.saveButton') : t('userModal.createButton')}
                        </button>                        
                    </div>

                </form>
            </div>
        </div>
    )
}

export default UserModal;