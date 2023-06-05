import React from "react";

const Loading = () => {
    return (
        <section className="flex flex-col w-full items-center gap-8 my-8">
            <span className="h-16 w-32 animate-pulse bg-secondary opacity-10 rounded-2xl"></span>
            <span className="h-32 w-64 animate-pulse bg-secondary opacity-10 rounded-2xl"></span>
        </section>
    );
};

export default Loading;