'use client'
import React, { useEffect, useState } from 'react'
import MingcuteCopyLine from '../icons/MingcuteCopyLine';
import MaterialSymbolsArrowForwardIosRounded from '@/icons/MaterialSymbolsArrowForwardIosRounded';
import { ICategory } from '@/types/type';
import Link from 'next/link';
import StreamlineInterfaceSettingMenuVerticalNavigationVerticalThreeCircleButtonMenuDots from '@/icons/StreamlineInterfaceSettingMenuVerticalNavigationVerticalThreeCircleButtonMenuDots';
import MingcutePencilLine from '../icons/MingcutePencilLine';;
import MaterialSymbolsDeleteOutline from '@/icons/MaterialSymbolsDeleteOutline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '@/services/api';
import MingcuteCloseLine from '@/icons/MingcuteCloseLine';


const CategoryCard = ({ cat_name, cat_id, cat_cards_count }: ICategory) => {
    const queryClient = useQueryClient();
    const [isSetting, setIsSetting] = useState(false);

    const mutation = useMutation<unknown, Error, number, { previousCategories?: ICategory[] }>({
        mutationFn: async (id) => {
            try {
                return deleteCategory(id);
            } catch (err) {
                console.log(err);
            }
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
          
        },
        // onMutate: async (deletedId) => {
        //     await queryClient.cancelQueries({ queryKey: ['categories',] });

        //     const previousCategories = queryClient.getQueryData<ICategory[]>(['categories',]);

        //     queryClient.setQueryData<ICategory[]>(['categories'], oldCategories =>
        //         oldCategories?.filter(cat => cat.cat_id !== deletedId) || []
        //     );

        //     return { previousCategories }; // Explicitly returning previousCards
        // },
        // onError: (_err, _deletedId, context) => {
        //     if (context?.previousCategories) {
        //         queryClient.setQueryData<ICategory[]>(['categories'], context.previousCategories);
        //     }
        // },
        // onSettled: () => {
        //     queryClient.invalidateQueries({ queryKey: ['categories'] });
        // }
    });

    // useEffect(() => {
    //     console.log("CategoryCard re-rendered. isSetting:", isSetting);
    // }, [isSetting]);

    



    const handleDelete = (id: number) => {
        setIsSetting(false)
        mutation.mutate(id)
    }

    useEffect(() => {
        return setIsSetting(false)
    }, [])

    return (
        <div className='bg-gray-900 flex items-center h-20 w-full mt-4 rounded-lg  overflow-hidden '>
            {/* // <div className='flex p-4 bg-gray-900  h-20'>
        //    <button onClick={()=>setIsSetting(!isSetting)}>ali</button> */}
            {/* <Link href={`/${cat_id}`} className='bg-gray-900 flex items-center h-20 w-full mt-4 rounded-lg min-w-max'> */}

            {isSetting ? (
                <div className={`flex   h-full w-36 min-w-36 `} >

                    <Link href={`/edit_category/${cat_id}`} className='flex justify-center items-center text-2xl bg-sky-500  w-1/2 h-full'><MingcutePencilLine /></Link>
                    <button onClick={() => { handleDelete(cat_id) }} className='flex justify-center items-center text-2xl bg-red-500 w-1/2 h-full'><MaterialSymbolsDeleteOutline /></button>

                    <button onClick={() => setIsSetting(false)} className='text-2xl h-full px-1 bg-black'><MingcuteCloseLine /></button>
                </div>

            ) : (

                <button onClick={() => setIsSetting(true)} className='flex bg-[#141d2f] w-8 rounded-l-lg h-full text-2xl justify-center items-center'><StreamlineInterfaceSettingMenuVerticalNavigationVerticalThreeCircleButtonMenuDots /></button>

            )}

            <Link href={`/category/${cat_id}`} className='flex justify-between items-center px-2  min-w-60 w-full h-full '>
                <div className='flex items-center'>
                    <span className='flex justify-center items-center p-4 text-2xl rounded-full bg-gray-700'><MingcuteCopyLine /></span>
                    <span className='text-xl font-semibold pl-2'>{cat_name}</span>
                </div>
                <div className='flex mt-1 '>
                    <span className='text-sm text-gray-400 ml-4 text-nowrap'>{cat_cards_count} Karte</span>
                    <span className='text-2xl text-gray-300'><MaterialSymbolsArrowForwardIosRounded /></span>
                </div>
            </Link>
            {/* <div className='flex justify-between py-3 pr-2'>
                <div className='flex items-center justify-between min-w-60'>
                    <span className='text-xl font-semibold pl-2'>{cat_name}</span>
                    <div className='flex  mt-1'>
                        <span className='text-sm text-gray-400'>{cat_cards_count} Karte</span>
                        <span className='text-2xl text-gray-300'><MaterialSymbolsArrowForwardIosRounded /></span>
                    </div>
                </div>
            </div> */}
            {/* </Link > */}
        </div>




    )
}

export default CategoryCard