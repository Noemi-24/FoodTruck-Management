function SkeletonCard(){
    return (
        <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow w-full">
            <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded-t-lg  w-[280px]"/>
            <div className="p-4">
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4 mb-3"/>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/2 mb-3"/>
                <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded w-1/3"/>
            </div>
        </div>
    )
}

export default SkeletonCard