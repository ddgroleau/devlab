import React, { MouseEventHandler, MutableRefObject } from 'react';

type AppButtonProps = {
    children: string,
    type: "button"|"submit"|"reset"|undefined,
    btnRef?:MutableRefObject<any>,
    onClick: MouseEventHandler<HTMLButtonElement>|undefined
}



const AppButton = ({children, type, btnRef, onClick}:AppButtonProps) => {

    return (
        <>
            <button
                ref={btnRef}
                type={type}
                onClick={onClick}
            >
                {children}
            </button>

            <style jsx>
                {`
                    button {
                        border: solid var(--primary) 2px;
                        border-radius: 12px;
                        padding: 0.5rem 1rem;
                        text-transform: lowercase
                    }
                    button:hover, button:focus {
                        background: var(--accent);
                        color: var(--itemSelected);
                    }
                `}
            </style>
        </>
    );
};

export default AppButton;