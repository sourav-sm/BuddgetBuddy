'use client';

import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from '../../../../../BuddgetBuddy/public/logo.svg'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path])

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: `/dashboard/expenses`
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ]

  return (
    <div className='h-screen p-5 border shadow-sm'>
      <Image width={160}
        height={100}
        src={logo} 
        alt="logo" />
      <div className='mt-2'>
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex items-center space-x-2 font-medium text-gray-500 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${
                path === menu.path ? 'text-primary bg-blue-100' : ''
              }`}>
              <menu.icon />
              <span>{menu.name}</span>
            </h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-5 p-5 flex gap-2 items-center'>
        <UserButton />
        <span>Profile</span>
      </div>
    </div>
  )
}

export default SideNav