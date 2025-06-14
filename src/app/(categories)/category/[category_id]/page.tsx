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
    const [activeTab, setActiveTab] = useState("tab2");
    const [limit, setLimit] = useState(50);

    const { data: cards, isLoading, error } = useQuery<ICard[]>({
        queryKey: ['cards', category_id, limit],
        queryFn: async () => {
            return fetchCards(category_id, limit);
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
    }, [setIsContinue, category_id, hidden])






    if (isLoading) return <div className='flex justify-center items-center text-gray-400 text-2xl '>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;




    const handleStart = () => {
        setHidden(false);
    }

    return (
        <div className='relative text-white h-screen min-h-svh max-h-svh'>
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
                        (<div className='relative grid grid-cols-2 gap-3 py-20  px-4 '>
                            <button className='gradient_2 text-black text-xl rounded-xl font-bold mb-4 p-4 col-span-2'
                                //  onClick={handleStart} >start review</button>
                                // onClick={handleStart} >{localCounter >0 ? <>continue...</>:<>start review</>}</button>
                                onClick={handleStart} disabled={isLoading}>{isContinue ? <>continue...</> : <>start review</>}</button>
                            {cards?.map((card) => {
                                return <CardPreview key={card.card_id} card_id={card.card_id} title={card.title} />
                            })}

                            <div className='fixed bottom-5  flex justify-center items-center  w-full h-12'>

                                <div
                                    className={`absolute  bottom-1 h-10 rounded   bg-[#262c2c] w-[80px] transition-all duration-200 ease-in-out`}
                                    style={{
                                        transform: activeTab === "tab1" ? "translateX(-148%)" :
                                            activeTab === "tab2" ? "translateX(-48%)" :
                                                activeTab === "tab3" ? "translateX(48%)" :
                                                    "translateX(148%)"
                                    }}
                                ></div>
                                <div className=" flex justify-between h-full w-80  rounded-md  bg-[#464c4c] border-2 border-white">
                                    <button
                                        className={`z-10 bg-transparent font-medium  ${activeTab == 'tab1' ? 'text-white font-semibold text-xl' : 'text-gray-300'}   w-20 h-full transition-all duration-200 ease-in-out`}
                                        onClick={() => { setActiveTab("tab1"); setLimit(20) }}
                                    >
                                        20
                                    </button>
                                    <button
                                        className={`z-10 bg-transparent  font-medium border-l ${activeTab == 'tab2' ? 'text-white font-semibold text-xl' : 'text-gray-300'} text-black w-20 h-full transition-all duration-200 ease-in-out`}
                                        onClick={() => { setActiveTab("tab2"); setLimit(50) }}
                                    >
                                        50
                                    </button>
                                    <button
                                        className={`z-10 bg-transparent font-medium border-l  ${activeTab == 'tab3' ? 'text-white font-medium text-xl' : 'text-gray-300'} text-black w-20 h-full transition-all duration-200 ease-in-out`}
                                        onClick={() => { setActiveTab("tab3"); setLimit(100) }}
                                    >
                                        100
                                    </button>
                                    <button
                                        className={`z-10 bg-transparent font-medium border-l  ${activeTab == 'tab4' ? 'text-white font-medium text-xl' : 'text-gray-300'} text-black w-20 h-full transition-all duration-200 ease-in-out`}
                                        onClick={() => { setActiveTab("tab4"); setLimit(0) }}
                                    >
                                        ALL
                                    </button>
                                </div>
                            </div>





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
                        <Card cards={cards} category_id={Number(category_id)} setHidden={setHidden} />
                    }
                </>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
            )}
            <UploadCSV category_id={Number(category_id)} />

        </div >

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