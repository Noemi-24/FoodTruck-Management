import type { ReactNode } from 'react';

export interface Column<T>{
    header: string;
    render: (item: T) => ReactNode;
}

interface TableProps<T>{
    data: T[];
    columns: Column<T>[];
    rowKey: (item: T) => string | number;
    ariaLabel?: string;
}

export const Table = <T,>({ data, columns, rowKey, ariaLabel }: TableProps<T>) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <table 
            role="table" 
            aria-label={ariaLabel}
            className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                    {columns.map((col) => (
                    <th key={col.header} 
                    className="px-4 sm:px-6 py-3 font-semibold whitespace-nowrap" >{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                <tr key={rowKey(item)}
                    className={`border-b border-gray-200 dark:border-gray-700 ${
                        rowIndex % 2 === 0 
                        ? 'bg-white dark:bg-gray-800' 
                        : 'bg-gray-50 dark:bg-gray-700'
                    }
                    transition-colors duration-150 hover:bg-blue-50 dark:hover:bg-blue-900/20`}>
                    {columns.map((col) => (
                    <td key={col.header} 
                        className="px-4 sm:px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {col.render(item)}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

