'use client'
import { useMutation } from "@tanstack/react-query";
import { useAuthToken } from "../hooks/useAuthToken"; // Reuse your token handling hook
import { postLogin } from "@/services/api";
import { ILoginFormData, ILoginResponse } from "@/types/type";
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from "@/context/AuthContext";
// type LoginFormData = {
//   email: string;
//   password: string;
// };

// type LoginResponse = {
//   message: string;
//   token: string;
// };

export const useLogin = () => {
    const { saveToken } = useAuthToken();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setIsLoggedIn } = useAuthContext();

    const mutation = useMutation<ILoginResponse, Error, ILoginFormData>({
        mutationFn: async (data: ILoginFormData) => {
            return postLogin(data)
        },
        onSuccess: (response) => {
            const token = response.headers["authorization"] || response.headers["Authorization"];
            saveToken(token)
            const nextRoute = searchParams?.get("next") || "/";
            setIsLoggedIn(true)
            router.push(nextRoute);
        },
        onError: () => {
            alert("Login failed. Please check your credentials.");
        },
    });

    return { mutation };
};