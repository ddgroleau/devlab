import {GameRouteParams} from "@/components/Game";
import Question from "@/models/Question";
import {CacheOptions} from "@/models/CacheOptions";
import {apiRequest} from "@/api/apiRequest";
import Difficulty from "@/models/Difficulty";
import SelectOption from "@/models/SelectOption";
import Category from "@/models/Category";

export const getQuestions = async (params:GameRouteParams) => {
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

    const questions:Question[] =
        questionData.map(q=>Question.create(q.id,q.questionText,q.correctAnswer,q.answerOptions));

    return {
        questions: questions,
    };
};

export const getDifficulties = async () => {
    const difficulties = await apiRequest<Difficulty[]>({
        path: "/api/questions/difficulties",
        cacheOption: CacheOptions.Revalidate,
        cacheTimeToLive: 120
    });
      
    return difficulties.map(d => SelectOption.create(d.id.toString(), d.displayText));
};

export const getCategories = async () => {
    const categories = await apiRequest<Category[]>({
        path: "/api/questions/categories",
        cacheOption: CacheOptions.Revalidate,
        cacheTimeToLive: 120
    });

    return categories.map(c => SelectOption.create(c.id.toString(), c.displayText));
};