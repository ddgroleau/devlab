import React from "react";
import NameLogo from "@/components/NameLogo";

const Loading = () => {
    return (
        <div className="gap-8 flex flex-col justify-center items-center delay-0">
            <div className="[&>*]:relative mt-48">
                <NameLogo />
            </div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;