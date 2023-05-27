import SelectOption from "@/models/SelectOption";
import React, { MutableRefObject, useRef } from "react";
import {Label} from "@/components/Typography";
import {classNames} from "@/utils/styleUtils";

type AppSelectProps = {
    id:string,
    label: string,
    options:SelectOption[]
    value?:string|number|undefined,
    name?:string|undefined;
    defaultOption?: SelectOption,
    selectRef?:MutableRefObject<any>|undefined,
    required?:boolean,
    disabled?:boolean,
}

const AppSelect = ({
    id,
    label,
    options,
    value,
    name,
    selectRef = undefined,
    defaultOption = undefined,
    required = false,
    disabled = false
}:AppSelectProps
) => {
    return (
        <Label htmlFor={id} className="flex flex-col gap-2 capitalize">
            {label}
            <div className={classNames("relative after:content-['‹'] after:-rotate-90 after:text-4xl",
                "after:absolute after:pointer-events-none after:-ml-8 after:mt-1 after:text-dark-secondary"
            )}>
                <select 
                    value={value} 
                    id={id} 
                    ref={selectRef}
                    name={name}
                    required={required}
                    disabled={disabled}
                    className={classNames(
                        "font-xl border border-inputBorder dark:border-dark-inputBorder rounded-xl",
                        "pt-2 pr-12 pb-2 pl-4 dark:text-dark-secondary",
                        "bg-background dark:bg-dark-background",
                        "focus:outline-2 focus:outline-secondary dark:focus:outline-dark-secondary",
                        "focus:text-itemSelected appearance-none lowercase"
                    )}
                >
                    {defaultOption && 
                        <option value={defaultOption?.value} className="focus:bg-accent">
                            {defaultOption?.innerText}
                        </option>}
                    {options.map((option,index)=> 
                        <option 
                            key={index} 
                            value={option.value}
                            className="focus:bg-accent"
                        >
                            {option.innerText}
                        </option>)}
                </select>
            </div>
        </Label>
    );
};

export default AppSelect;