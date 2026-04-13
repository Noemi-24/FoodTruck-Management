import type { LucideIcon } from "lucide-react";

interface CardProps{
    title: string;
    value: number | string;
    icon?: LucideIcon;
}

function StatCard({title, value, icon:Icon }: CardProps){
    return(
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            {Icon && <Icon className="w-10 h-10 text-blue-700 dark:text-blue-400 mb-4"/>}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{title}</p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{value}</p>
        </div>
    )
}

export default StatCard