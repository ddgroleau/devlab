"use client";

import AppButton from '@/components/AppButton';
import QuestionResponse, { QuestionResponseState } from '@/components/QuestionResponse';
import Toast, { ToastMessage } from '@/components/Toast';
import Question from '@/models/Question';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {ParsedUrlQuery} from "querystring";

export interface GameRouteParams extends ParsedUrlQuery {
    difficulty?:string,
    tags?:string,
    category?:string,
    questionCount?:string
}

const Game = ({questions,query}:{questions:Question[],query:GameRouteParams}) => {
  const router = useRouter();

  useEffect(()=>{
    if(!questions || questions.length < 1) router.push(`/?error=ERR_001`);
  },[router, questions]);

  const [allQuestions,setAllQuestions] = useState<Question[]>(questions);
  const [correctAnswerCount,setCorrectAnswerCount] = useState<number>(0);
  const [questionsCompleted,setQuestionsCompleted] = useState<Question[]>([]);
  const [toasts,setToasts] = useState<ToastMessage[]>([]);

  const determineQuestionResponseState = (question:Question,recordedAnswer:string):QuestionResponseState => {
    return question.questionResponseStates.filter(s=>s.possibleAnswer=== recordedAnswer)[0]?.answerState
            || QuestionResponseState.UNANSWERED;
  };

  const handleCalculateScore = () => {
    if(questionsCompleted.length !== questions.length) {
      setToasts([{
        message:"Please complete all of the questions",
        success: false,
        id: Date.now()
      }]);
    } else {
      router.push(`/score?correct=${correctAnswerCount}&total=${questions.length}`);
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

    setAllQuestions(questions => [
      question,
      ...questions.filter(q => q.questionText !== question.questionText)
    ].sort((a,b)=>a.id - b.id));
  };

  return (
    <>
      <section>
        <h1>Your Questions</h1>
        <div className='config'>
          { query?.difficulty && <span><strong>Difficulty:</strong> {query?.difficulty}</span> }
          { query?.category &&  <span><strong>Category:</strong> {query?.category}</span> }
          { !allQuestions ? "" : <span><strong>Total Questions:</strong> {allQuestions.length}</span> }
          { query?.tags && <span><strong>Tags:</strong> {query?.tags?.split(",").join(", ")}</span> }
          <span><strong>Score:</strong> {correctAnswerCount}/{questions.length}</span>
        </div>
        <hr/>
      </section>
      <section className='questions'>
        {allQuestions.map((question,index) => {
          return (
            <div key={index}>
              <p>{index+1}) {question.questionText}</p>
              <span className='choose'>Choose an answer below:</span>
              <div className='answers'>
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
              <hr/>
            </div>
          );
        })}
        <div className='btn-container'>
          <AppButton type="button" onClick={handleCalculateScore}>
                        calculate score
          </AppButton>
        </div>
      </section>
      <style jsx>
        {`
                    .config {
                        display: flex;
                        gap: 2rem;
                        flex-flow: row wrap;
                    }
                    .choose {
                        padding-left: 1rem;
                    }
                    .answers {
                        display: flex;
                        gap: 1rem;
                        flex-flow: row wrap;
                        margin-block: 1rem 2rem;
                    }
                    .questions {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    .btn-container {
                        margin-block: 2rem;
                    }
                `}
      </style>
      <Toast messages={toasts} />
    </>
  );
};


export default Game;