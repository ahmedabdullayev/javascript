import {UserPost} from "@/types/UserPost";

export interface Topic{
    id: string,
    name: string,
    description: string
    userPosts: UserPost[]
}