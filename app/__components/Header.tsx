"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import logo from '../../public/logo.svg'
import Image from 'next/image'
import { useUser,UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Header() {
  const {user,isSignedIn}=useUser();
  const router=useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]); 

  return (
    <div className='flex justify-between p-5 items-center border shadow-md'>
        {/* <Image width={160}
        height={100}
         src={logo} 
         alt="logo" /> */}
         <span className="text-xl font-bold text-blue-900">BudgetBuddy</span>
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