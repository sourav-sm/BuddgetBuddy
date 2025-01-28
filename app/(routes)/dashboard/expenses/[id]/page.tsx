"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { eq, getTableColumns, sql, desc } from "drizzle-orm";
import { Budget, Expense } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import EditBudget from '../_components/EditBudget'

const Expenses = () => {
  const params = useParams();
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expenseList,setExpenseList]=useState([]);
  const route=useRouter();

  // useEffect(() => {
  //   if (user && params?.id) {
  //     getBudgetInfo(params.id);
  //   }
  // }, [user,params]);
  useEffect(() => {
      user&&getBudgetInfo();
    }, [user]);

  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budget),
          totalSpent: sql`sum(${Expense.amount})`.mapWith(Number),
          totalItems: sql`count(${Expense.id})`.mapWith(Number),
        })
        .from(Budget)
        .leftJoin(Expense, eq(Budget.id, Expense.budgetId))
        .where(eq(Budget.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budget.id, params.id))
        .groupBy(Budget.id);
        
        setBudgetInfo(result[0]);
        console.log("budget info ----",result);
        getExpenseList();
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  const getExpenseList=async()=>{
    const result=await db.select().from(Expense)
    .where(eq(Expense.budgetId,params.id))
    .orderBy(desc(Expense.id));
    setExpenseList(result);
    console.log(result);
  }

  const deleteBudget=async()=>{
    
    const deleteExpenseResult=await db.delete(Expense)
    .where(eq(Expense.budgetId,params.id))
    .returning()

    if(deleteExpenseResult){
      const result=await db.delete(Budget)
      .where(eq(Budget.id,params.id))
      .returning();
      
      if(result){
        toast("Budget Deleted Successfully!")
        route.replace('/dashboard/budgets')
      }
    }
  }



  return (
    <div className="p-10">
      <div className="flex justify-between">
         <h2 className="text-2xl font-bold flex justify-between">My Expenses</h2>
         <span>
          <div className="flex gap-2">
            {/* <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo()}  /> */}
            <Button className="flex gap-2" variant="destructive" onClick={()=>deleteBudget()}> 
              <Trash/>Delete Budget
            </Button>
          </div>
            
         </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo?<BudgetItem budget={budgetInfo}/>
        :<div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse">
        </div>}
        <AddExpense budgetID={params.id} 
          user={user}
          refreshData={()=>getBudgetInfo()}
          />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-xl">Latest Expense</h2>
        <ExpenseListTable expenseList={expenseList}
          refreshData={()=>getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default Expenses;
