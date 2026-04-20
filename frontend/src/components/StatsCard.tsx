import type { LucideIcon } from "lucide-react";

interface CardProps{
    readonly title: string;
    readonly value: number | string;
    readonly icon?: LucideIcon;
}

function StatCard({title, value, icon:Icon }: CardProps){
    return(
        
        <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
            {Icon && <Icon className="w-10 h-10 bg-blue-100 text-blue-600 p-2 rounded-lg dark:text-blue-400 mb-4"/>}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{title}</p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{value}</p>
        </div>
    )
}

export default StatCard