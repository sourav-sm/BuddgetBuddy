import React from 'react'
import Image from 'next/image'
// import dashboard from '../../public/dashboard.jpg'
import dashboard from '../../public/dashboard.png'

function Hero() {
  return (
    <section className="bg-gray-100 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-10 sm:py-32 lg:flex">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-4xl md:text-6xl text-blue-950 font-bold mb-6">
      Take Control of Your Finances</h1>
      {/* <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-800">
      Control your Money
      </h1> */}

      <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mt-4 text-black">
      BudgetBuddy helps you track expenses, set budgets, and achieve your financial goals with ease.
      </p>

      <div className="mt-8 flex flex-wrap justify-center">
        <a
          className="rounded bg-blue-800 px-12 py-3 text-md font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/sign-in"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
  <Image
    src={dashboard}
    alt="dashboard"
    width={1000}
    height={700}
    className='mt-3 rounded-xl border-2 mb-5'

  />
</section>
  )
}

export default Hero