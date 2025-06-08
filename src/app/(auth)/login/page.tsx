// 'use client'
// import { useForm } from "react-hook-form";
// import { ILoginFormData, ILoginResponse } from "@/types/type";
// // import { useLogin } from "@/hooks/useLogin";
// import Link from "next/link";
// import BackButton from "@/components/BackButton";
// import { useAuthToken } from "@/hooks/useAuthToken";
// import { useRouter } from "next/router";
// import { useSearchParams } from "next/navigation";
// import { useAuthContext } from "@/context/AuthContext";
// import { useMutation } from "@tanstack/react-query";
// import { postLogin } from "@/services/api";

// const LoginPage = () => {
//     // const { mutation } = useLogin()
//     const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>();

//      const { saveToken } = useAuthToken();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const { setIsLoggedIn } = useAuthContext();

//     const mutation = useMutation<ILoginResponse, Error, ILoginFormData>({
//         mutationFn: async (data: ILoginFormData) => {
//             return postLogin(data)
//         },
//         onSuccess: (response) => {
//             const token = response.headers["authorization"] || response.headers["Authorization"];
//             saveToken(token)
//             const nextRoute = searchParams?.get("next") || "/";
//             setIsLoggedIn(true)
//             router.push(nextRoute);
//         },
//         onError: () => {
//             alert("Login failed. Please check your credentials.");
//         },
//     });


//     //   const mutation = useMutation<ILoginResponse, Error, ILoginFormData>({
//     //     mutationFn: async (data: ILoginFormData) => {
//     //       // const response = await axios.post("/api/register", data);
//     //       // return response.data;

//     //       return postLogin(data)

//     //     },
//     //     onSuccess: (response: ILoginResponse) => {
//     //       // const token = response.headers["Authorization"];
//     //       const token = response.headers["authorization"] || response.headers["Authorization"];
//     //       console.log("token" + token)
//     //       //  const token = response.headers.get("Authorization");

//     //       if (token) {
//     //         // Cookies.set("authToken", token, { expires: 7, secure: true });
//     //         saveToken(token)
//     //         reset()
//     //         alert("Registration successful!");
//     //       }


//     //     },
//     //     onError: () => {
//     //       alert("Registration failed. Please try again.");
//     //     },
//     //   });

//     const onSubmit = (data: ILoginFormData) => {
//         mutation.mutate(data);
//     };

//     return (
//         // <div className="register-container">
//         //   <h2>Register</h2>
//         //   <form onSubmit={handleSubmit(onSubmit)} className="bg-white">

//         //     <div>
//         //       <label>Email</label>
//         //       <input {...register("email", { required: "Email is required" })} type="email" className="bg-gray-400" />
//         //       {errors.email && <p>{errors.email.message}</p>}
//         //     </div>

//         //     <div>
//         //       <label>Password</label>
//         //       <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} type="password"
//         //         className="bg-gray-400" />
//         //       {errors.password && <p>{errors.password.message}</p>}
//         //     </div>

//         //     <button type="submit" disabled={mutation.isPending} className="bg-green-400">{mutation.isPending ? <p>Registering...</p> : <p>Register</p>}</button>
//         //   </form>


//         //   {mutation.isError && <p>Error: {mutation.error?.message}</p>}
//         // </div>




//         <div className="login-container  h-screen min-h-svh max-h-svh ">
//             <BackButton />
//            <div className="flex flex-col items-center">
//              <h2 className="text-center text-3xl p-4 text-white font-bold">Login</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around items-center  w-full  p-4 max-w-md ">
//                 <div className="w-full text-white text-xl py-2">
//                     <label >Email</label>
//                     <input {...register("email", { required: "Email is required" })} type="email"
//                      className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
//                     {errors.email && <p className="text-red-500 text-lg">{errors.email.message}</p>}
//                 </div>

//                 <div className="w-full text-white text-xl py-2">
//                     <label>Password</label>
//                     <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} type="password"
//                         className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
//                     {errors.password && <p className="text-red-500 text-lg">{errors.password.message}</p>}
//                 </div>

