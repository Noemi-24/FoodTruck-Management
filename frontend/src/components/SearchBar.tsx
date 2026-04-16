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
            <form className="min-w-2xs mb-8">   
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400 dark:text-gray-300"/>
                    </div>
                    <input type="search" id="search" className="block w-full p-3 ps-9 text-sm text-heading border border-default-medium rounded-xl focus:border-blue-700 pr-8 px-2 py-3 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500" 
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