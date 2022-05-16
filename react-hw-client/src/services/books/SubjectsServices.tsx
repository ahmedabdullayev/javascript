import {IFetchResponse} from "../../types/IFetchResponse";
import {IUserLogin} from "../../types/IUserLogin";
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {ApiBaseUrl} from "../conf";
import {IMessages} from "../../types/IMessages";
import axios from "axios";

export abstract class SubjectsServices{

    static async AddSubject(apiEndPoint: string, data: {name: string, description: string}, jwt: string | null ){
        let dataJson = JSON.stringify(data)

        try {
            let resp2 = await axios({
                method: "post",
                url: ApiBaseUrl + apiEndPoint,
                data: dataJson,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt
                }
            })
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

    static async GetSubjects(apiEndPoint: string, jwt: string | null){
        try {
            //let response = await this.axios.post<IUserLogin>(apiEndPoint, LoginDataJson);
            let resp2 = await axios({
                method: "get",
                url: ApiBaseUrl + apiEndPoint,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt
                }
            })
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



}