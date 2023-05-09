import AppButton from '@/components/AppButton';
import Layout from '@/components/Layout';
import QuestionResponse, { QuestionResponseState } from '@/components/QuestionResponse';
import Toast, { ToastMessage } from '@/components/Toast';
import axios, { AxiosResponse } from 'axios';
import Question from '@/models/Question';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, {useEffect, useMemo, useState} from 'react';

type RouteParams = {
    difficulty?:string, 
    tags?:string, 
    category?:string, 
    questionCount?:number
}

export const getServerSideProps:GetServerSideProps<{ questions:Question[], query: RouteParams }> = async (context) => {

    console.info("Fetching server side props");

    const baseApiUri:URL = new URL(process.env.NEXT_PUBLIC_API_URI || "");
    if(baseApiUri.href.length > 0) {
        baseApiUri.pathname = "/api/questions";
        baseApiUri.searchParams.append("category",context.query.category as string);
        baseApiUri.searchParams.append("difficulty",context.query.difficulty as string);
        baseApiUri.searchParams.append("questionCount",context.query.questionCount as string);
        baseApiUri.searchParams.append("tags",context.query.tags as string);
    }

    const questionResponse:AxiosResponse = await axios.get(baseApiUri.href);
    const questionData:Question[] = questionResponse.status === 200 ? questionResponse.data : [];
    const questions = JSON.parse(JSON.stringify(
        questionData.map(q=>Question.create(q.id,q.questionText,q.correctAnswer,q.answerOptions))));

    console.info(`Found ${questions.length} questions. Returning the following JSON object: ${questions}`);

    context.res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=180');
    return {
        props: { questions: questions, query: context.query },
    };
};

const Game = ({questions,query}:{questions:Question[],query:RouteParams}) => {
    const router = useRouter();

    useMemo(()=>{
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
        <Layout pageTitle='Play Game'>
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
        </Layout>
    );
};


export default Game;