import Home from "@/components/Home";
import {getCategories, getDifficulties} from "@/api/queries";
import React from "react";

const HomePage = async () => {
    const difficultiesData = getDifficulties();
    const categoriesData = getCategories();
    const [ difficulties, categories ] = await Promise.all([difficultiesData,categoriesData]);
    return (
        <Home categories={categories} difficulties={difficulties} />
    );
};

export default HomePage;
