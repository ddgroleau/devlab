"use client";

import Question from '@/models/Question';
import React from 'react';
import Game, {GameRouteParams} from "@/components/Game";

const getData = async (query:GameRouteParams) => {
  const baseApiUri:URL = new URL(process.env.NEXT_PUBLIC_API_URI || "");
  if(baseApiUri.href.length > 0) {
    baseApiUri.pathname = "/api/questions";
    baseApiUri.searchParams.append("category",query.category as string);
    baseApiUri.searchParams.append("difficulty",query.difficulty as string);
    baseApiUri.searchParams.append("questionCount",query.questionCount as string);
    baseApiUri.searchParams.append("tags",query.tags as string);
  }

  const questionResponse = await fetch(baseApiUri.href,{ next: { revalidate: 180 } });
  const questionData:Question[] = questionResponse.status === 200 ? await questionResponse.json() : [];
  const questions = JSON.parse(JSON.stringify(
    questionData.map(q=>Question.create(q.id,q.questionText,q.correctAnswer,q.answerOptions))));

  return {
    questions: questions, 
  };
};

const GamePage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const { questions } = await getData(searchParams);
  return (
    <Game query={searchParams} questions={questions}/>
  );
};


export default GamePage;