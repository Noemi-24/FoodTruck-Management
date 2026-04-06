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
                                <input className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500" name="email" type="email" required placeholder={t('login.emailPlaceholder')} id="email" value={email} onChange={handleEmailChange}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                    <defs>
                                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                            <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                        </clipPath>
                                </defs>
                                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                        <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="relative flex items-center">
                            <input className="w-full text-sm border-b border-gray-300 focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500" name="password" type="password" required placeholder={t('login.passwordPlaceholder')} id="password" value={password} onChange={handlePasswordChange}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button type="submit" className="w-full shadow-xl py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700" disabled={loading}>
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