import React, {useContext, useEffect, useState} from 'react';
import {TodosServices} from "../../services/books/TodosServices";
import {AppContext} from "../../context/AppContext";
import {useNavigate} from "react-router";
import AlertValidationComponent, {EAlertValidationClass} from "../helpercomponents/AlertValidationComponent";
import {addTodo, useTodosContext} from "../../context/TodoContext";
import {IdentityService} from "../../services/identity/IdentityService";

const AddTodoComponent = () => {
    const context = useContext(AppContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [todos, todoSet] = useTodosContext();

    let history = useNavigate();
    const [bookData, setBook] = useState({todoText: '', isDone: false})
    console.log(todos)
    const addBookClick = async (e: Event) => {
        e.preventDefault()
        if(bookData.todoText === ""){
            setAlertMessage("Todo cant be empty")
        }else{
            setAlertMessage("")
            //to refresh token
            let refreshData = await IdentityService.RefreshToken("identity/account/refreshtoken", {jwt: context.token, refreshToken: context.refreshToken} )
            await IdentityService.delay(500);
            context.setAuthInfo(refreshData.data.token, refreshData.data.email, refreshData.data.firstname, refreshData.data.refreshToken)

            const response = await TodosServices.AddTodo("todo/PostTodo", bookData ,context.token)
            if(response != null && !response.ok){
                setAlertMessage("Please try to add a todo again!")
            }else{
                // let refreshData = await IdentityService.RefreshToken("identity/account/refreshtoken", {jwt: context.token, refreshToken: context.refreshToken} )
                console.warn("token " + context.token)
                console.warn("session " + context.token)
                const allTodos = await TodosServices.GetTodos("todo/GetTodos", context.token)
                console.warn(response.data)
                todoSet(addTodo(todos, response.data.id, response.data.todoText, response.data.isDone))
                // booksSet(allBooks.data)
                console.log(todos)
                setAlertMessage("success")
            }
        }

    }

    useEffect(() => {
        if(!context.token){
            history("/login")
        }
    }, [])

    return (
        <div>
            <form onSubmit={(e) => addBookClick(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <h1>Add Todoo</h1>
                        <section>
                            <hr />
                            <AlertValidationComponent show={alertMessage !== '' && alertMessage != 'success'} message={alertMessage} alertClass={EAlertValidationClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="input_title">Title</label>
                                <input value={bookData.todoText} onChange={e => setBook({ ...bookData, todoText: e.target.value })} className="form-control" type="text" id="input_title" name="Input.Email" placeholder=""  autoComplete="username" />
                            </div>
                            <AlertValidationComponent show={alertMessage == 'success'} message={"Todo successfuly  added!"} alertClass={EAlertValidationClass.Success} />

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Add</button>
                                {/*<button onClick={() => booksSet(addBook(books,bookData.title, bookData.description))} type="submit" className="btn btn-primary">Add</button>*/}
                            </div>
                        </section>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default AddTodoComponent;
