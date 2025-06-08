'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

import { postVerifyUser } from "@/services/api";
import { useAuthToken } from "@/hooks/useAuthToken";

interface IAuthContext {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { removeToken } = useAuthToken();


    // useEffect(() => {
    //     const verifyUser = async () => {
    //     // const token = Cookies.get("authToken");
    //     if (!token) {
    //         setIsLoggedIn(false);
    //         return;
    //     }

    //     const response = await postVerifyUser(token);

    //     setIsLoggedIn(response.isValid);
    // };

    //     verifyUser();
    // }, []);


    ////////////////////////////////////////////
    // useEffect(() => {


    //     try {
    //         const verifyUser = async () => {
    //             const response = await postVerifyUser();
    //             setIsLoggedIn(response.isValid);
    //             if (response.isValid === false) {
    //                 removeToken();
    //             }
    //             console.log("User verification response:", response);
    //         };
    //         verifyUser();
    //     } catch (error) {
    //         console.error("Error verifying user:", error);
    //     }


    // }, []);
    ///////////////////////////////////
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await postVerifyUser();
                if (response) {
                    setIsLoggedIn(response.isValid);
                    if (!response.isValid) {
                        removeToken();
                    }
                } else {
                    setIsLoggedIn(false)
                }
                //  else {
                //     removeToken();
                // }
                // console.log("User verification response:", response);
            } catch (error) {
                console.error("Error verifying user:", error);
            }
        };

        verifyUser();
    }, [removeToken]); // Add dependencies


    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);