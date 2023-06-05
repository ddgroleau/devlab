import React from "react";
import {H1, HR } from "@/components/Typography";

const Loading = () => {
    return (
        <div>
            <section>
                <H1>Your Questions</H1>
                <div className='flex gap-8 flex-row flex-wrap mb-4'>
                    <span className="h-16 w-32 animate-pulse bg-secondary opacity-10 rounded-2xl"></span>
                    <span className="h-16 w-32 animate-pulse bg-secondary opacity-10 rounded-2xl"></span>
                    <span className="h-16 w-32 animate-pulse bg-secondary opacity-10 rounded-2xl"></span>
                </div>
                <HR/>
            </section>
            <section className="h-[30rem] w-[max(90%,60rem)] animate-pulse bg-secondary opacity-10 rounded-2xl mt-4">
            </section>
        </div>
    );
};

export default Loading;