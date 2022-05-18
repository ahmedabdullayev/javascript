import {User} from "@/types/identity/User";
import axios, {AxiosRequestConfig} from "axios";
import UserChoice from "@/types/UserChoice";
import {RefreshToken} from "@/types/identity/RefreshToken";


export default class UserServices {
    static async SaveUserData(userData : User) : Promise<void>{
        localStorage.setItem("user", JSON.stringify(userData))
    }
    static GetUserData() : User{
        // const store = JSON.stringify(localStorage.getItem("user"))
        // const parse = JSON.parse(store) as User;
        // return parse;
       return JSON.parse(<string>localStorage.getItem("user")) as User;
    }

    static async RefreshToken(){
        const userData = this.GetUserData()
        const requestData: RefreshToken = {
            jwt: userData.token,
            refreshToken: userData.refreshToken
        }
        console.log("HELLO!")
        await this.delay(1100)
        const data = await axios.post('identity/account/refreshtoken', requestData)
            .then(res => {
                return res.data as User
            }).then(data => {
                return data as User
            })
        await this.delay(100)
        await this.SaveUserData(data as User)
        return data
    }

    static delay(time : number) {
        console.warn("DELAUT")
        return new Promise(resolve => setTimeout(resolve, time));
    }


    static AxiosJwt(jwt?: string): AxiosRequestConfig | undefined {
        if (!jwt) return undefined;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        };
        return config;
    }

    static GetCulture() : string{
        const lang = localStorage.getItem("lang");
        return lang ? '?culture='+lang : '';
    }
}
