import type { UpdateUserRequest, UserResponse, UserRole, CreateUserRequest} from "../types/user.types";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { createUser, updateUser } from "../services/userService";

interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
    user: UserResponse | null;
    onSuccess: (updateuser: UserResponse) => void;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user ? t('userModal.editTitle') : t('userModal.createTitle')}</h2>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder={t('userModal.placeholderName')}
                        value={form.name}
                        onChange={handleChange}
                        className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={t('userModal.placeholderEmail')}
                        value={form.email}
                        onChange={handleChange}
                        className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                    />
                    <input
                        type="phone"
                        name="phone"
                        placeholder={t('userModal.placeholderPhone')}
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                    />
                    <select 
                        value={form.role}
                        onChange={(e) => setForm(prev => ({...prev, role: e.target.value as UserRole}))}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-8"
                    >
                        <option value="ADMIN">{t('userModal.role.admin')}</option>
                        <option value="EMPLOYEE">{t('userModal.role.employee')}</option>
                    </select>

                    {'password'in form && (
                        <input
                        type="password"
                        name="password"
                        placeholder={t('userModal.placeholderPassword')}
                        value={form.password}
                        onChange={handleChange}
                        className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 mt-5"
                        />
                    )}

                    <div className="mt-6 flex justify-end gap-3">                  
                        <button type="submit" disabled={loading} className="rounded-md bg-blue-700 px-4 py-2 text-white font-medium cursor-pointer hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700">
                            {loading ? t('userModal.loading') : user ? t('userModal.saveButton') : t('userModal.createButton')}
                        </button>

                        <button type="button" onClick={onClose} className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 font-medium cursor-pointer">
                            {t('userModal.cancelButton')}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default UserModal;