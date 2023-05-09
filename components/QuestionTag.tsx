import React, { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';

type QuestionTagProps = {
    value:string
    innerText:string, 
    selectedTags:string[],
    setSelectedTags:Dispatch<SetStateAction<string[]>>,
}

const QuestionTag = ({value,innerText,selectedTags,setSelectedTags}:QuestionTagProps) => {
    const handleClick = () => {
        !selectedTags.includes(value) ? setSelectedTags(tags => [...tags,value]) :
            setSelectedTags(tags => [...tags.filter(tag=> tag !== value)]);
    };
    return (
        <>
            <button
                type="button"
                className={!selectedTags.includes(value) ? 'tag-unselected' : 'tag-selected'}
                key={value}
                onClick={handleClick}
            >
            + {innerText}
            </button>
            <style jsx>
                {`
                button {
                    border: solid var(--inputBorder) 2px;
                    border-radius: 12px;
                    padding: 0.5rem 1rem;
                    text-transform: lowercase;
                    font-size: 1rem;
                }
                button:hover, button:active {
                    background: var(--accent);
                }
                .tag-unselected {
                    background: var(--background);
                }
                .tag-selected {
                    background: var(--accent);
                    border: solid var(--secondary) 2px;
                    color: var(--itemSelected);
                }
            `}
            </style>
        </>
    );
};

export default QuestionTag;