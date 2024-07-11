"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import logo from '../../public/logo.svg'
import Image from 'next/image'
import { useUser,UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function Header() {
  const {user,isSignedIn}=useUser();
  return (
    <div className='flex justify-between p-5 items-center border shadow-md'>
        <Image width={160}
        height={100}
         src={logo} 
         alt="logo" />
         {/* BudgetBuddy */}
         {isSignedIn?
         <UserButton/>:
         <Link href={"/sign-in"}>
            <Button variant="outline" >Get Started</Button>
         </Link>
        }
    </div>
  )
}

export default Header