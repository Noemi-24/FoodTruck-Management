import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(   
        <nav>
            <div className="flex justify-between items-center bg-blue-700 dark:bg-blue-900 border-b border-blue-800">
                {/* Left: Logo + Links */}
                <div className="flex items-center gap-6 p-4">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-8 bg-white"></div> 
                        <span className="text-xl text-white font-bold">
                            FTMS
                        </span>
                    </div>
                    
                    {user && (
                        <div className="flex gap-4">
                            <Link to="/dashboard" className="text-white hover:text-sky-300">{t('navbar.dashboard')}</Link>
                            <Link to="/orders" className="text-white hover:text-sky-300">{t('navbar.orders')}</Link>
                            {isAdmin &&  <Link to="/expenses" className="text-white hover:text-sky-300">{t('navbar.expenses')}</Link>}
                            <Link to="/products" className="text-white hover:text-sky-300">{t('navbar.products')}</Link>
                            {isAdmin && <Link to="/reports" className="text-white hover:text-sky-300">{t('navbar.reports')}</Link>}
                        </div>
                    )}
                </div>
                
                {/* Right: Toggles + Logout Button */}
                <div className="flex items-center gap-4 p-4">
                    <ThemeToggle />
                    <LanguageToggle />
                    {user && <button onClick={handleLogout} className="bg-white text-blue-700 hover:bg-blue-50 hover:shadow-lg focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-700 px-4 py-1.5 rounded font-medium transition-all duration-200 hover:scale-105 active:scale-95">{t('navbar.logout')}</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

