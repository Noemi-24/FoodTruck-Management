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
        <div className="overflow-x-auto rounded-lg shadow">
        <table 
            role="table" 
            aria-label={ariaLabel}
            className="w-full text-sm text-left">
            <thead className="bg-sky-600 text-white">
                <tr>
                    {columns.map((col, index) => (
                    <th key={index} className="px-6 py-3 font-semibold" >{col.header}</th>
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
                    }`}>
                    {columns.map((col, index) => (
                    <td key={index} className="px-6 py-4 text-gray-700 dark:text-gray-300">
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

