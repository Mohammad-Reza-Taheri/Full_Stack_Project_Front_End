import Card from '@/components/Card'
import React from 'react'

const CardPage = () => {
  return (
    <div className='relative h-screen min-h-svh max-h-svh'>
        
        <div className='bg-amber-800 absolute right-2 top-7 rounded-full p-5'>H</div>
        
        <Card/>
    </div>
  )
}

export default CardPage