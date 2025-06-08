'use client'
export const dynamic = 'force-dynamic';
import BackButton from '@/components/BackButton';
import Card from '@/components/Card';
import CardPreview from '@/components/CardPreview';
import { useGlobalContext } from '@/context/GlobalContext';
import FeImport from '@/icons/FeImport';
// import { useGlobalContext } from '@/context/GlobalContext';
// import { useGlobalContext } from '@/context/GlobalContext';
import MingcuteAddLine from '@/icons/MingcuteAddLine';
import UploadCSV from '@/pageComponents/UploadCSV';
// import UploadCSV from '@/pageComponents/UploadCSV';
import { fetchCards } from '@/services/api';
import { ICard } from '@/types/type'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
    const { isOpen, setIsOpen } = useGlobalContext();

    const params = useParams();
    const category_id = params?.category_id as string;
    const [hidden, setHidden] = useState(true);
    const [isContinue, setIsContinue] = useState(false);

    const { data: cards, isLoading, error } = useQuery<ICard[]>({
        queryKey: ['cards', category_id],
        queryFn: async () => {
            return fetchCards(category_id);
            // const response = await fetch('http://localhost:8000/categories', { cache: "no-cache" });
            //  const response = await fetch(`http://localhost:5000/api/${category_id}/cards`);
            //  const response = await fetch(`https://ankibro.liara.run/api/${category_id}/cards`);

            // const response= await fetch(`https://fullstackproject-production.up.railway.app/api/${category_id}/cards`, { cache: "no-cache" });
            //    return axios(`https://fullstackproject-production.up.railway.app/api/${category_id}/cards`);
            //    return client(`/api/${category_id}/cards`)

            // try{

            //     return getCards(category_id)

            // }catch(err){

            //     throw new Error('Failed to fetch categories',err);
            // }

            //   if (!response.ok) {
            //   }
            //   return response.json();
        },
        enabled: !!category_id, // Prevents unnecessary fetch when id is undefined
        //   keepPreviousData: false // 👈 Ensures fresh data without stale content


    });


    useEffect(() => {
        if (localStorage.getItem('local_counter')) {
            const value = JSON.parse(localStorage.getItem('local_counter') as string)
            if ((value.find((item: { cat_id: number, count: number }) => item.cat_id === Number(category_id))?.count) > 0) {
                setIsContinue(true)
            }
        }
    }, [setIsContinue, category_id])






    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;



    const handleStart = () => {
        setHidden(false);
    }

    return (
        <div className='text-white h-screen min-h-svh max-h-svh  '>
            {hidden ? (
                <div className='relative '>
                    <div className='fixed z-20 items-center top-0 right-0 flex justify-between w-full backdrop-blur-md'>
                        <BackButton />
                        <div className='flex'>
                            <Link href={`/category/${category_id}/cards/add_card`} className='flex items-center bg-[#6a72826c] p-4 mr-4 font-bold rounded-xl' >
                                <span className=' mr-2 text-2xl '><MingcuteAddLine /></span>Add Card</Link>
                            {/* <Link href={`/category/${category_id}/upload_in_category`} className='flex items-center bg-[#6a72826c] p-4 mr-4 font-bold rounded-xl' >
                                <span className=' mr-2 text-2xl '><FeImport /></span>Import</Link> */}

                            <button onClick={() => setIsOpen(true)} className='flex items-center bg-[#6a72826c] p-4 mr-4 font-bold rounded-xl' >
                                <span className=' mr-2 text-2xl '><FeImport /></span>Import</button>
                        </div>
                    </div>



                    {cards?.length ?
                        (<div className='grid grid-cols-2 gap-3 py-20  m-4'>
                            <button className='gradient_2 text-black text-xl rounded-xl font-bold mb-4 p-4 col-span-2'
                                //  onClick={handleStart} >start review</button>
                                // onClick={handleStart} >{localCounter >0 ? <>continue...</>:<>start review</>}</button>
                                onClick={handleStart} >{isContinue ? <>continue...</> : <>start review</>}</button>
                            {cards?.map((card) => {
                                return <CardPreview key={card.card_id} card_id={card.card_id} title={card.title} />
                            })}

                        </div>) : (
                            <div className='flex flex-col  items-center py-20 px-4 '>
                                <div>
                                    <h1 className='text-2xl mb-2'>Your category is empty!</h1>
                                    <h1 className='text-xl'>* you can add card in <span className='text-red-400'>Add Card</span> *</h1>
                                    <Link href={`/category/${category_id}/cards/add_card`} className='flex items-center bg-slate-700 rounded-3xl p-4 my-5 pl-10 font-bold w-48' >
                                        <span className=' mr-4 text-2xl '><MingcuteAddLine /></span>Add Card</Link>

                                </div>
                            </div>
                        )}

                    {/* <UploadCSV/> */}

                </div>
            ) : (
                <>
                    {cards &&
                        <Card cards={cards} category_id={Number(category_id)} />
                    }
                </>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
            )}
            <UploadCSV category_id={Number(category_id)}/>

        </div>

    )
}

export default CategoryPage


// import React from 'react'

// const page = () => {
//   return (
//     <div className='text-white'>page</div>
//   )
// }

// export default page