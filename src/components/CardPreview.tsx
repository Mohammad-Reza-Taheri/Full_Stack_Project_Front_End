import {  ICardPreview } from '@/types/type'
import React from 'react'

const CardPreview = ({title,card_id}:ICardPreview) => {
    console.log(card_id)
    return (
        <div className=' flex  justify-center px-2 pt-2 pb-7 text-center items-end  h-46 rounded-t-md rounded-b-xl bg-violet-900'>
            <div className='flex justify-center items-center text-xl font-medium text-[#fff] overflow-hidden w-full text-wrap
             rounded-t-md rounded-b-xl bg-black h-full'>{title}</div>
        </div>
    )
}

export default CardPreview


