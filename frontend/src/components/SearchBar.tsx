import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
    readonly value: string;
    readonly onChange: (value: string) => void;
}
function SearchBar({ value, onChange }: SearchBarProps) {
    const { t } = useTranslation();
    return (
        <div>            
            <form className="mb-6" onSubmit={(e) => e.preventDefault()}>   
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300"/>
                    
                    <input 
                        type="search" 
                        aria-label={t('searchBar.placeholder')}
                        id="search" 
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                        placeholder={t('searchBar.placeholder')}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}

export default SearchBar