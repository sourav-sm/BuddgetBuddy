import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/dbConfig';
import { Expense } from '@/utils/schema';
import { Budget } from '@/utils/schema';
import { toast } from 'sonner';
import moment from 'moment';

function AddExpense({budgetID,user,refreshData}) {
  const [ExpenseName,setExpenseName]=useState('');
  const [ExpenseAmount,setExpenseAmount]=useState('');
  
  const AddnewExpense=async()=>{
     const result=await db.insert(Expense).values({
         name:ExpenseName,
         amount:ExpenseAmount,
         budgetId:budgetID,
        //  createdAt:moment().format('DD/MM/YYY')
        createdAt:moment().format('DD/MM/YYYY')
      }).returning({insertId:Budget.id})
      
      setExpenseName('');
      setExpenseAmount('');

      if(result){
        refreshData();
        toast("New Expense Added Successfully!")
      }
  }

  return (
    <div className='border p-5 rounded-lg'>
        <h2 className='font-bold text-2xl'>AddExpense</h2>
        <div className="mt-2">
            <h2 className="text-black font-medium">Expense Name</h2>
            <Input 
              placeholder="e.g., Home Decor" 
              value={ExpenseName}
              onChange={(e)=>setExpenseName(e.target.value)}
            />
            </div>
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Expense Amount</h2>
              <Input 
                placeholder="e.g., 5000$" 
                type="number"
                value={ExpenseAmount}
                onChange={(e)=>setExpenseAmount(e.target.value)} 
                />
            </div>
            <Button disabled={!(ExpenseName&&ExpenseAmount)}  className="mt-3 w-full"
               onClick={()=>AddnewExpense()}>
                Add New Expense
            </Button>
    </div>
  )
}

export default AddExpense;