//                 <button type="submit" disabled={mutation.isPending} className="bg-green-500 w-full h-14 mt-6 rounded-md text-xl font-semibold hover:bg-green-700 transition">{mutation.isPending ? "Logging in..." : "Login"}</button>
//             </form>
//            <div className="flex flex-col items-center p-4 text-gray-300 ">
//              <p>Do you want to create a new Account?</p>
//             <Link href={'/register'} className="text-sky-400 hover:border-b-2 border-sky-400">Register Now</Link>
//            </div>

//             {mutation.isError && <p className="text-red-500">Error: {mutation.error?.message}</p>}
//            </div>
//         </div>
//     )
// }

// export default LoginPage

//////////////////////////////////////
'use client';
export const dynamic = 'force-dynamic';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ILoginFormData, ILoginResponse } from "@/types/type";
import { postLogin } from "@/services/api";
import { useAuthToken } from "@/hooks/useAuthToken";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation"; // Fixed import issue
// import { useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>();
    const { saveToken } = useAuthToken();
    const router = useRouter();
    // const searchParams = useSearchParams();
    const { setIsLoggedIn } = useAuthContext();

    const mutation = useMutation<ILoginResponse, Error, ILoginFormData>({
        mutationFn: async (data: ILoginFormData) => postLogin(data),
        onSuccess: (response) => {
            const token = response?.headers?.authorization || response?.headers?.Authorization || response?.data?.token;
            
            if (token) {
                saveToken(token);
                setIsLoggedIn(true);
                // const nextRoute = searchParams?.get("next") || "/";
                // router.push(nextRoute);
                router.push('/');
            } else {
                console.error("Token not received in response:", response);
            }
        },
        onError: (error) => {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        },
    });

    const onSubmit = (data: ILoginFormData) => mutation.mutate(data);

    return (
        <div className="login-container h-screen min-h-svh max-h-svh">
            <BackButton />
            <div className="flex flex-col items-center">
                <h2 className="text-center text-3xl p-4 text-white font-bold">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around items-center w-full p-4 max-w-md">
                    <div className="w-full text-white text-xl py-2">
                        <label>Email</label>
                        <input {...register("email", { required: "Email is required" })} type="email"
                            className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
                        {errors.email && <p className="text-red-500 text-lg">{errors.email.message}</p>}
                    </div>

                    <div className="w-full text-white text-xl py-2">
                        <label>Password</label>
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} type="password"
                            className="bg-gray-400 w-full h-12 rounded-md p-2 outline-white text-black font-medium" />
                        {errors.password && <p className="text-red-500 text-lg">{errors.password.message}</p>}
                    </div>

                    <button type="submit" disabled={mutation.isPending} className="bg-green-500 w-full h-14 mt-6 rounded-md text-xl font-semibold hover:bg-green-700 transition">
                        {mutation.isPending ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="flex flex-col items-center p-4 text-gray-300">
                    <p>Do you want to create a new Account?</p>
                    <Link href={'/register'} className="text-sky-400 hover:border-b-2 border-sky-400">Register Now</Link>
                </div>

                {mutation.isError && <p className="text-red-500">Error: {mutation.error?.message}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
































// import { useLogin } from "../hooks/useLogin";
// import { useForm } from "react-hook-form";

// const LoginPage = () => {
// ;
//   const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();

//   const onSubmit = (data: { email: string; password: string }) => {
//     mutation.mutate(data);
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Email</label>
//           <input {...register("email", { required: "Email is required" })} type="email" />
//           {errors.email && <p>{errors.email.message}</p>}
//         </div>

//         <div>
//           <label>Password</label>
//           <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} type="password" />
//           {errors.password && <p>{errors.password.message}</p>}
//         </div>

//         <button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Logging in..." : "Login"}</button>
//       </form>

//       {mutation.isError && <p>Error: {mutation.error?.message}</p>}
//     </div>
//   );
// };

// export default LoginPage;




