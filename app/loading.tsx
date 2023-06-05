import React from "react";
import NameLogo from "@/components/NameLogo";

const Loading = () => {
    return (
        <div className="h-full w-full gap-8 -mt-16 flex flex-col justify-center items-center">
            <div className="[&>*]:relative">
                <NameLogo />
            </div>
            Loading...
        </div>
    );
};

export default Loading;