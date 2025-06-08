'use client'
export const dynamic = 'force-dynamic'
// import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

// type TGlobalContext = {
//     state: string;
//     setState: React.Dispatch<React.SetStateAction<string>>
//     isChecked: boolean;
//     setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
// }
interface IGlobalContext {
    isCheckBox: boolean;
    setIsCheckBox: Dispatch<SetStateAction<boolean>>;
    isGotten: boolean;
    setIsGotten: Dispatch<SetStateAction<boolean>>;
    handleRadio(id: number): void
    selectedId: number | undefined;
    bigSelect: boolean;
    setBigSelect: Dispatch<SetStateAction<boolean>>;
    isContinue: boolean;
    setIsContinue: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

// Create the Context
const GlobalContext = createContext({} as IGlobalContext);

// export const useShoppingCartContext = () => {
//     return useContext(GlobalContext);
// }

// Create the Provider Component
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isGotten, setIsGotten] = useState(false);
    const [isCheckBox, setIsCheckBox] = useState(false); // Checkbox state
    const [bigSelect, setBigSelect] = useState(true); // Checkbox state
    const [isContinue, setIsContinue] = useState(false); // Checkbox state
    const [isOpen, setIsOpen] = useState(false); // Checkbox state



    const [selectedId, setSelectId] = useState<number>();

    const handleRadio = (id: number) => {
        if (selectedId == null) {
            setSelectId(id)
        } else {
            setSelectId((prev) => {
                if (prev == id) {
                    return prev
                } else {
                    return id
                }
            })
        }

    }

    //     const handleRadio = (id:number) => {

    // }


    return (
        // localCounter,setLocalCounter
        <GlobalContext.Provider value={{isOpen,setIsOpen, isContinue, setIsContinue, bigSelect, setBigSelect, handleRadio, selectedId, isCheckBox, setIsCheckBox, isGotten, setIsGotten }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook for Easier Access
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
