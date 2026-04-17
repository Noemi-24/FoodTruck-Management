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
        <div className="w-full max-w-6xl px-4 "> 
            <div className="[box-shadow:rgba(149,157,165,0.3)_0px_4px_18px] max-w-6xl max-md:max-w-lg rounded-md p-6">
                
                <div className="grid md:grid-cols-2 items-center gap-8">
                    {/*Logo*/}
                    <div className="max-md:order-1">
                        <div className="aspect-[12/11] pl-8 md:pl-12">
                             <img src="/logo1.png"  className="w-full h-full object-contain dark:brightness-150" alt="login-image" />
                        </div>
                    </div>
                
                    {/*Form*/}
                    <form className="md:max-w-md w-full mx-auto" onSubmit={handleSubmit}>
                        {/*title*/}
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold text-blue-700 dark:text-white">{t('login.title')}</h1>
                        </div>
                        <div>
                            <div className="relative flex items-center">
                                <input 
                                    className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500"
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
                                className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500" 
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
                                className="w-full shadow-xl py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700" disabled={loading}>
                                {loading ? t('login.loading') : t('login.loginButton')}
                            </button>                           
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                </div> 

                {/* Demo Credentials */}
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 font-semibold">
                        DEMO CREDENTIALS
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