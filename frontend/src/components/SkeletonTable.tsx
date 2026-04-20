function SkeletonTable(){
    return(
        <div className="animate-pulse">            
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex gap-4 py-3 ">
                    <div className="bg-gray-200 dark:bg-gray-700 h-12 rounded w-1/4 "/>
                    <div className="bg-gray-200 dark:bg-gray-700 h-12 rounded w-1/4"/>
                    <div className="bg-gray-200 dark:bg-gray-700 h-12 rounded w-1/4"/>
                    <div className="bg-gray-200 dark:bg-gray-700 h-12 rounded w-1/4"/>
                </div>
            ))}
        </div>
    )
}

export default SkeletonTable