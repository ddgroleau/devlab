import { QuestionResponseState } from "@/components/QuestionResponse";
import Category from "@/models/Category";
import Difficulty from "@/models/Difficulty";

export default class Question {

    public id:number;
    public questionText:string;
    public correctAnswer:string;
    public answerOptions:string[];
    public recordedAnswer?:string|undefined;
    public questionResponseStates: {
        possibleAnswer:string,
        answerState:QuestionResponseState
    }[] = [];
    public category:Category;
    public difficulty:Difficulty;

    
    private constructor(index:number,question:string,correctAnswer:string,possibleAnswers:string[],category:Category,difficulty:Difficulty) {
        this.id = index;
        this.questionText = question;
        this.correctAnswer = correctAnswer;
        this.answerOptions = possibleAnswers;
        this.category = category;
        this.difficulty = difficulty;
    }

    public static create(
        index:number,
        question:string,
        correctAnswer:string,
        possibleAnswers:string[],
        category:Category,
        difficulty:Difficulty
    ):Question {
        return  JSON.parse(JSON.stringify(new Question(index,question,correctAnswer,possibleAnswers,category,difficulty)));
    }

}