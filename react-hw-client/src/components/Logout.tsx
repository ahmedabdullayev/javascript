import React, {useState, useContext} from 'react';

import {useNavigate} from "react-router";
import {AppContext} from "../context/AppContext";

const Logout = () => {
    const context = useContext(AppContext);
    let history = useNavigate();
    context.setAuthInfo(null,"","","")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("jwttoken")
    history("/login");

    return(
        <div></div>
    )
};

export default Logout;
