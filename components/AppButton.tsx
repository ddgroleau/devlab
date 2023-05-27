import React, { MouseEventHandler, MutableRefObject } from "react";
import {classNames} from "@/utils/styleUtils";

type AppButtonProps = {
    children: string,
    type: "button"|"submit"|"reset"|undefined,
    btnRef?:MutableRefObject<any>,
    onClick: MouseEventHandler<HTMLButtonElement>|undefined
}

const AppButton = ({children, type, btnRef, onClick}:AppButtonProps) => {
    return (
        <button
            ref={btnRef}
            type={type}
            onClick={onClick}
            className={classNames(
                "text-2xl border-2 rounded-xl px-4 py-2 lowercase border-primary dark:border-dark-primary",
                "text-primary dark:text-dark-primary",
                "hover:bg-accent  hover:text-itemSelected focus:bg-accent focus:text-itemSelected"
            )}
        >
            {children}
        </button>
    );
};

export default AppButton;