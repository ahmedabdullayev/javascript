import {createContext} from "react";
import {IUserLogin} from "../types/IUserLogin";
interface IFunction { // just for example..
    (token: string | null, userEmail: string, userName: string) : void;
}

export interface IAppState  {
    token: string | null;
    userEmail: string;
    userName: string;
    refreshToken: string
    setAuthInfo: (token: string | null, userEmail: string, userName: string, refreshToken: string) => void;
    //setAuthInfo: IFunction; <---- or like this
}

export const initialAppState : IAppState ={
    token: null,
    userEmail: "",
    userName: "",
    refreshToken: "",
    setAuthInfo(token: string | null, userEmail: string, userName: string, refreshToken: string): void {
    },
}

export const AppContext = createContext<IAppState>(initialAppState);
export const AppContextProvider = AppContext.Provider;

