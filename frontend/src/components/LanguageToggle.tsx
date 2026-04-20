import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from 'react-i18next';

function LanguageToggle() {
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                aria-label={t('language.toggle')}
                checked={language === 'es'}
                onChange={() => changeLanguage(language === 'es' ? 'en' : 'es')}
                className="sr-only peer"
                />
            <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
            <span className="ms-2 text-xs font-medium text-white dark:text-gray-300">
                {language === 'en' ? 'ES' : 'EN'}
            </span>
        </label>
    );
}

export default LanguageToggle;