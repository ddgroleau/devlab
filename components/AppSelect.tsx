import SelectOption from '@/models/SelectOption';
import React, { MutableRefObject, useRef } from 'react';

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
        <>
            <label htmlFor={id}>{label}
                <div className="select-wrapper">
                    <select 
                        value={value} 
                        id={id} 
                        ref={selectRef}
                        name={name}
                        required={required}
                        disabled={disabled}   
                    >
                        {defaultOption && 
                        <option value={defaultOption?.value}>
                            {defaultOption?.innerText}
                        </option>}
                        {options.map((option,index)=> 
                            <option 
                                key={index} 
                                value={option.value}
                            >
                                {option.innerText}
                            </option>)}
                    </select>
                </div>
            </label>
            <style jsx>
                {`
                    label {
                        display: flex;
                        flex-direction: column;
                        gap: 0.25rem;
                        text-transform: capitalize;
                    }
                    .select-wrapper {
                        position: relative;
                    }
                    .select-wrapper::after {
                        content: "‹";
                        transform: rotate(270deg);
                        font-size: 2rem;
                        position: absolute;
                        pointer-events: none;
                        margin-left: -2rem;
                    }
                    select {
                        border: solid var(--inputBorder) 1px;
                        border-radius: 12px;
                        padding: 0.5rem 3rem 0.5rem 1rem;
                        background: var(--background);
                        -webkit-appearance: none;
                        appearance: none;
                        transition: 0s;
                    }
                    select:focus {
                        outline: solid var(--secondary) 2px;
                        color: var(--itemSelected);
                    }
                    select, option {
                        text-transform: lowercase;
                    }
                    option:focus {
                        background: var(--accent);
                    }
                `}
            </style>
        </>
    );
};

export default AppSelect;