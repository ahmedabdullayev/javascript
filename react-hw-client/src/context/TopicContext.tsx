import React, {createContext, useState} from "react";
import {ITopics} from "../types/ITopics";



export const addTopic = (books: ITopics[], id: number, name: string, description: string): ITopics[] =>{
    return [...books, {id: id, name: name, description: description}]
};

export const useTopics = (initial: ITopics[]) => React.useState<ITopics[]>(initial)
export type UseTopicsType = ReturnType<typeof useTopics>;

const TopicContext = React.createContext<UseTopicsType | null>(null);

export const useTopicsContext = () => React.useContext(TopicContext)!;

export const TopicsProvider = ({children} : {children: React.ReactNode}) => (
    <TopicContext.Provider value={useTopics([])}>
        {children}
    </TopicContext.Provider>
)

//
// const BooksContext = React.createContext({
//         useBooks: [] as IBooks[],
//         setBooks: (useBooks: IBooks[]) => {}
//     }
// );
// export const useBooksContext = () => React.useContext(BooksContext)!;
// export function BooksProvider({ children }: { children: React.ReactNode }) {
//      const [useBooks, setBooks] = useState<IBooks[]>([{
//         id: 3213,
//         title: "Kekbook",
//         description: "descresds"
//     }] as IBooks[]);
//     return (
//         <BooksContext.Provider value={{useBooks, setBooks}}>{children}</BooksContext.Provider>
//     );
// }
// export interface IBookState {
//     book: IBooks[] ,
//     setBookInfo: (book: IBooks[]) => void;
//     //setAuthInfo: IFunction; <---- or like this
// }
//
// export const initialBookState : IBookState ={
//     book: [{ id: 1, title: 'WEbApp', description: 'Kalmo courses'}] as IBooks[],
//     setBookInfo(book: IBooks[]): void {
//     },
// }
//
// export const BookContext = createContext<IBookState>(initialBookState);
// export const BookContextProvider = BookContext.Provider;