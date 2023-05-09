import React, { MouseEventHandler } from 'react';
import CircleCheck from './CircleCheck';
import CircleX from './CircleX';

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
            styles.containerClass = "answered";
            break;
        case QuestionResponseState.CORRECT_INACTIVE :
            styles.containerClass = "correct-inactive";
            break;
        case QuestionResponseState.CORRECT_ACTIVE :
            styles.containerClass = "correct-active";
            break;
        case QuestionResponseState.INCORRECT :
            styles.containerClass = "incorrect";
            break;
        default:
            styles.containerClass = "unanswered";
            break;
        }
        return styles;
    };

    const styles = applyStateStyles(state);

    return (
        <div>
            {(state === QuestionResponseState.CORRECT_ACTIVE || state === QuestionResponseState.CORRECT_INACTIVE) 
                && <CircleCheck style={styles.iconStyle}/>}
            {state === QuestionResponseState.INCORRECT && <CircleX style={styles.iconStyle}/>}
            <button 
                onClick={onClick} 
                className={styles.containerClass} 
                disabled={state !== QuestionResponseState.UNANSWERED}
            >
                {text}
            </button>
            <style jsx>
                {`
                    button {
                        border: solid var(--secondary) 1px;
                        border-radius: 30px;
                        padding: 0.5rem 1rem;
                        min-width: 8rem;
                        display:block;
                        color: var(--secondary);
                        text-transform: lowercase;
                    }
                    .unanswered:hover {
                        background: var(--accent);
                        color: var(--itemSelected);
                    }
                    .answered {
                        opacity: .4;
                    }
                    .correct-inactive {
                        opacity: .4;
                        border: solid var(--success) 1px;
                        transition: all 0s;
                    }
                    .correct-active {
                        border: solid var(--success) 2px;
                    }
                    .incorrect {
                        border: solid var(--failure) 2px;
                    }
                `}
            </style>
        </div>
    );
};
