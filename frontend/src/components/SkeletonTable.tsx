function SkeletonTable(){
    return(
        <div className="animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 py-3 border-b">
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/4"/>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/4"/>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/4"/>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/4"/>
                </div>
            ))}
        </div>
    )
}

export default SkeletonTable