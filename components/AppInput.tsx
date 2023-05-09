import React, { HTMLInputTypeAttribute, MutableRefObject, useRef } from 'react';

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
        <>
            <label htmlFor={id}>{label}
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
                    style={{ width: inputRef?.current ? 
                        `calc(5rem + ${inputRef.current.value.length}rem)` : "5rem" }} 
                    pattern={pattern}
                    required={required}
                    disabled={disabled}   
                />
            </label>
            <style jsx>
                {`
                    label {
                        display: flex;
                        flex-direction: column;
                        gap: 0.25rem;
                        text-transform: capitalize;
                        max-width: 12rem;
                    }
                    input {
                        border: solid var(--inputBorder) 1px;
                        border-radius: 12px;
                        padding: 0.5rem 1rem;
                        background: var(--background);
                        transition: 0s;
                    }
                    input:focus, input:active, input:focus-visible {
                        outline: solid var(--secondary) 2px;
                        color: var(--itemSelected);
                    }
                `}
            </style>
        </>
    );
};

export default AppInput;