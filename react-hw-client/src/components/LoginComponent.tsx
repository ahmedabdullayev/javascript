import React, {useState, useContext} from 'react';
import {IdentityService} from "../services/identity/IdentityService";
import { AppContext } from "../context/AppContext";
import AlertValidationComponent,{EAlertValidationClass} from "./helpercomponents/AlertValidationComponent";

const LoginComponent = () => {
    const context = useContext(AppContext);

    const [alertMessage, setAlertMessage] = useState('');
    const [loginData, setLogin] = useState({email: 'admin@itcollege.ee', password: '123456'})

    const LoginClick = async (e: Event) =>{
        e.preventDefault()
        if (loginData.email === '' || loginData.password === '') {
            setAlertMessage('Password or Email are empty!');
        }else {
            setAlertMessage('');
            let response = await IdentityService.Login('identity/account/login', loginData);
            console.log(response)
            if (response !== null && !response.ok) {
                setAlertMessage("Invalid Password or Email!")
            } else {
                setAlertMessage('');
                alert(response.data?.refreshToken)
                let s = context.setAuthInfo(response.data!.token, response.data!.email, response.data!.username, response.data!.refreshToken)

                setAlertMessage("success")
                localStorage.setItem("jwttoken", response.data!.token)
                localStorage.setItem("refreshToken", response.data!.refreshToken)

            }
        }
    }

    return (
        <div>
            {/*<h1>{context.userEmail}</h1>*/}
            <h1>Login Page</h1>
            <form onSubmit={(e) => LoginClick(e.nativeEvent)}>
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
                            <AlertValidationComponent show={alertMessage == 'success'} message={"Successfuly Loged in!"} alertClass={EAlertValidationClass.Success} />

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

export default LoginComponent;
