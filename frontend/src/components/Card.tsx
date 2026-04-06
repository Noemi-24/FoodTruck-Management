function Card(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <p className="text-gray-500">Total Orders Today</p>
                <p className="text-3xl font-bold text-blue-700">12</p>
            </div>
        </div>
    )
}

export default Card