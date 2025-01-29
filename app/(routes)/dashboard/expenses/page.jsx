import React from 'react';
import ExpenseList from './_components/ExpenseList';

function page() {
  return (
    <div className="p-10">
        <h2 className="font-semibold text-3xl mb-6">My Expense List</h2>
        <ExpenseList/>
    </div>
  )
}

export default page