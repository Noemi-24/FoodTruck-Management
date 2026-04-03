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
            <div className="flex justify-between items-center">
                {/* Left: Logo + Links (if logged in) */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-8 bg-blue-600"></div> 
                        <span className="text-xl font-bold text-blue-600 dark:text-white">
                            FTMS
                        </span>
                    </div>
                    
                    {user && (
                        <div className="flex gap-4">
                            <Link to="/dashboard">{t('navbar.dashboard')}</Link>
                            <Link to="/orders">{t('navbar.orders')}</Link>
                            <Link to="/expenses">{t('navbar.expenses')}</Link>
                            <Link to="/products">{t('navbar.products')}</Link>
                            {isAdmin && <Link to="/reports">{t('navbar.reports')}</Link>}
                        </div>
                    )}
                </div>
                
                {/* Right: Toggles + Logout Button */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <LanguageToggle />
                    {user && <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">{t('dashboard.logout')}</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

