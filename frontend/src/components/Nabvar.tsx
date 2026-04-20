import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { Menu, X } from "lucide-react";


function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMenuOpen(false);
    }

    const getNavLinkClass = (isActive: boolean) => 
    isActive
        ? 'bg-white/15 text-white font-semibold rounded-md px-3 py-1.5'
        : 'text-blue-50 hover:text-white hover:bg-white/10 rounded-md px-3 py-1.5 transition-colors';

    return (
        <nav className="sticky top-0 z-50">
        <div className="bg-blue-700/95 dark:bg-slate-900 border-b border-white/10 shadow-sm">

            {/* 🔹 TOP BAR */}
            <div className="flex items-center justify-between px-4 py-3">

            {/* 🔹 LEFT: LOGO + LINKS */}
            <div className="flex items-center gap-6">
                
                {/* LOGO */}
                <div className="flex items-center gap-3">
                <div className="w-1 h-8 rounded-full bg-white"></div>
                <div className="flex flex-col leading-none">
                    <span className="text-xl text-white font-bold tracking-tight">
                    FTMS
                    </span>
                    <span className="hidden sm:block text-[10px] uppercase tracking-[0.22em] text-blue-100">
                    Food Truck Management System
                    </span>
                </div>
                </div>

                {/* 🔹 DESKTOP LINKS */}
                {user && (
                <div className="hidden lg:flex items-center gap-1">
                    <NavLink to="/dashboard" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.dashboard')}</NavLink>
                        <NavLink to="/orders" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.orders')}</NavLink>
                        {isAdmin &&  <NavLink to="/expenses" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.expenses')}</NavLink>}
                        <NavLink to="/products" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.products')}</NavLink>
                        {isAdmin && <NavLink to="/categories" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.categories')}</NavLink>}
                        {isAdmin && <NavLink to="/reports" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.reports')}</NavLink>}
                        {isAdmin && <NavLink to="/users" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.users')}</NavLink>}
                </div>
                )}
            </div>

            {/* 🔹 RIGHT SIDE */}
            <div className="flex items-center gap-2">

                {/* DESKTOP CONTROLS */}
                <div className="hidden lg:flex items-center gap-3">
                <ThemeToggle />
                <LanguageToggle />

                {user && (
                    <button
                    onClick={handleLogout}
                    className="bg-white/95 text-blue-700 hover:bg-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                    {t("navbar.logout")}
                    </button>
                )}
                </div>

                {/* MOBILE CONTROLS */}
                <div className="flex items-center gap-2 lg:hidden">
                <ThemeToggle />
                <LanguageToggle />

                {user && (
                    <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-md text-white hover:bg-white/10 transition"
                    >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                )}
                </div>
            </div>
            </div>

            {/* 🔹 MOBILE MENU */}
            {user && menuOpen && (
                <div className="lg:hidden px-4 pb-4">
                    <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
                        <NavLink to="/dashboard" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.dashboard')}</NavLink>
                        <NavLink to="/orders" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.orders')}</NavLink>
                        {isAdmin &&  <NavLink to="/expenses" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.expenses')}</NavLink>}
                        <NavLink to="/products" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.products')}</NavLink>
                        {isAdmin && <NavLink to="/categories" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.categories')}</NavLink>}
                        {isAdmin && <NavLink to="/reports" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.reports')}</NavLink>}
                        {isAdmin && <NavLink to="/users" className={({ isActive }) => getNavLinkClass(isActive)}>{t('navbar.users')}</NavLink>}

                        <button
                        onClick={handleLogout}
                        className="mt-2 bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                        >
                        {t("navbar.logout")}
                        </button>
                    </div>
                </div>
            )}

        </div>
        </nav>
    );
}

export default Navbar;

