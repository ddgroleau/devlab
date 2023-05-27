import { QuestionResponseState } from "@/components/QuestionResponse";

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
    
    private constructor(index:number,question:string,correctAnswer:string,possibleAnswers:string[]) {
        this.id = index;
        this.questionText = question;
        this.correctAnswer = correctAnswer;
        this.answerOptions = possibleAnswers;
    }

    public static create(index:number,question:string,correctAnswer:string,possibleAnswers:string[]):Question {
        return  JSON.parse(JSON.stringify(new Question(index,question,correctAnswer,possibleAnswers)));
    }

}