"use client";

import AppButton from "@/components/AppButton";
import QuestionResponse, { QuestionResponseState } from "@/components/QuestionResponse";
import Question from "@/models/Question";
import { useRouter } from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import {H1, HR, P, Span} from "@/components/Typography";
import {BaseContext} from "@/context/BaseProvider";
import {ServerResponses} from "@/models/ServerResponses";

export interface GameRouteParams {
    difficulty?:string,
    tags?:string,
    category?:string,
    questionCount?:string
}

const Game = ({questions,query}:{questions:Question[],query:GameRouteParams}) => {
    const router = useRouter();
    const [allQuestions,setAllQuestions] = useState<Question[]>(
        [...questions.map(q => Question.create(q.id,q.questionText, q.correctAnswer,q.answerOptions))]);
    const [correctAnswerCount,setCorrectAnswerCount] = useState<number>(0);
    const [questionsCompleted,setQuestionsCompleted] = useState<Question[]>([]);

    const determineQuestionResponseState = (question:Question,recordedAnswer:string):QuestionResponseState => {
        return question.questionResponseStates.filter(s=>s.possibleAnswer=== recordedAnswer)[0]?.answerState
            || QuestionResponseState.UNANSWERED;
    };

    const handleCalculateScore = () => {
        if(questionsCompleted.length !== allQuestions.length) {
            router.push("/game?error="+ServerResponses.IncompleteQuestions);
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
            question,
            ...allQuestions.filter(q => q.questionText !== question.questionText)
        ].sort((a,b)=>a.id - b.id));
    };

    return (
        <div key={questions.length}>
            <section>
                <H1>Your Questions</H1>
                <div className='flex gap-8 flex-row flex-wrap mb-2'>
                    { query?.difficulty && <Span><strong>Difficulty:</strong> {query?.difficulty}</Span> }
                    { query?.category &&  <Span><strong>Category:</strong> {query?.category}</Span> }
                    { !allQuestions ? "" : <Span><strong>Total Questions:</strong> {allQuestions.length}</Span> }
                    { query?.tags && <Span><strong>Tags:</strong> {query?.tags?.split(",").join(", ")}</Span> }
                    <Span><strong>Score:</strong> {correctAnswerCount}/{allQuestions.length}</Span>
                </div>
                <HR/>
            </section>
            <section className='flex flex-col gap-2 mt-4'>
                {allQuestions.map((question,index) => {
                    return (
                        <div key={index}>
                            <P>{index+1}) {question.questionText}</P>
                            <Span className='pl-4'>Choose an answer below:</Span>
                            <div className='flex gap-4 flex-row flex-wrap mx-8 my-6'>
                                {question.answerOptions.map((recordedAnswer,index)=> {
                                    return (
                                        <QuestionResponse
                                            key={index}
                                            text={recordedAnswer}
                                            state={determineQuestionResponseState(question,recordedAnswer)}
                                            onClick={()=>handleQuestionResponseClick(question,recordedAnswer)}
                                        />
                                    );
                                })}
                            </div>
                            <HR/>
                        </div>
                    );
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