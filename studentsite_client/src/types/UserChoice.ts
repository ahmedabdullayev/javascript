import Answer from "@/types/Answer";
import Question from "@/types/Question";

export default interface UserChoice{
    id: string,
    quizId: string,
    questionId: string,
    answerId: string,
    userQuizId: string,
    appUserId: string,
    question: Question,
    answer: Answer
}