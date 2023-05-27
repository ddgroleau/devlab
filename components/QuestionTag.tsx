import React, { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import {classNames, conditional} from "@/utils/styleUtils";

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
        <button
            type="button"
            className={classNames(
                conditional(!selectedTags.includes(value),
                    "bg-background dark:bg-dark-background",
                    "bg-accent border-2 border-secondary dark:border-dark-secondary text-itemSelected"),
                "border-2 border-inputBorder rounded-xl px-4 py-2 lowercase hover:bg-accent",
            )}
            key={value}
            onClick={handleClick}
        >
     + {innerText}
        </button>
    );
};

export default QuestionTag;