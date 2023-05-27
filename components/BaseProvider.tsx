"use client";
import React, {ReactNode, useEffect, useRef} from "react";
import Toast from "@/components/Toast";
import {useRouter, useSearchParams} from "next/navigation";

const BaseProvider = ({children}:{children:ReactNode}) => {
    const searchParams = useSearchParams();
    const error = useRef(searchParams.get("error"));

    useEffect(()=> {
        if(searchParams.get("error")) {
            error.current = searchParams.get("error");
        }
    },[searchParams]);

    return (
        <div>
            {children}
            <Toast messages={!error.current ? [] : [{success:!error.current, message:error.current, id: 1}]}/>
        </div>
    );
};

export default BaseProvider;