import {User} from "@/types/identity/User";



export default class UserServices {
    static async SaveUserData(userData : User) : Promise<void>{
        localStorage.setItem("user", JSON.stringify(userData))
    }
    static GetUserData() : User{
       return JSON.parse(<string>localStorage.getItem("user")) as User;
    }
}
