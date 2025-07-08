import React from 'react'

const DashboardCard = ( {title, value, subtext} ) => (

    <div className="bg-white dark:bg-gray-800 shadow rounded p-5">
        <h2 className="text-xl font-medium text-gray-500 dark:text-gray-300">{title}
            {subtext && <span className="block text-sm text-gray-400">{subtext}</span> }  
        </h2>
        <p  className="text-3xl font-semibold text-gray-800 dark:text-white mt-2">{value}</p>
    </div>
  )


export default DashboardCard