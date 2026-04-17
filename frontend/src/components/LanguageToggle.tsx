import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from 'react-i18next';

function LanguageToggle() {
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    return (
        <label aria-label={t('language.toggle')} className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                aria-label={t('language.toggle')}
                checked={language === 'es'}
                onChange={() => changeLanguage(language === 'es' ? 'en' : 'es')}
                className="sr-only peer"
                />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900 dark:peer-checked:bg-blue-500"></div>
            <span className="ms-3 text-white dark:text-gray-300">
                {language === 'en' ? 'ES' : 'EN'}
            </span>
        </label>
    );
}

export default LanguageToggle;