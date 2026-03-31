import { useLanguage } from "../context/LanguageContext";

function LanguageToggle() {
    const { language, changeLanguage } = useLanguage();
    return (
        <button onClick={() => changeLanguage(language === 'en' ? 'es' : 'en')} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {language === 'en' ? 'ES' : 'EN'}
        </button>
    );
}

export default LanguageToggle;