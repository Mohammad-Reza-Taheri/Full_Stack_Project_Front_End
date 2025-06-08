'use client'
export const dynamic = 'force-dynamic';
import BackButton from '@/components/BackButton';
import { postCard } from '@/services/api';
import { IAddCard } from '@/types/type';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';


const AddCardPage = () => {
    const queryClient = useQueryClient();
    const params = useParams();
    const category_id = params?.category_id as string;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IAddCard>();

    // const queryClient = new QueryClient()

    const mutation = useMutation<unknown, Error, IAddCard>({
        mutationFn: async (data) => {
            try {
                return postCard(data, category_id);
                // const response = await fetch(`http://localhost:5000/api/${category_id}/cards`, {
                // const response = await fetch(`https://ankibro.liara.run/api/${category_id}/cards`, {
                //     method: "POST",
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(data),
                // });
                // console.log('this is response in add_category: '+JSON.stringify(response))
                // return response.json();
            } catch (err) {
                console.log(err)
            }
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['cards'] })
            reset();
        },
    })
    const onSubmit = (data: IAddCard) => {
        mutation.mutate(data)



    }

    return (
        <div className='h-screen min-h-svh max-h-svh text-white '>
            <BackButton />
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-end h-1/2 w-full '>
                <label htmlFor='title' className='text-gray-300 text-3xl mb-6 mx-6'>Enter title and description for your card</label>
                {/* <input {...register('firstName')} /> */}
                <input {...register('title', { required: true })}
                    className=' text-white outline-0 text-3xl border-b-2 border-gray-500 mx-4 mb-5 px-4 py-2'
                    placeholder='Enter a card title...' />
                <textarea {...register('description', { required: true })}
                    className=' text-white outline-0 text-xl border-b-2 border-gray-500 mx-4 px-4 py-2'
                    placeholder='Enter a card description...' />
                {errors.title && <p className='text-red-600 text-lg ml-4'>Last name is required.</p>}
                {/* <input {...register('age', { pattern: /\d+/ })} />
            {errors.age && <p>Please enter number for age.</p>} */}
                <input type="submit" className='bg-slate-800 text-white text-xl font-semibold p-4 m-4 mt-10 rounded-xl' disabled={mutation.isPending} value={mutation.isPending ? "saving" : 'save'} />
            </form>
        </div>
    );

}

export default AddCardPage