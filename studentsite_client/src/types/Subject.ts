import Quiz from "@/types/Quiz";

export default interface Subject{
    id: string,
    name: string,
    description: string,
    quizzes: Quiz[]
}