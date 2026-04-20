function SkeletonChart() {
    return (
        <div className="animate-pulse motion-safe:animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="bg-gray-200 dark:bg-gray-700 h-6 rounded w-1/3 mb-4"/>
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded"/>
        </div>
    );
}

export default SkeletonChart;