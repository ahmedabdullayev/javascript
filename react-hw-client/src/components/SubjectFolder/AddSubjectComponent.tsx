import React, {useContext, useEffect, useState} from 'react';
import {SubjectsServices} from "../../services/books/SubjectsServices";
import {AppContext} from "../../context/AppContext";
import {useNavigate} from "react-router";
import AlertValidationComponent, {EAlertValidationClass} from "../helpercomponents/AlertValidationComponent";
import {addSubject, useSubjectsContext} from "../../context/SubjectContext";
import {IdentityService} from "../../services/identity/IdentityService";

const AddSubjectComponent = () => {
    const context = useContext(AppContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [subjects, subjectSet] = useSubjectsContext();

    let history = useNavigate();
    const [bookData, setBook] = useState({name: '', description: ''})
    console.log(subjects)
    const addBookClick = async (e: Event) => {
        e.preventDefault()
        if(bookData.name === ""){
            setAlertMessage("Subject title cant be empty")
        }else{
            setAlertMessage("")
            //to refresh token
            let refreshData = await IdentityService.RefreshToken("identity/account/refreshtoken", {jwt: context.token, refreshToken: context.refreshToken} )
            await IdentityService.delay(500);
            context.setAuthInfo(refreshData.data.token, refreshData.data.email, refreshData.data.firstname, refreshData.data.refreshToken)

            const response = await SubjectsServices.AddSubject("subjects/PostSubject", bookData ,context.token)
            if(response != null && !response.ok){
                setAlertMessage("Please try to add a subject again!")
            }else{
                // let refreshData = await IdentityService.RefreshToken("identity/account/refreshtoken", {jwt: context.token, refreshToken: context.refreshToken} )
                console.warn("token " + context.token)
                console.warn("session " + context.token)
                const allSubjects = await SubjectsServices.GetSubjects("subjects/GetSubjects", context.token)
                console.warn(response.data)
                subjectSet(addSubject(subjects, response.data.id, response.data.name, response.data.description))
                // booksSet(allBooks.data)
                console.log(subjects)
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
                        <h1>Add Subject</h1>
                        <section>
                            <hr />
                            <AlertValidationComponent show={alertMessage !== '' && alertMessage != 'success'} message={alertMessage} alertClass={EAlertValidationClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="input_title">Title</label>
                                <input value={bookData.name} onChange={e => setBook({ ...bookData, name: e.target.value })} className="form-control" type="text" id="input_title" name="Input.Email" placeholder=""  autoComplete="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="input_description">Description</label>
                                <input value={bookData.description} onChange={e => setBook({ ...bookData, description: e.target.value })} className="form-control" type="text" id="input_description" name="Input.Password" placeholder="" autoComplete="current-password" />
                            </div>
                            <AlertValidationComponent show={alertMessage == 'success'} message={"Subject successfuly  added!"} alertClass={EAlertValidationClass.Success} />

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

export default AddSubjectComponent;
