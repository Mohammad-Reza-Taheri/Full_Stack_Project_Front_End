'use client'
import React from 'react'

const Card = () => {
  return (
    // bg-[#0f172b]
    //card Container
    <div className='bg-[#0f172b] h-screen min-h-svh max-h-svh flex flex-col items-center py-2 px-2 '>
      {/* previous Card button */}
      <button className='bg-violet-600 absolute left-2 top-7 p-5 rounded-full'>prev</button>

      {/* progress line */}
      <div className='bg-red-500 h-2 w-full rounded-full'>
        <div className='bg-green-500 h-full w-1/3 rounded-full'></div>
      </div>

      {/* card detail container */}
      <div className=' w-full h-full'>
        {/* card Title */}
        <div className=' flex justify-center py-4  items-end h-1/2'>
          <div className='bg-blue-600 text-3xl font-medium text-[#fff]'>title</div>
        </div>

        {/* card Description*/}
        <div className='bg-gray-100 h-[0.5px] w-full'></div>
        <div className=' flex justify-center py-4 items-start h-1/2 '>
          <div className='bg-blue-600 text-3xl font-medium text-[#fff]'>description</div>
        </div>
      </div>

      {/* card Buttons */}
      <div className='bg-slate-800  flex justify-around px-2 py-[2px] w-max rounded-xl  min-w-max '>
        <button className='py-4 w-20 m-1 rounded-md border-[1.5px] border-[#e11f1f] bg-[#4608098f] text-[#e11f1f] hover:bg-[#e11f1f] hover:text-[#460809] hover:font-semibold  transition-all'>Fehl</button>
        <button className='py-4 w-20 m-1 rounded-md border-[1.5px] border-[#cca000] bg-[#4320048f] text-[#cca000] hover:bg-[#cca000] hover:text-[#432004] hover:font-semibold  transition-all'>Schwer</button>
        <button className='py-4 w-20 m-1 rounded-md border-[1.5px] border-[#00b4e1] bg-[#052f4a8f] text-[#00b4e1] hover:bg-[#00b4e1] hover:text-[#052f4a] hover:font-semibold  transition-all'>Gut</button>
        <button className='py-4 w-20 m-1 rounded-md border-[1.5px] border-[#60ff04]  bg-[#032e158f] text-[#60ff04] hover:bg-[#60ff04] hover:text-[#032e15] hover:font-semibold transition-all '>Liecht</button>
      </div>


    </div>
  )
}

export default Card