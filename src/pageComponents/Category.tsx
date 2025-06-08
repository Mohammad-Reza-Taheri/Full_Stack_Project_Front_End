'use client'
// import CategoryCard from '@/components/CategoryCard'
import React from 'react'
// import { useQuery } from "@tanstack/react-query";
// import { IGetCategory } from '@/types/type';
import MingcuteAddLine from '@/icons/MingcuteAddLine';
import Link from 'next/link';
// import { fetchCategories } from '@/services/api';
import { useAuthContext } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { IGetCategory } from '@/types/type';
import { fetchCategories } from '@/services/api';
import CategoryCard from '@/components/CategoryCard';
import FeImport from '@/icons/FeImport';
import { useGlobalContext } from '@/context/GlobalContext';
import FeExport from '@/icons/FeExport';
import UploadCSV from './UploadCSV';
import { useExport } from '@/hooks/useExport';



const Category = () => {
    // const queryClient=useQueryClient();
    const { mutate: exportCards, isPending } = useExport();
    const { isOpen, setIsOpen } = useGlobalContext();
    const { isLoggedIn } = useAuthContext()
    const { data, isLoading } = useQuery<IGetCategory>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    // console.log(data,isLoading)
    const categories = data?.categories || [];

    if (isLoading) return <div>Loading...</div>;

    const handleExport = async () => {
        exportCards()
    };

    return (
        <div className='relative h-full min-h-max px-2 py-2  '>

            <span className='text-3xl font-semibold'>Decks</span>
            {/* <div>
                <button className='flex items-center bg-[#6a72826c] p-4 mr-4 font-bold rounded-xl' >
                    <span className=' mr-2 text-2xl '><FeImport /></span>Import</button>
                <button className='flex items-center bg-[#6a72826c] p-4 mr-4 font-bold rounded-xl' >
                    <span className=' mr-2 text-2xl '><FeImport /></span>Import</button>
            </div> */}
            {/* <button>alidd</button> */}
            <div className=' w-full mt-10 mb-10 '>
                <div className='flex w-full gap-2 '>
                    <button onClick={handleExport} disabled={isPending} className='flex items-center justify-center bg-gray-700 p-4  rounded-xl text-2xl w-1/2'>
                        <span><FeExport /></span>
                        <span className='flex items-center ml-2'>{isPending ? 'Exporting...' : 'Export'}</span>
                    </button>

                    <button onClick={() => setIsOpen(true)} className='flex items-center justify-center bg-gray-700 p-4  rounded-xl text-2xl w-1/2'>
                        <span><FeImport /></span>
                        <span className='flex items-center ml-2'>Import</span>
                    </button>
                </div>
                <Link href={'/add_category'} className='flex justify-center items-center bg-slate-800 w-full p-4 rounded-xl mt-2'>
                    <span className='pl-10 py-1 text-2xl text-gray-200'>Add Category</span>
                    <span className='text-gray-200 text-3xl  pl-10 pt-1'><MingcuteAddLine /></span>
                </Link>
            </div>

            <h1>{isLoggedIn}</h1>
            {isLoggedIn ? (
                categories.length !== 0 ? (
                    categories.map((cat) => {
                        return <CategoryCard key={cat.cat_id} cat_id={cat.cat_id} cat_name={cat.cat_name} cat_cards_count={cat.cat_cards_count} />
                    })
                ) : (<h1>There is no Category</h1>)
            ) : (
                <h1>You are not Login!</h1>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
            )}
            <UploadCSV category_id={0} />

        </div>
    )
}

export default Category


// 'use client'
// import React from 'react'

// const Category = () => {
//   return (
//     <div>Category</div>
//   )
// }
// export default Category