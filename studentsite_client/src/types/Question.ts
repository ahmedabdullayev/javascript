import Answer from "@/types/Answer";

export default interface Question{
    id: string,
    questionText: string,
    quizId: string,
    answers: Answer[]
}