import React, {memo, useState} from "react";
import {classNames, conditional} from "@/utils/styleUtils";

export interface ToastMessage {
    message:string;
    success:boolean;
    id?:number
}

type ToastProps = {
    messages:ToastMessage[];
}

const Toast = ({messages=[]}:ToastProps) => {
    return (
        <section key={messages.length} className="fixed flex bottom-48 left-0 w-screen flex-col items-center z-1">
            {messages.map((message,index)=> {
                if(!message.message) return null;
                return (
                    <ToastItem message={message.message}  success={message.success} key={message.id || index}/>
                );
            })}
        </section>
    );
};

export default memo(Toast);

const ToastItem = ({message,success}:ToastMessage) => {
    const [isMounted, setIsMounted] = useState(true);
    const UNMOUNT_DELAY_MS = 3000;

    if(isMounted) {
        setTimeout(()=>{
            setIsMounted(false);
        },UNMOUNT_DELAY_MS);
    }

    return (
        <div 
            className={classNames(
                "relative top-0 left-0 rounded-2xl py-8 px-16 text-xl my-4 max-w-[min(95%,50rem)] drop-shadow-sm",
                conditional(success, "bg-success text-background","bg-danger text-background"),
                conditional(isMounted, "toast-fade-in-up","toast-fade-out-down")
            )}
        >
            <button
                className={classNames("absolute top-1 right-4 cursor-pointer bg-none",
                    "border-none text-background text-2xl hover:scale-125")}
                onClick={()=>setIsMounted(false)}>&times;</button>
            {message}
        </div>
    );
};
