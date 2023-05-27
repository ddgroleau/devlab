import React, { HTMLInputTypeAttribute, MutableRefObject, useRef } from "react";
import {Label} from "@/components/Typography";
import {classNames} from "@/utils/styleUtils";

type AppInputProps = {
    id:string,
    label: string,
    type:HTMLInputTypeAttribute,
    value?:string|number|undefined,
    name?:string|undefined;
    placeHolder?:string|undefined,
    pattern?:string
    inputRef?:MutableRefObject<any>,
    required?:boolean,
    disabled?:boolean,
}

const AppInput = ({
    id,
    label,
    type,
    value,
    name,
    placeHolder,
    pattern,
    inputRef = undefined,
    required = false,
    disabled = false
}:AppInputProps) => {
    return (
        <Label htmlFor={id} className="flex flex-col gap-2 capitalize max-w-[12rem]">
            {label}
            <input 
                value={value} 
                id={id} 
                type={type} 
                placeholder={placeHolder} 
                name={name}
                ref={inputRef}
                min={1}
                defaultValue={1}
                max={50}
                className={classNames(
                    "font-xl border-inputBorder border rounded-xl px-4 py-2 bg-background dark:bg-dark-background",
                    "text-lg focus:outline-2 focus:outline-secondary dark:focus:outline-dark-secondary",
                    "focus-visible:outline-2 focus-visible:outline-secondary",
                    "dark:focus-visible:outline-dark-secondary dark:text-dark-secondary",
                    "active:outline-2 active:outline-secondary dark:active:outline-dark-secondary transition-none"
                )}
                style={{ width: inputRef?.current ? 
                    `calc(5rem + ${inputRef.current.value.length}rem)` : "5rem" }} 
                pattern={pattern}
                required={required}
                disabled={disabled}   
            />
        </Label>
    );
};

export default AppInput;