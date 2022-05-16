import React, {createContext, useState} from "react";
import {ITodos} from "../types/ITodos";



export const addTodo = (books: ITodos[], id: number, todoText: string, isDone: boolean): ITodos[] =>{
    return [...books, {id: id, todoText: todoText, isDone: isDone}]
};

export const useTodos = (initial: ITodos[]) => React.useState<ITodos[]>(initial)
export type UseTodosType = ReturnType<typeof useTodos>;

const TodoContext = React.createContext<UseTodosType | null>(null);

export const useTodosContext = () => React.useContext(TodoContext)!;

export const TodosProvider = ({children} : {children: React.ReactNode}) => (
    <TodoContext.Provider value={useTodos([])}>
        {children}
    </TodoContext.Provider>
)
