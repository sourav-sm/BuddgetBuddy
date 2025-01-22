// import React from 'react'
// import CreateBudget from "./CreateBudget"

// function BudgetList() {
//   return (
//     <div className='mt-9 bg-red-500'>
//         <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
//            <CreateBudget />
//            <div className='bg-red-400'>yuhvhjjh j j</div>
//         </div>
        
//     </div>
//   )
// }

// export default BudgetList;

import React from 'react';
import CreateBudget from './CreateBudget';

function BudgetList() {
  return (
    <div className="mt-9 bg-red-500 p-5">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CreateBudget />
        <div className="bg-red-400 p-5 rounded-md shadow-md">
          <p className="text-white text-lg">Sample Budget Item</p>
        </div>
      </div>
    </div>
  );
}

export default BudgetList;
