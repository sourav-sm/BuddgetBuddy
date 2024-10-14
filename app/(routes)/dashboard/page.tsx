import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Card from './_components/Card';


export default function Dashboard() {
  return (
    <div>
        <div className='flex justify-around mt-5'>
          <Card title={"Total Expenses"} amount={123}/>
          <Card title={"Monthly Budgets"} amount={123}/>
          <Card title={"Remaining Budget"} amount={123}/>
        </div> 


    </div>
  )
}
