"use client"
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { eq,desc } from 'drizzle-orm';
import { Budget,Expense } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import ExpenseListTable from './ExpenseListTable'

function ExpenseList() {
    const {user}=useUser();
    const [expenseList,setExpenseList]=useState([]);

    useEffect(()=>{
          user&&getAllExpenses();
        },[user])

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
    <div>
       <div>
          <h2 className='text-lg font-bold mb-3'>Latest Expense</h2>
          <ExpenseListTable
           expenseList={expenseList}
           refreshData={()=>getBudgetList()}
          />
        </div>
    </div>
  )
}

export default ExpenseList