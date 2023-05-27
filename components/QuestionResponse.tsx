import React, { MouseEventHandler } from "react";
import CircleCheck from "./CircleCheck";
import CircleX from "./CircleX";
import {classNames, conditional} from "@/utils/styleUtils";

type QuestionResponseProps = {
    text:string, 
    state: QuestionResponseState
    onClick: MouseEventHandler<HTMLButtonElement>
}

export enum QuestionResponseState {
    UNANSWERED,
    ANSWERED,
    CORRECT_ACTIVE,
    CORRECT_INACTIVE,
    INCORRECT
}

export default function QuestionResponse({text,state,onClick}:QuestionResponseProps) {
    
    const applyStateStyles = (state:QuestionResponseState) : { iconStyle:object, containerClass: string} => {
        let styles = { 
            iconStyle: { 
                position: "absolute", 
                marginTop: "-1rem", 
                marginLeft: "-.7rem",
            },
            containerClass: "" 
        };
        switch(state) {
        case QuestionResponseState.ANSWERED :
            styles.containerClass = "border border-secondary dark:border-dark-secondary";
            break;
        case QuestionResponseState.CORRECT_INACTIVE :
            styles.containerClass = "border border-success";
            break;
        case QuestionResponseState.CORRECT_ACTIVE :
            styles.containerClass = "border border-success";
            break;
        case QuestionResponseState.INCORRECT :
            styles.containerClass = "border border-danger";
            break;
        default:
            styles.containerClass =
                "border border-secondary dark:border-dark-secondary  hover:bg-accent hover:text-itemSelected";
            break;
        }
        return styles;
    };

    const styles = applyStateStyles(state);

    return (
        <div 
            className={conditional(
                state === QuestionResponseState.ANSWERED || state === QuestionResponseState.CORRECT_INACTIVE,
                "opacity-40")
            }
        >
            {(state === QuestionResponseState.CORRECT_ACTIVE || state === QuestionResponseState.CORRECT_INACTIVE) 
                && <CircleCheck style={styles.iconStyle}/>}
            {state === QuestionResponseState.INCORRECT && <CircleX style={styles.iconStyle}/>}
            <button 
                onClick={onClick} 
                className={classNames(
                    "rounded-2xl py-2 px-4",
                    "min-w-[8rem] text-secondary dark:text-dark-secondary lowercase",
                    styles.containerClass
                )}
                disabled={state !== QuestionResponseState.UNANSWERED}
            >
                {text}
            </button>
        </div>
    );
};
