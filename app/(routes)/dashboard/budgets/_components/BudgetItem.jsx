import Link from 'next/link';
import React from 'react'
import { Progress } from "@/components/ui/progress"


function BudgetItem({budget}) {
    if (!budget) {
        return <div className="p-5 border rounded-lg">No budget data available</div>;
      }

    const calculateProgress=()=>{
        const perc=(budget.totalSpend/budget.amount)*100;
        return perc.toFixed(2);
    }  
      
  return (
    <Link href={`/dashboard/expenses/${budget.id}`}>
        <div className='p-10 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
           <div className='flex gap-4 items-center justify-between'>
           <div className='flex gap-4 items-center'>
               <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
               <div>
                   <h2 className='font-bold text-lg'>{budget.name}</h2>
                   <h2 className='text-sm text-gray-500'>{budget.totalItems} Item</h2>
               </div>
           </div>
   
           <h2 className='font-bold text-green-600 text-lg' >${budget.amount}</h2>
           
           </div>
           
           {/* progressive view */}
           <div className='mt-5'>
               <div className='flex items-center justify-between mb-3'>
                   <h2 className='text-xs text-slate-700'>{budget.totalSpend?budget.totalSpend:0} Spend</h2>
                   <h2 className='text-xs text-slate-700'>{budget.amount-budget.totalSpend} Remaining</h2>
               </div>
               <Progress className='bg-slate-200' value={calculateProgress()} />
   
           </div>
        </div>
    </Link>
  )
}

export default BudgetItem;


// import Link from 'next/link';
// import React from 'react';

// function BudgetItem({ budget }) {
//   if (!budget) {
//     return <div className="p-5 border rounded-lg text-center">No budget data available</div>;
//   }

//   const progress = Math.min(
//     (budget.totalSpend / budget.amount) * 100 || 0,
//     100
//   );

//   return (
//     <Link
//       href={`/dashboard/expenses/${budget.id}`}
//       className="p-5 border rounded-lg hover:shadow-lg cursor-pointer transition-all duration-300"
//     >
//       <div className="flex items-center justify-between gap-4">
//         {/* Icon and Details */}
//         <div className="flex gap-4 items-center">
//           <div className="text-2xl p-3 px-4 bg-blue-100 text-blue-600 rounded-full">
//             {budget?.icon || "💰"}
//           </div>
//           <div>
//             <h2 className="font-bold text-lg">{budget.name}</h2>
//             <h2 className="text-sm text-gray-500">
//               {budget.totalItems} {budget.totalItems === 1 ? "Item" : "Items"}
//             </h2>
//           </div>
//         </div>

//         {/* Amount */}
//         <h2 className="font-bold text-green-600 text-lg">${budget.amount}</h2>
//       </div>

//       {/* Progress Section */}
//       <div className="mt-5">
//         <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
//           <span>${budget.totalSpend || 0} Spent</span>
//           <span>${budget.amount - budget.totalSpend || 0} Remaining</span>
//         </div>
//         <div className="w-full bg-gray-200 h-3 rounded-full relative overflow-hidden">
//           <div
//             className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default BudgetItem;
