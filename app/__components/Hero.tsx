import React from 'react'
import Image from 'next/image'
import dashboard from '../../public/dashboard.jpg'

function Hero() {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-10 sm:py-32 lg:flex">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Manager Your Expense</h1>
      <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-800">
      Control your Money
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      Start Creating your budget and save ton of money
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
    className='mt-5 rounded-xl border-2'

  />
</section>
  )
}

export default Hero