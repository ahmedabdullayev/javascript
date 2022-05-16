import React, {useContext, useEffect, useState} from 'react';
import {ITodos} from "../../types/ITodos";
import TodoComponent from "../TodoComponent";
import {TodosServices} from "../../services/books/TodosServices";
import {AppContext} from "../../context/AppContext";
import {useTodosContext} from "../../context/TodoContext";
import {useNavigate} from "react-router";
import {IdentityService} from "../../services/identity/IdentityService";

const AllTodosComponent = () => {
    const context = useContext(AppContext);
    const [todos, todosSet] = useTodosContext();

    let mysubject : ITodos[] = [{ todoText:'php', isDone: false}]
    let history = useNavigate();
    const [todosData, setTodos] = useState<ITodos[]>([]);

    const getTodos = async () => {
        if(context.token) {
            const fetchTasks = async () => {
                //to refresh token
                let refreshData = await IdentityService.RefreshToken("identity/account/refreshtoken", {jwt: context.token, refreshToken: context.refreshToken} )
                console.warn("real: " + refreshData.data.token)
                await IdentityService.delay(500);
                context.setAuthInfo(refreshData.data.token, refreshData.data.email, refreshData.data.firstname, refreshData.data.refreshToken)

                const res = await TodosServices.GetTodos('todo/GetTodos',  refreshData.data.token)
                console.warn(res.data)
                return res.data as ITodos[]
            }
            const taskFromServer = await fetchTasks()
            setTodos(taskFromServer)
            todosSet(taskFromServer)
        }else{
            history("/login");
        }
    }

    useEffect(() => {
        getTodos()
        console.log(todos)
    }, [])


    return (
        <div>
            {/*<h1>{bookContext.book[0].title}</h1>*/}
            <h1>{context.userEmail}</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Todo</th>
                    <th scope="col">Done?</th>
                </tr>
                </thead>
                <tbody>
            {/*{localStorage.getItem('jwttoken') != null ? ('kek') : ("dd")}*/}
            { localStorage.getItem('jwttoken') != "nokey" || localStorage.getItem('jwttoken') != null ?
                (todos.map( (todo) => (
                <TodoComponent key={todo.id} oneTodo={todo} />
            ))) : "Please login"  }
                </tbody>
            </table>
        </div>
    );
};

export default AllTodosComponent;
