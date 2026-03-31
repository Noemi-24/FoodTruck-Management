import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

function Login(){
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);  

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
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <h1>{t('login.title')}</h1>
                <h3>{t('login.subtitle')}</h3>

                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">{t('login.email')}</label>
                        <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600" placeholder={t('login.emailPlaceholder')} id="email" type="email" value={email} onChange={handleEmailChange}/> 
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">{t('login.password')}</label>
                        <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600" placeholder={t('login.passwordPlaceholder')} id="password" type="password" value={password} onChange={handlePasswordChange}/> 
                    </div>
                    
                    <div>
                        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50" type="submit" disabled={loading} >{loading ? t('login.loading') : t('login.loginButton')}</button>
                    </div>
                </form>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>

    )
}

export default Login;