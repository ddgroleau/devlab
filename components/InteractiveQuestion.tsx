import React from "react";
import {HR, P, Span} from "@/components/Typography";
import QuestionResponse, {QuestionResponseState} from "@/components/QuestionResponse";
import Question from "@/models/Question";

type InteractiveQuestionProps = {
    index:number,
    question:Question
    // eslint-disable-next-line no-unused-vars
    handleClick: (question:Question,recordedAnswer:string) => void
}
const InteractiveQuestion = ({index,question,handleClick}:InteractiveQuestionProps) => {
    const determineQuestionResponseState = (question:Question,recordedAnswer:string):QuestionResponseState => {
        return question.questionResponseStates.filter(s=>s.possibleAnswer=== recordedAnswer)[0]?.answerState
            || QuestionResponseState.UNANSWERED;
    };

    return (
        <div key={index} className="mt-4">
            <P className="text-lg">{index+1}) {question.questionText}</P>
            <Span className="pl-4">Choose an answer below:</Span>
            <div className="flex gap-4 flex-row flex-wrap mx-4 my-6">
                {question.answerOptions.map((recordedAnswer,index)=> {
                    return (
                        <QuestionResponse
                            key={index}
                            text={recordedAnswer}
                            state={determineQuestionResponseState(question,recordedAnswer)}
                            onClick={()=>handleClick(question,recordedAnswer)}
                        />
                    );
                })}
            </div>
            <div className="flex gap-4 opacity-70 mx-4 mb-4">
                <Span className="text-[1rem]">
                    <strong>difficulty:</strong> {question.difficulty.displayText}
                </Span>
                <Span className="text-[1rem]">
                    <strong>category:</strong> {question.category.displayText}
                </Span>
            </div>
            <HR/>
        </div>
    );
};

export default InteractiveQuestion;