"use client";
import React, { useEffect } from "react"
import SideNav from "./_components/SideNav"
import DashboardHeader from "./_components/DashboardHeader"
import { useUser } from "@clerk/nextjs";
import { Budget } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

export default function Dashboardlayout({children}:{children:React.ReactNode}) {
  
   const {user}=useUser();
   const router=useRouter();

    useEffect(() => {
        user&&checkUserBudgets();
    },[user])

   const checkUserBudgets=async()=>{
        const result=await db.select()
        .from(Budget)
        .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
   
      if(result?.length===0){
        router.replace("/dashboard/budgets");
      }
   
    }


    return (
    <div>
        <div className="fixed md:w-64 hidden md:block">
            <SideNav/>
        </div>
        <div className="md:ml-64">
            <DashboardHeader/>
             {children}
        </div>
    </div>
  )
}
