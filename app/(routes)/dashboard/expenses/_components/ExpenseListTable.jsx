import { db } from '@/utils/dbConfig';
import { Expense } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

function ExpenseListTable({expenseList,refreshData}) {
  
  console.log("sourav is",expenseList)
  
  if (!expenseList || expenseList.length === 0) {
    return <div className="p-4 text-gray-500">No expenses available</div>;
  }

  const deleteExpense=async(expense)=>{
      const result=await db.delete(Expense)
      .where(eq(Expense.id,expense.id))
      .returning();

      if(result){
        // refres
        toast('Expense Deleted Successfully! ');
        refreshData();
      }
  }

  //wrong one---------------------------
//   return (
//     <div className='mt-3'>
//       {/* <div className='grid grid-cols-4 bg-slate-200 p-2'>  */}
//       <div className='flex  justify-around bg-slate-200 p-2'>
//         <h2>Name</h2>
//         <h2>Amount</h2>
//         <h2>Date</h2>
//         <h2>Action</h2>
//       </div>
//       {expenseList.map((expense,index)=>{
//         // <div key={index} className='grid grid-cols-4 bg-slate-200 p-2'> 
//         <div key={index} className='flex  justify-around bg-slate-200 p-2'>
//         <h2>{expense.name}</h2>
//         <h2>{expense.amount}</h2>
//         <h2>{expense.createdAt}</h2>
//         <h2>
//           <Trash className='bg-red-600'/>
//         </h2>
//       </div>
//       })}
//     </div>
//   )
// }
//
// export default ExpenseListTable;

//corect one-------------------------------------------
return (
  <div className="mt-3">
    {/* <div className="grid grid-cols-4 bg-slate-300 p-3 font-semibold text-gray-700">
     */}
     <div className='flex justify-around'>
      <h2 className='font-bold'>Name</h2>
      <h2 className='font-bold'>Amount</h2>
      <h2 className='font-bold'>Created At</h2>
      <h2 className='font-bold'>Action</h2>
     </div>
    {expenseList.map((expense, index) => (
      // <div key={index} className="grid grid-cols-4 bg-slate-200 p-2">
      <div key={index} className='flex  justify-around bg-slate-200 p-2'>
        <h2>{expense.name}</h2>
        <h2>{expense.amount}</h2>
        <h2>{expense.createdAt}</h2>
        <h2>
          <Trash 
           onClickCapture={()=>deleteExpense(expense)}
          className="text-red-600 cursor-pointer" />
        </h2>
      </div>
    ))}
  </div>
);
}

export default ExpenseListTable;