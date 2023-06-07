import React from "react";
import Game, {GameRouteParams} from "@/components/Game";
import {getQuestions} from "@/api/queries";

const GamePage = async ({searchParams:{categories,difficulty,questionCount,tags}}:{searchParams:GameRouteParams}) => {
    const { questions} = await getQuestions({ categories, difficulty, questionCount, tags });
    return (
        <Game query={{ categories, difficulty, questionCount, tags }} questions={questions}/>
    );
};

export default GamePage;