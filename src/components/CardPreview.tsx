'use client'
import { ICard, ICardPreview } from '@/types/type'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import MingcutePencilLine from '../icons/MingcutePencilLine';
import MaterialSymbolsDeleteOutline from '@/icons/MaterialSymbolsDeleteOutline';
import { useGlobalContext } from '@/context/GlobalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCard } from '@/services/api';
import { useParams } from 'next/navigation';



const CardPreview = ({ title, card_id }: ICardPreview) => {
    const queryClient = useQueryClient();
      const params=useParams();
        const category_id = params?.category_id as string;
    const [isSelect, setIsSelect] = useState(false);
    const {  selectedId } = useGlobalContext()

    // useEffect(() => {
    //     // return setIsCheckBox(false)

    //     if (selectedId === card_id)
    //         setIsSelect(false);

    // }, [setIsSelect, card_id, selectedId])

    //////////////////
    // useEffect(() => {
    //     if (card_id === selectedId) {
    //         setIsSelect(true)
    //     } else {
    //         setIsSelect(false)
    //     }

    //     // return setIsSelect(false)
    // }, [selectedId, card_id])

    useEffect(() => {
        // if (card_id === selectedId) {
        //     setIsSelect(false)
        //     // } else {
        //     //     setIsSelect(false)
        // }


        return setIsSelect(false)
    }, [selectedId, card_id])






    ///////prev true
    const mutation = useMutation<unknown, Error, number, { previousCards?: ICard[] }>({
        mutationFn: async (id) => {
            try {
                return deleteCard(id, category_id);
            } catch (err) {
                console.log(err);
            }
        },
        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: ['cards', category_id] });

            const previousCards = queryClient.getQueryData<ICard[]>(['cards', category_id]);

            queryClient.setQueryData<ICard[]>(['cards', category_id], oldCards =>
                oldCards?.filter(card => card.card_id !== deletedId) || []
            );

            return { previousCards }; // Explicitly returning previousCards
        },
        onError: (_err, _deletedId, context) => {
            if (context?.previousCards) {
                queryClient.setQueryData<ICard[]>(['cards', category_id], context.previousCards);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cards', category_id] });
        }
    });





    const handleDelete = (id: number) => {
        // mutation.mutate({ id, category_id });
        // console.log("cat id:" + category_id)
        mutation.mutate(id)
    }

    // const handleRadioButton = (id: number) => {
    //     handleRadio(id)
    //     if (card_id === id) {
    //         if (bigSelect) {
    //             setIsSelect(true)
    //             setBigSelect(false)
    //         } else {
    //             setIsSelect(false)
    //             setBigSelect(true)
    //         }
    //     } else {
    //         setIsSelect(false)
    //     }

    //     // if(selectedId==id){
    //     //     setIsSelect(false)
    //     // }

    // }

    
    return (
        // <div className='relative flex  justify-center px-2 pt-2 pb-7 text-center items-end  h-46 rounded-t-md rounded-b-xl bg-violet-900 '>
        //     <div className='flex justify-center items-center text-xl font-medium text-[#fff] overflow-hidden w-full text-wrap
        //      rounded-t-md rounded-b-xl bg-black h-full'>{title}</div>
        //     {/* menu */}
        //     <div className='absolute bottom-0 bg-gray-500 w-full h-20 rounded-b-xl hover:translate-y-7 '>
        //         setting
        //     </div>
        // </div>

        // <div onClick={() => handleRadioButton(card_id)} className='rounded-b-xl h-46 overflow-hidden'>
        <div onClick={() => setIsSelect(!isSelect)} className='rounded-b-xl h-46 overflow-hidden'>
            <div className='relative flex  justify-center px-2 pt-2 pb-7 text-center items-end  h-46 rounded-t-md rounded-b-xl bg-violet-900 '>
                <div className='flex justify-center items-center text-xl font-medium text-[#fff] overflow-hidden w-full text-wrap
             rounded-t-md rounded-b-xl bg-black h-full'>{title}</div>
                {/* menu */}
                <div className={`absolute flex justify-around items-center bottom-0 bg-gray-800 w-full h-20 rounded-b-xl  ${isSelect ? 'translate-y-0' : "translate-y-20"} transition-all`}>

                    <Link href={`/category/${category_id}/cards/edit_card/${card_id}`} className='text-2xl pl-3 text-sky-600 '><MingcutePencilLine /></Link>
                    <div className='w-[1px] h-1/2 bg-white'></div>
                    <button onClick={() => handleDelete(card_id)} className='text-2xl pr-3 text-red-600'><MaterialSymbolsDeleteOutline /></button>
                </div>
            </div>
        </div>
    )
}

export default CardPreview


