import {useTheme} from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    return(
        <label aria-label={t('theme.toggle')} className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                aria-label={t('theme.toggle')}
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="sr-only peer"
                />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900 dark:peer-checked:bg-blue-500"></div>
            <span className="ms-3 text-white dark:text-gray-300">
                {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
            </span>
        </label>
    )

}

export default ThemeToggle;

