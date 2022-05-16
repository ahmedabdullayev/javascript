import {IFetchResponse} from "../../types/IFetchResponse";
import {IUserLogin} from "../../types/IUserLogin";
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {ApiBaseUrl} from "../conf";
import {IMessages} from "../../types/IMessages";
import axios from "axios";

export abstract class IdentityService{
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    static async Login(apiEndPoint: string, loginData: {email: string, password: string}) : Promise<IFetchResponse<IUserLogin>>{
        let LoginDataJson = JSON.stringify(loginData)
        try {
            //let response = await this.axios.post<IUserLogin>(apiEndPoint, LoginDataJson);
            let resp2 = await axios({
                method: "post",
                url: ApiBaseUrl + apiEndPoint,
                data: LoginDataJson,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.warn(resp2.data.firstName)
            return{
                ok: resp2.status < 300, //true if 200 response
                statusCode: resp2.status,
                data: resp2.data,
            };
        }
        catch (err) {
            let error = err as AxiosError;
            console.warn(error.response?.data)
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
                // messages: error.response?.data ?? "no"
            }
        }
    }

    static async Register(apiEndPoint: string, registerData: {email: string, password: string, firstname: string, lastname: string})
        : Promise<IFetchResponse<IUserLogin>>{
        let RegisterDataJson = JSON.stringify(registerData)
        try {
            //let response = await this.axios.post<IUserLogin>(apiEndPoint, LoginDataJson);
            let resp2 = await axios({
                method: "post",
                url: ApiBaseUrl + apiEndPoint,
                data: RegisterDataJson,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return{
                ok: resp2.status < 300, //true if 200 response
                statusCode: resp2.status,
                data: resp2.data,
            };
        }
        catch (err) {
            let error = err as AxiosError;
            console.warn(error.response?.data)
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
                // messages: error.response?.data ?? "no"
            }
        }
    }


    static async RefreshToken(apiEndPoint: string, data: {jwt: string | null, refreshToken: string}){
        let dataJson = JSON.stringify(data)

        try {
            let resp2 = await axios({
                method: "post",
                url: ApiBaseUrl + apiEndPoint,
                data: dataJson,
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + jwt
                }
            })
            localStorage.setItem("jwttoken", resp2.data!.token)
            localStorage.setItem("refreshToken", resp2.data!.refreshToken)
            return{
                ok: resp2.status < 300, //true if 200 response
                statusCode: resp2.status,
                data: resp2.data
            };
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                // messages: (error.response?.data as IMessages).messages,
                messages: error.response?.data

            }
        }
    }

    static async delay(time: number){
        return new Promise(resolve => setTimeout(resolve, time));
    }

}