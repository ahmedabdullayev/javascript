import UserChoice from "@/types/UserChoice";

export default interface UserQuiz{
    id: string,
    quizId: string,
    appUserId: string,
    userChoices: UserChoice[]
}