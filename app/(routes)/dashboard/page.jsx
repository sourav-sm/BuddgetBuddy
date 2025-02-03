"use client"
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { eq,getTableColumns, sql,desc } from 'drizzle-orm';
import { Budget,Expense } from '@/utils/schema';
import { UserButton, useUser } from '@clerk/nextjs'
import CardInfo from "./_components/CardInfo";
import BarChartDashBord from "./_components/BarChartDashBord";
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';


export default function Dashboard() {
  const {user}=useUser();
    const [budgetList,setBudgetList]=useState([]);
    const [expenseList,setExpenseList]=useState([]);

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
       .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
       .groupBy(Budget.id)
       .orderBy(desc(Budget.id));
  
       setBudgetList(result);
       getAllExpenses();
    }

/***Used to fetch all expense list */

    const getAllExpenses=async()=>{
      const result=await db.select({
        id:Expense.id,
        name:Expense.name,
        amount:Expense.amount,
        createdAt:Expense.createdAt
      }).from(Budget)
      .rightJoin(Expense,eq(Budget.id,Expense.budgetId))
      .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expense.id));

      setExpenseList(result);
    }

  return (
    <div className='p-8'>
       <h2 className='font-bold text-3xl'>Hi, {user?.fullName}✌️</h2>
      <p className='text-gray-600 text-base'>Here what happen with your money, Lets manage your expense</p>
      <CardInfo budgetList={budgetList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashBord 
             budgetList={budgetList}
          />
          <ExpenseListTable
           expenseList={expenseList}
           refreshData={()=>getBudgetList()}
          />
        </div>
        <div>
          <h2 className='text-lg font-bold mb-3'>Latest Expense</h2>
          <div className='grid gap-3'>
          {budgetList.map((budget,index)=>(
            <BudgetItem budget={budget} key={index} />
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
