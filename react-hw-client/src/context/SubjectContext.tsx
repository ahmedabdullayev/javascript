import React, {createContext, useState} from "react";
import {ISubjects} from "../types/ISubjects";



export const addSubject = (books: ISubjects[], id: number, name: string, description: string): ISubjects[] =>{
    return [...books, {id: id, name: name, description: description}]
};

export const useSubjects = (initial: ISubjects[]) => React.useState<ISubjects[]>(initial)
export type UseSubjectsType = ReturnType<typeof useSubjects>;

const SubjectContext = React.createContext<UseSubjectsType | null>(null);

export const useSubjectsContext = () => React.useContext(SubjectContext)!;

export const SubjectsProvider = ({children} : {children: React.ReactNode}) => (
    <SubjectContext.Provider value={useSubjects([])}>
        {children}
    </SubjectContext.Provider>
)
