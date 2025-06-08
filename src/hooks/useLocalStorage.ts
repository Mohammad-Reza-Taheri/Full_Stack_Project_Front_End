// import { useEffect, useState } from "react"

// export function useLocalStorage<T>(key: string, initialValue: T) {

//     const [value, setValue] = useState<T>(() => {
//         const localCart = localStorage.getItem(key);

//         if (localCart != null) {
//             return JSON.parse(localCart)
//         } else {
//             return initialValue;
//         }
//     })

//     useEffect(() => {

//         localStorage.setItem(key, JSON.stringify(value))
//     }, [key, value])


//     return [value, setValue] as [typeof value, typeof setValue]



// }


//fixed version
'use client'

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            // if (!key) return initialValue


            const storedValue = localStorage.getItem(key) || null;
            return storedValue !== null ? JSON.parse(storedValue) as T : initialValue;



        } catch (error) {
            console.error("Failed to parse localStorage item:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Failed to set localStorage item:", error);
        }
    }, [key, value]);

    return [value, setValue] as const;
}