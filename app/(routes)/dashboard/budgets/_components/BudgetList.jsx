"use client";
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/utils/dbConfig';
import { eq,getTableColumns, sql,desc } from 'drizzle-orm';
import { Budget,Expense } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';


function BudgetList() {
  const {user}=useUser();
  const [budgetList,setBudgetList]=useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    user&&getBudgetList().then(() => setLoading(false));
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

     setBudgetList(result)
  }
  
  
  return (
    // <div className="mt-9 bg-gray-100 p-5 rounded-lg shadow-md">
    //   <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     <CreateBudget 
    //       refreshData={getBudgetList}
    //     />
    //     {(budgetList?.length>0?&&{user})budgetList.map((budget,index)=>(
    //       <BudgetItem key={index} budget={budget} />
    //     ))
    //    :[1,2,3,4,5,6].map((item,index)=>(
    //     <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

    //     </div>
    //    ))
    //   }
    //   </div>
    // </div>

    <div className="mt-9 bg-gray-100 p-5 rounded-lg shadow-md">
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <CreateBudget refreshData={getBudgetList} />

    {loading ? (
      // Show skeletons only when data is loading
      [1, 2, 3, 4, 5, 6].map((item, index) => (
        <div key={index} className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"></div>
      ))
    ) : budgetList?.length > 0 ? (
      // Show budget items when data is available
      budgetList.map((budget, index) => (
        <BudgetItem key={index} budget={budget} />
      ))
    ) : (
      // Show nothing if the user has no budgets yet
      <p className="mt-11 text-xl font-bold text-black">No budgets found.🤕<br /> Create a new budget to get started.</p>
    )}
  </div>
</div>
  );
}

export default BudgetList;
