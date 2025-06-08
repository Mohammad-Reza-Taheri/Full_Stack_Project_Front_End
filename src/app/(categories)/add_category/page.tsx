'use client'
export const dynamic = 'force-dynamic';
import BackButton from '@/components/BackButton';
import { postCategory } from '@/services/api';
import { IAddCategory } from '@/types/type';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';


const AddCategoryPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IAddCategory>();



    const mutation = useMutation<unknown, Error, IAddCategory>({
        mutationFn: async (data) => {
            try {
                return postCategory(data)

                // const response = await fetch('http://localhost:5000/api/categories', {
                // const response = await fetch('https://fullstackproject-production.up.railway.app/api/categories', {
                // const response = await fetch('http://localhost:3000/api/categories', {
                // const response = await fetch('https://ankibro.liara.run/api/categories', {

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
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            reset();
            router.push('/')
        },
    })
    const onSubmit = (data: IAddCategory) => {
        mutation.mutate(data)

    }

    return (
        <div className='h-screen min-h-svh max-h-svh text-white '>
            <BackButton />
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-end h-1/2 w-full '>
                <label htmlFor='cat_name' className='text-gray-300 text-3xl mb-4 mx-6'>Enter a name for your category</label>
                {/* <input {...register('firstName')} /> */}
                <input {...register('cat_name', { required: true })}
                    className=' text-white outline-0 text-3xl border-b-2 border-gray-500 mx-4 mb-2 px-4 py-2'
                    placeholder='Enter a category name...' />
                {errors.cat_name && <p className='text-red-600 text-lg ml-4'>Last name is required.</p>}
                {/* <input {...register('age', { pattern: /\d+/ })} />
            {errors.age && <p>Please enter number for age.</p>} */}
                <input type="submit" className='bg-slate-800 text-white text-xl font-semibold p-4 m-4 mt-10 rounded-xl'
                    disabled={mutation.isPending} value={mutation.isPending ? 'saving' : 'save'} />
            </form>
        </div>
    );

}

export default AddCategoryPage


// import React from 'react'

// const AddCategoryPage = () => {
//   return (
//     <div>AddCategoryPage</div>
//   )
// }

// export default AddCategoryPage