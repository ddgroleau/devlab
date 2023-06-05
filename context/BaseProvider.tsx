"use client";
/* eslint-disable no-unused-vars */
import React, {createContext, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import Toast, {ToastMessage} from "@/components/Toast";
import {useSearchParams} from "next/navigation";

type BaseContext = {
    theme:string|undefined,
    setColorMode: (theme:string)=>void
    setToasts:React.Dispatch<SetStateAction<ToastMessage[]>>
}

export const BaseContext =
    createContext({theme:"light",setColorMode:(theme:string)=> { },
        setToasts:()=>{}} as BaseContext);

const BaseProvider = ({children}:{children:ReactNode}) => {
    const searchParams = useSearchParams();
    const error = useRef(searchParams.get("error"));
    const [theme, setTheme] = useState<string|undefined>(undefined);
    const [toasts,setToasts] = useState<ToastMessage[]>([]);

    const setColorMode = (theme:string) => {
        document.documentElement.setAttribute("class",theme);
        localStorage.setItem("theme",theme);
        setTheme(theme);
    };

    useEffect(()=> {
        if(searchParams.get("error")) {
            error.current = searchParams.get("error");
            setToasts(!error.current ? [] : [{success:!error.current, message:error.current, id:Date.now()}]);
        }
        setColorMode(localStorage.getItem("theme") || "light");
    },[searchParams]);

    return (
        <BaseContext.Provider value={{theme,setColorMode,setToasts}}>
            {children}
            <Toast messages={toasts}/>
        </BaseContext.Provider>
    );
};

export default BaseProvider;