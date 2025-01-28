"use client"
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { eq,getTableColumns, sql,desc } from 'drizzle-orm';
import { Budget,Expense } from '@/utils/schema';
import { UserButton, useUser } from '@clerk/nextjs'
import CardInfo from "./_components/CardInfo";


export default function Dashboard() {
  const {user}=useUser();
    const [budgetList,setBudgetList]=useState([]);
    
    useEffect(()=>{
      user&&getBudgetList();
    },[user])
  
  
    //for getting the budget list
    const getBudgetList=async()=>{
       const result=await db.select({
          ...getTableColumns(Budget),
          totalSpend:sql `sum(${Expense.amount})`.mapWith(Number),
          totalItems:sql `count(${Expense.id})`.mapWith(Number)
       }).from(Budget)
       .leftJoin(Expense,eq(Budget.id,Expense.budgetId))
       .where(eq(Budget.createdBy,user?.primaryEmailAddress)?.emailAddress)
       .groupBy(Budget.id)
       .orderBy(desc(Budget.id));
  
       setBudgetList(result)
    }

  return (
    <div className='p-8'>
       <h2 className='font-bold text-3xl'>Hi, {user?.fullName}✌️</h2>
      <p className='text-gray-600 text-base'>Here what happen with your money, Lets manage your expense</p>
      <CardInfo budgetList={budgetList}/>
    </div>
  )
}
