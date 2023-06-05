/* eslint-disable no-unused-vars */
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
            styles.containerClass = "border border-success delay-500";
            break;
        case QuestionResponseState.CORRECT_ACTIVE :
            styles.containerClass = "border border-success";
            break;
        case QuestionResponseState.INCORRECT :
            styles.containerClass = "border border-danger";
            break;
        default:
            styles.containerClass =
                "hover:bg-accent hover:text-itemSelected";
            break;
        }
        return styles;
    };

    const styles = applyStateStyles(state);

    return (
        <div className={classNames(
            "opacity-100",
            conditional(
                state === QuestionResponseState.ANSWERED || state === QuestionResponseState.CORRECT_INACTIVE,
                "opacity-40"))}
        >
            {(state === QuestionResponseState.CORRECT_ACTIVE || state === QuestionResponseState.CORRECT_INACTIVE) 
                &&  <div className={classNames("opacity-0",conditional(
                    state === QuestionResponseState.CORRECT_INACTIVE,
                    "fade-in",
                    "opacity-100"
                ))}>
                    <CircleCheck
                        style={styles.iconStyle}
                  
                    />
                </div>}
            {state === QuestionResponseState.INCORRECT && <CircleX style={styles.iconStyle}/>}
            <button 
                onClick={onClick} 
                className={classNames(
                    "rounded-2xl py-2 px-4",
                    "min-w-[8rem] max-w-[18rem] h-full text-secondary dark:text-dark-secondary lowercase",
                    "border border-secondary dark:border-dark-secondary",
                    styles.containerClass
                )}
                disabled={state !== QuestionResponseState.UNANSWERED}
            >
                {text}
            </button>
        </div>
    );
};
