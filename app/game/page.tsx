import Question from "@/models/Question";
import React from "react";
import Game, {GameRouteParams} from "@/components/Game";
import {redirect} from "next/navigation";
import {apiRequest, CacheOptions} from "@/utils/apiUtils";

const getData = async (params:GameRouteParams) => {

    const pathname = "/api/questions";
    const searchParams = new URLSearchParams;
    searchParams.append("category",params.category ?? "");
    searchParams.append("difficulty",params.difficulty ?? "");
    searchParams.append("questionCount",params.questionCount ?? "");
    searchParams.append("tags",params.tags ?? "");
        
    const pathPlusParams =  pathname + "?" +searchParams.toString();

    const questionData:Question[] = await apiRequest<Question[]>(
        {
            path:pathPlusParams,
            redirectPath:"/",
            cacheOption:CacheOptions.Revalidate,
            cacheTimeToLive:180
        });
    
    const questions:Question[] = JSON.parse(JSON.stringify(
        questionData.map(q=>Question.create(q.id,q.questionText,q.correctAnswer,q.answerOptions))));

    return {
        questions: questions, 
    };
};

const GamePage = async ({searchParams:{category,difficulty,questionCount,tags}}:{searchParams:GameRouteParams}) => {
    const { questions} = await getData({ category, difficulty, questionCount, tags });
    return (
        <Game query={{ category, difficulty, questionCount, tags }} questions={questions}/>
    );
};

export default GamePage;