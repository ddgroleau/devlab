import React, { useState } from 'react';

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
        <section key={messages.length} className={"toast-container"}>
            {messages.map((message,index)=> {
                return (
                    <ToastItem message={message.message}  success={message.success} key={message.id || index}/>
                );
            })}
        </section>
    );
};

export default Toast;

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
            className={`
            ${"toast-message"} 
            ${success ? "toast-success" : "toast-error"} 
            ${isMounted ? "toast-fade-in-up" : "toast-fade-out-down"}
            `}
        >
            <button className="toast-close" onClick={()=>setIsMounted(false)}>&times;</button>
            {message}
        </div>
    );
};