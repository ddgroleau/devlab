import React from "react";
import Game, {GameRouteParams} from "@/components/Game";
import {getQuestions} from "@/api/queries";

const GamePage = async ({searchParams:{category,difficulty,questionCount,tags}}:{searchParams:GameRouteParams}) => {
    const { questions} = await getQuestions({ category, difficulty, questionCount, tags });
    return (
        <Game query={{ category, difficulty, questionCount, tags }} questions={questions}/>
    );
};

export default GamePage;