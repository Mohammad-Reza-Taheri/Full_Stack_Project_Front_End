import CategoryCard from '@/components/CategoryCard'
import React from 'react'
// import { useQuery } from "@tanstack/react-query";
// import { ICategory } from '@/types/type';


// const fetchCategories = async () => {
//     // const response = await fetch('http://localhost:8000/categories', { cache: "no-cache" });
//     const response = await fetch('http://localhost:5000/api/categories');
//     if (!response.ok) {
//         throw new Error('Failed to fetch categories');
//     }
//     return response.json() ;
// };

const Category = () => {

    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['categories'],
    //     queryFn: fetchCategories,
    // });

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    // console.log("categories :"+JSON.stringify(data))
    // console.log("categories :"+data[0].cat_name)

    return (
        <div className='h-full min-h-max px-2 py-2  '>
            <span className='text-2xl font-semibold'>Decks</span>
            {/* {data.map((cat:ICategory) => {

               return <CategoryCard key={cat.cat_name} cat_name={cat.cat_name} />
            })} */}

            <CategoryCard  cat_name='category 1' />
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
            <CategoryCard  cat_name='category 12' />

        </div>
    )
}

export default Category