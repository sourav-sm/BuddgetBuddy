import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between bg-blue-950'>
         <div className='border pr-80 pl-2 pt-1 rounded-lg text-gray-400'>
            Searchbar
         </div>
         <div>
            <UserButton/>
         </div>
    </div>
  )
}
