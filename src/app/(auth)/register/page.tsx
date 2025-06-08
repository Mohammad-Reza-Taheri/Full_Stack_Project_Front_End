// 'use client'
// import BackButton from '@/components/BackButton';
// import { postCategory } from '@/services/api';
// import { IAddCategory } from '@/types/type';
// import { useQueryClient, useMutation } from '@tanstack/react-query';
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form';

// const RegisterPage = () => {
//    const queryClient = useQueryClient()
//     const [disable, setDisable] = useState(false);
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm<IAddCategory>();



//     const mutation = useMutation<unknown, Error, IAddCategory>({
//         mutationFn: async (data) => {
//             try {
//                 return postCategory(data)
//             } catch (err) {
//                 console.log(err)
//             }
//         },
//         onSuccess: () => {
//             // Invalidate and refetch
//             queryClient.invalidateQueries({ queryKey: ['categories'] })
//             reset();
//             setDisable(false);
//         },
//     })
//     const onSubmit = (data: IAddCategory) => {
//         mutation.mutate(data)

//     }
//   return (
//     <div>
//      <BackButton />
//             <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-end h-1/2 w-full '>
//                 <label htmlFor='cat_name' className='text-gray-300 text-3xl mb-4 mx-6'>Enter a name for your category</label>
//                 {/* <input {...register('firstName')} /> */}
//                 <input {...register('cat_name', { required: true })}
//                     className=' text-white outline-0 text-3xl border-b-2 border-gray-500 mx-4 mb-2 px-4 py-2'
//                     placeholder='Enter a category name...' />
//                 {errors.cat_name && <p className='text-red-600 text-lg ml-4'>Last name is required.</p>}
//                 {/* <input {...register('age', { pattern: /\d+/ })} />
//             {errors.age && <p>Please enter number for age.</p>} */}
//                 <input type="submit" className='bg-slate-800 text-white text-xl font-semibold p-4 m-4 mt-10 rounded-xl' disabled={disable} value={'save'} />
//             </form>

//     </div>
//   )
// }

// export default RegisterPage

////////////////////////////////////////////

// 'use client'
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { IRegisterFormData, IRegisterResponse } from "@/types/type";
// import { postRegister } from "@/services/api";
// import { useAuthToken } from "@/hooks/useAuthToken";
// import Link from "next/link";
// import BackButton from "@/components/BackButton";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuthContext } from "@/context/AuthContext";


// const RegisterPage = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegisterFormData>();
//   const { saveToken } = useAuthToken();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { setIsLoggedIn } = useAuthContext();

//   const mutation = useMutation<IRegisterResponse, Error, IRegisterFormData>({
//     mutationFn: async (data: IRegisterFormData) => {
//       return postRegister(data)
//     },
//     onSuccess: (response: IRegisterResponse) => {
//       // const token = response.headers["Authorization"];
//       const token = response.headers["authorization"] || response.headers["Authorization"];

//       //  const token = response.headers.get("Authorization");

//       if (token) {
//         // Cookies.set("authToken", token, { expires: 7, secure: true });
//         saveToken(token)
//         reset()
//         setIsLoggedIn(true);
//         const nextRoute = searchParams?.get("next") || "/";
//         router.push(nextRoute);
//         alert("Registration successful!");
//       }


//     },
//     onError: () => {
//       alert("Registration failed. Please try again.");
//     },
//   });

//   const onSubmit = (data: IRegisterFormData) => {
//     mutation.mutate(data);
//   };

//   return (
//     <div className="register-container  h-screen min-h-svh max-h-svh ">
//       <BackButton />
//       <div className="flex flex-col items-center">
//         <h2 className="text-center text-3xl p-4 text-white font-bold">Register</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around items-center  w-full  p-4 max-w-md ">
//           <div className="w-full text-white text-xl py-2">
//             <label>Username</label>
//             <input {...register("username", { required: "Username is required" })}
//               className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
//             {errors.username && <p className="text-red-500 text-lg">{errors.username.message}</p>}
//           </div>

//           <div className="w-full text-white text-xl py-2">
//             <label>Email</label>
//             <input {...register("email", { required: "Email is required" })} type="email"
//               className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
//             {errors.email && <p className="text-red-500 text-lg">{errors.email.message}</p>}
//           </div>

//           <div className="w-full text-white text-xl py-2">
//             <label>Password</label>
//             <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} type="password"
//               className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
//             {errors.password && <p className="text-red-500 text-lg">{errors.password.message}</p>}
//           </div>

//           <button type="submit" disabled={mutation.isPending}
//             className="bg-green-500 w-full h-14 mt-6 rounded-md text-xl font-semibold hover:bg-green-700 transition">
//             {mutation.isPending ? <p>Registering...</p> : <p>Register</p>}</button>
//         </form>

//         <div className="flex flex-col items-center p-4 text-gray-300 ">
//           <p>Do you have an Account?</p>
//           <Link href={'/login'} className="text-sky-400 hover:border-b-2 border-sky-400">Login Now</Link>
//         </div>


//         {mutation.isError && <p>Error: {mutation.error?.message}</p>}
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

////////////////////////////////////////

'use client';
export const dynamic = 'force-dynamic';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { IRegisterFormData, IRegisterResponse } from "@/types/type";
import { postRegister } from "@/services/api";
import { useAuthToken } from "@/hooks/useAuthToken";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegisterFormData>();
  const { saveToken } = useAuthToken();
  // const searchParams = useSearchParams();
  const { setIsLoggedIn } = useAuthContext();
  const router = useRouter();

  const mutation = useMutation<IRegisterResponse, Error, IRegisterFormData>({
    mutationFn: async (data: IRegisterFormData) => postRegister(data),
    onSuccess: (response) => {
      const token = response?.headers?.authorization || response?.headers?.Authorization || response?.data?.token;
      
      if (token) {
        saveToken(token);
        reset();
        setIsLoggedIn(true);
        // const nextRoute = searchParams?.get("next") || "/";
        // router.push(nextRoute);
        router.push('/');
        alert("Registration successful!");
      } else {
        console.error("Token not received in response:", response);
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    },
  });

  const onSubmit = (data: IRegisterFormData) => mutation.mutate(data);

  return (
    <div className="register-container h-screen min-h-svh max-h-svh">
      <BackButton />
      <div className="flex flex-col items-center">
        <h2 className="text-center text-3xl p-4 text-white font-bold">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around items-center w-full p-4 max-w-md">
          
          <div className="w-full text-white text-xl py-2">
            <label>Username</label>
            <input {...register("username", { required: "Username is required" })} className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
            {errors.username && <p className="text-red-500 text-lg">{errors.username.message}</p>}
          </div>

          <div className="w-full text-white text-xl py-2">
            <label>Email</label>
            <input {...register("email", { required: "Email is required" })} type="email" className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
            {errors.email && <p className="text-red-500 text-lg">{errors.email.message}</p>}
          </div>

          <div className="w-full text-white text-xl py-2">
            <label>Password</label>
            <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} type="password" className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
            {errors.password && <p className="text-red-500 text-lg">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={mutation.isPending} className="bg-green-500 w-full h-14 mt-6 rounded-md text-xl font-semibold hover:bg-green-700 transition">
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex flex-col items-center p-4 text-gray-300">
          <p>Already have an account?</p>
          <Link href={'/login'} className="text-sky-400 hover:border-b-2 border-sky-400">Login Now</Link>
        </div>

        {mutation.isError && <p className="text-red-500">Error: {mutation.error?.message}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;




