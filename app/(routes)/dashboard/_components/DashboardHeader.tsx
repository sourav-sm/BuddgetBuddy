import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
         <div>
            Searchbar
         </div>
         <div>
            <UserButton/>
         </div>
    </div>
  )
}
