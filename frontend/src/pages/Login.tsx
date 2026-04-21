import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail } from 'lucide-react';

function Login(){
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);  
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/dashboard', { replace: true, state: { from: 'login' } });
        }else{
            setError(t('login.error'));
        }
        setLoading(false);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6"> 
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
                
                <div className="grid md:grid-cols-2 items-center gap-8 lg:gap-12">
                    {/*Logo*/}
                    <div className="max-md:order-1 flex justify-center">
                        <div className="aspect-[12/11] flex items-center justify-center">
                             <img src="/logo1.png"  className="w-full h-full object-contain dark:brightness-150" alt="login-image" />
                        </div>
                    </div>
                
                    {/*Form*/}
                    <form className="md:max-w-md w-full mx-auto" onSubmit={handleSubmit}>
                        {/*title*/}
                        <div className="mb-12">
                            <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
                                Food Truck Management System
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-700 dark:text-white">{t('login.title')}</h1>
                        </div>
                        <div>
                            <div className="relative flex items-center">
                                <input 
                                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    name="email" type="email" required 
                                    aria-label={t('login.emailPlaceholder')} 
                                    placeholder={t('login.emailPlaceholder')} 
                                    id="email" 
                                    value={email} 
                                    onChange={handleEmailChange}
                                />
                                <Mail className="w-[18px] h-[18px] absolute right-2 text-gray-400"/>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="relative flex items-center">
                            <input 
                                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 px-3 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                                name="password" 
                                type={showPassword ? "text" : "password"} 
                                required 
                                aria-label={t('login.passwordPlaceholder')} 
                                placeholder={t('login.passwordPlaceholder')} 
                                id="password" value={password} 
                                onChange={handlePasswordChange}/>
                                {showPassword 
                                    ? <EyeOff className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}/>
                                    : <Eye className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}/>
                                }
                            </div>
                        </div>

                        <div className="mt-12">
                            <button 
                                aria-label={loading ? t('login.loading') : t('login.loginButton')}
                                type="submit" 
                                className="w-full py-3 px-4 text-sm font-semibold rounded-xl text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 shadow-sm disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? t('login.loading') : t('login.loginButton')}
                            </button>                           
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                </div> 

                {/* Demo Credentials */}
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 text-center mb-3">
                        Demo Credentials
                    </p>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <p>
                            <span className="font-semibold text-blue-700 dark:text-sky-400">Admin:</span> 
                            {' '}john.smith@foodtruck.com / password123
                        </p>
                        <p>
                            <span className="font-semibold text-blue-700 dark:text-sky-400">Employee:</span> 
                            {' '}jane.doe@foodtruck.com / password123
                        </p>
                    </div>
                </div>       
                
            </div>            
        </div>
        
    )
}

export default Login;