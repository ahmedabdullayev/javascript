import React, {useState, useContext} from 'react';
import {IdentityService} from "../services/identity/IdentityService";
import { AppContext } from "../context/AppContext";
import AlertValidationComponent,{EAlertValidationClass} from "./helpercomponents/AlertValidationComponent";

const RegisterComponent = () => {
    const context = useContext(AppContext);

    const [alertMessage, setAlertMessage] = useState('');
    const [loginData, setLogin] =
        useState({email: 'test23@itcollege.ee', password: '123456', firstname: 'ahmed', lastname:'abdullajev'})
    const RegisterClick = async (e: Event) =>{
        e.preventDefault()
        if (loginData.email === '' || loginData.password === '' || loginData.firstname === '' || loginData.lastname === '') {
            setAlertMessage('Password or Email are empty!');
        }else {
            setAlertMessage('');
            let response = await IdentityService.Register('identity/account/register', loginData);
            console.log(response)
            if (response !== null && !response.ok) {
                setAlertMessage("Invalid Password or Email or Name or Firstname!")
            } else {
                setAlertMessage('');
                context.setAuthInfo(response.data!.token, response.data!.email, response.data!.username, response.data!.refreshToken)
                setAlertMessage("success")
                localStorage.setItem("jwttoken", response.data!.token)
                localStorage.setItem("refreshToken", response.data!.refreshToken)

            }
        }
    }

    return (
        <div>
            <h1>{context.refreshToken}</h1>
            <h1>{context.userEmail}</h1>
            <h1>Register Page {context.token}</h1>
            <form onSubmit={(e) => RegisterClick(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <AlertValidationComponent show={alertMessage !== '' && alertMessage != 'success'} message={alertMessage} alertClass={EAlertValidationClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="Input_Email">Email</label>
                                <input value={loginData.email} onChange={e => setLogin({ ...loginData, email: e.target.value })} className="form-control" type="email" id="Input_Email" name="Input.Email" placeholder="e"  autoComplete="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">Password</label>
                                <input value={loginData.password} onChange={e => setLogin({ ...loginData, password: e.target.value })} className="form-control" type="password" id="Input_Password" name="Input.Password" placeholder="e" autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">Firstname</label>
                                <input value={loginData.firstname} onChange={e => setLogin({ ...loginData, firstname: e.target.value })} className="form-control" type="text" id="Input_Firstname" name="Input.Firstname" placeholder="e" autoComplete="current-firstname" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">Lastname</label>
                                <input value={loginData.lastname} onChange={e => setLogin({ ...loginData, lastname: e.target.value })} className="form-control" type="text" id="Input_lastname" name="Input.lastname" placeholder="e" autoComplete="current-lastname" />
                            </div>
                            <AlertValidationComponent show={alertMessage == 'success'} message={"Successfuly registered in!"} alertClass={EAlertValidationClass.Success} />

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Log in</button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterComponent;
