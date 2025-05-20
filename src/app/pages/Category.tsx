import CategoryCard from '@/components/CategoryCard'
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { ICategory } from '@/types/type';
import MingcuteAddLine from '@/icons/MingcuteAddLine';
import Link from 'next/link';


const fetchCategories = async () => {
    // const response = await fetch('http://localhost:8000/categories', { cache: "no-cache" });
    // const response = await fetch('http://localhost:5000/api/categories');
    const response = await fetch('http://fullstackproject-production.up.railway.app/api/categories');
    
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json() ;
};

const Category = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;




    return (
        <div className='h-full min-h-max px-2 py-2  '>
            <span className='text-3xl font-semibold'>Decks</span>
            <Link href={'/add_category'} className='flex justify-center items-center bg-slate-800 w-full p-4 mt-10 mb-10 rounded-xl'><span className='pl-10 py-1 text-2xl text-gray-200'>Add Category</span><span className='text-gray-200 text-3xl  pl-10 pt-1'><MingcuteAddLine/></span></Link>
            {data.map((cat:ICategory) => {
               return <CategoryCard key={cat.cat_id} cat_id={cat.cat_id} cat_name={cat.cat_name} />
            })}

            

            {/* <CategoryCard  cat_name='category 1' />
            <CategoryCard  cat_name='category 2' />
            <CategoryCard  cat_name='category 3' />
            <CategoryCard  cat_name='category 4' />
            <CategoryCard  cat_name='category 5' />
            <CategoryCard  cat_name='category 6' />
            <CategoryCard  cat_name='category 7' />
            <CategoryCard  cat_name='category 8' />
            <CategoryCard  cat_name='category 9' />
            <CategoryCard  cat_name='category 10' />
            <CategoryCard  cat_name='category 11' />
            <CategoryCard  cat_name='category 12' /> */}

        </div>
    )
}

export default Category