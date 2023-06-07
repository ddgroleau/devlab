import React, {HTMLInputTypeAttribute, MutableRefObject} from "react";
import {Label} from "@/components/Typography";
import {classNames} from "@/utils/styleUtils";

type AppCheckboxProps = {
    id:string,
    label: string,
    type:HTMLInputTypeAttribute,
    checked?:boolean,
    name?:string|undefined;
    placeHolder?:string|undefined,
    inputRef?:MutableRefObject<HTMLInputElement>,
    required?:boolean,
    disabled?:boolean,
}

const AppCheckbox = ({
    id,
    label,
    type,
    checked,
    name,
    inputRef,
    required,
    disabled,
}:AppCheckboxProps) => {
    return (
        <Label htmlFor={id} className="text-md text-secondary dark:text-dark-secondary flex items-center gap-2">
            <input
                checked={checked}
                id={id}
                type={type}
                name={name}
                ref={inputRef}
                className={classNames(
                    "border-inputBorder border rounded-xl py-2 cursor-pointer h-5 w-5",
                    "focus-visible:outline-2 focus-visible:outline-secondary",
                    "dark:focus-visible:outline-dark-secondary dark:text-dark-secondary",
                    "active:outline-2 active:outline-secondary dark:active:outline-dark-secondary transition-none"
                )}
                required={required}
                disabled={disabled}
            />
            {label}
        </Label>
    );
};

export default AppCheckbox;