'use client'
import BackButton from '@/components/BackButton';
import Card from '@/components/Card';
import CardPreview from '@/components/CardPreview';
import MingcuteAddLine from '@/icons/MingcuteAddLine';
import { ICard } from '@/types/type'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
// import { QueryClient, useMutation} from '@tanstack/react-query'







const CategoryPage = () => {
    const { category_id } = useParams();
    const [hidden, setHidden] = useState(true);

    const { data: cards, isLoading, error } = useQuery<ICard[]>({
        queryKey: ['cards'],
        queryFn: async () => {
            // const response = await fetch('http://localhost:8000/categories', { cache: "no-cache" });
            // const response = await fetch(`http://localhost:5000/api/${category_id}/cards`);
            const response = await fetch(`http://fullstackproject-production.up.railway.app/api/${category_id}/cards`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            return response.json();
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;



    // const queryClient = new QueryClient()
    // const mutation = useMutation<unknown, Error, >({
    //     mutationFn: ()=>{
    //         console.log('ali')
    //     },
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries({ queryKey: ['categories'] })
    //     },
    // })


    //  console.log("cat id is: "+(data && data[1].card_id))

    //  const cards_fun=()=>{
    //     console.log(data?.length)
    //     return 0;
    //  }


    // const nextCard = () => {

    //     if (cards?.length && counter < cards.length - 1) {
    //         setCounter(counter + 1);
    //     }


    // }


    const handleStart = () => {
        setHidden(false);
    }

    return (

        <div className='text-white h-screen min-h-svh max-h-svh  '>



            {hidden ? (
                <div className='relative '>
                    <div className='fixed items-center top-0 right-0 flex justify-between w-full bg-slate-800'>
                        <BackButton />
                        <Link href={`/${category_id}/add_card`} className='flex items-center  p-4 mr-4 font-bold' ><span className=' mr-2 text-2xl '><MingcuteAddLine /></span>Add Card</Link>
                    </div>

                    {cards?.length ?
                        (<div className='grid grid-cols-2 gap-3 py-16  m-4'>
                            <button className='gradient_2 text-black text-xl rounded-xl font-bold mb-4 p-4 col-span-2' onClick={handleStart} >start review</button>
                            {cards?.map((card) => {
                                return <CardPreview key={card.card_id} card_id={card.card_id} title={card.title} />
                            })}
                            {/* <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview />
                        <CardPreview /> */}
                        </div>) : (
                            <div className='flex flex-col  items-center py-20 px-4 '>
                                <div>
                                    <h1 className='text-2xl mb-2'>Your category is empty!</h1>
                                    <h1 className='text-xl'>* you can add card in <span className='text-red-400'>Add Card</span> *</h1>
                                    <Link href={`/${category_id}/add_card`} className='flex items-center bg-slate-700 rounded-3xl p-4 my-5 pl-10 font-bold w-48' ><span className=' mr-4 text-2xl '><MingcuteAddLine /></span>Add Card</Link>

                                </div>
                            </div>
                        )}

                </div>
            ) : (
                <>
                    {cards &&
                        <Card cards={cards} />
                    }
                </>
            )}










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