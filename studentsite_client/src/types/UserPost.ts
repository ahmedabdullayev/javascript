import {UserComment} from "@/types/UserComment";

export interface UserPost {
    id: string,
    title: string,
    text: string,
    topicId: string
    userComments: UserComment[]
}