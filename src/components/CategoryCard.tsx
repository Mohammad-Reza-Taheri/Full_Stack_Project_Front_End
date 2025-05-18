'use client'
import React from 'react'
import MingcuteCopyLine from '../icons/MingcuteCopyLine';
import MaterialSymbolsArrowForwardIosRounded from '@/icons/MaterialSymbolsArrowForwardIosRounded';
import { ICategory } from '@/types/type';


const CategoryCard = ({cat_name}:ICategory) => {
    console.log("this is catName:"+cat_name)
    return (
        <div className='bg-gray-900 flex justify-between px-3 py-4 h-20 w-full  mt-4 rounded-lg'>
            <span className='flex justify-center items-center p-4 text-2xl rounded-full bg-gray-700 '><MingcuteCopyLine /></span>
            <div className='flex items-center justify-between min-w-60 '>
                <span className='text-xl font-semibold '>{cat_name}</span>
                <div className='flex  mt-1'>
                    <span className='text-sm text-gray-400'>26 Karte</span>
                    <span className='text-2xl text-gray-300'><MaterialSymbolsArrowForwardIosRounded /></span>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard