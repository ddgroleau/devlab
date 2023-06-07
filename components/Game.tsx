"use client";

import AppButton from "@/components/AppButton";
import { QuestionResponseState } from "@/components/QuestionResponse";
import Question from "@/models/Question";
import { useRouter } from "next/navigation";
import React, {useContext, useState} from "react";
import {H1, HR, Span} from "@/components/Typography";
import {ServerResponses} from "@/models/ServerResponses";
import InteractiveQuestion from "@/components/InteractiveQuestion";
import {BaseContext} from "@/context/BaseProvider";

export interface GameRouteParams {
    difficulty?:string,
    tags?:string,
    categories?:string,
    questionCount?:string
}

const Game = ({questions,query}:{questions:Question[],query:GameRouteParams}) => {
    const {setToasts} = useContext(BaseContext);
    const router = useRouter();
    const [allQuestions,setAllQuestions] = useState<Question[]>(
        [...questions.map(q =>
            Question.create(q.id,q.questionText, q.correctAnswer,q.answerOptions,q.category,q.difficulty))]);
    const [correctAnswerCount,setCorrectAnswerCount] = useState<number>(0);
    const [questionsCompleted,setQuestionsCompleted] = useState<Question[]>([]);

    const handleCalculateScore = () => {
        if(questionsCompleted.length !== allQuestions.length) {
            return setToasts([{success:false,message:ServerResponses.IncompleteQuestions}]);
        } else {
            router.push(`/score?correct=${correctAnswerCount}&total=${allQuestions.length}`);
        }
    };

    const handleQuestionResponseClick = (question:Question,recordedAnswer:string) => {
        question.recordedAnswer = recordedAnswer;
        question.questionResponseStates = [
            {
                possibleAnswer: question.correctAnswer,
                answerState: recordedAnswer === question.correctAnswer ?
                    QuestionResponseState.CORRECT_ACTIVE :
                    QuestionResponseState.CORRECT_INACTIVE
            },

            recordedAnswer !== question.correctAnswer ?
                {
                    possibleAnswer: recordedAnswer,
                    answerState: QuestionResponseState.INCORRECT
                } :
                {
                    possibleAnswer: recordedAnswer,
                    answerState: QuestionResponseState.CORRECT_ACTIVE
                },

            ...question.answerOptions.filter(
                answer => answer !== recordedAnswer
                    && answer !== question.correctAnswer
            ).map(answer => {
                return {
                    possibleAnswer: answer,
                    answerState: QuestionResponseState.ANSWERED
                };
            })

        ];

        setQuestionsCompleted(questionsCompleted =>
            [...questionsCompleted, question]);

        setCorrectAnswerCount([...questionsCompleted, question]
            .filter(q => q.recordedAnswer === q.correctAnswer).length);

        setAllQuestions(allQuestions => [
            ...allQuestions.map(q => {
                if(q.id === question.id) q = question;
                return q;
            })
        ]);
    };

    return (
        <div key={questions.length}>
            <section>
                <H1>Your Questions</H1>
                <div className='flex gap-8 flex-row flex-wrap mb-2'>
                    { !allQuestions ? "" : <Span><strong>Total Questions:</strong> {allQuestions.length}</Span> }
                    { query?.tags && <Span><strong>Tags:</strong> {query?.tags?.split(",").join(", ")}</Span> }
                    <Span><strong>Score:</strong> {correctAnswerCount}/{allQuestions.length}</Span>
                </div>
                <HR/>
            </section>
            <section className='flex flex-col gap-2'>
                {allQuestions.map((question,index) => {
                    return <InteractiveQuestion
                        key={index} index={index}
                        question={question}
                        handleClick={handleQuestionResponseClick}
                    />;
                })}
                <div className='my-8'>
                    <AppButton type="button" onClick={handleCalculateScore}>
              calculate score
                    </AppButton>
                </div>
            </section>
        </div>
     
    );
};


export default Game;