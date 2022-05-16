import React, {useContext, useEffect, useState} from 'react';
import {ISubjects} from "../../types/ISubjects";
import SubjectComponent from "../SubjectComponent";
import {SubjectsServices} from "../../services/books/SubjectsServices";
import {AppContext} from "../../context/AppContext";
import {useSubjectsContext} from "../../context/SubjectContext";
import {useNavigate} from "react-router";
import {IdentityService} from "../../services/identity/IdentityService";

const AllSubjectsComponent = () => {
    const context = useContext(AppContext);
    const [subjects, subjectsSet] = useSubjectsContext();

    let mysubject : ISubjects[] = [{ name:'php', description: 'bad'}]
    let history = useNavigate();
    const [subjectsData, setSubjects] = useState<ISubjects[]>([]);

    const getSubjects = async () => {
        if(context.token) {
            const fetchTasks = async () => {
                //to refresh token
                let refreshData = await IdentityService.RefreshToken("identity/account/refreshtoken", {jwt: context.token, refreshToken: context.refreshToken} )
                console.warn("real: " + refreshData.data.token)
                await IdentityService.delay(500);
                context.setAuthInfo(refreshData.data.token, refreshData.data.email, refreshData.data.firstname, refreshData.data.refreshToken)

                const res = await SubjectsServices.GetSubjects('subjects/GetSubjects',  refreshData.data.token)
                console.warn(res.data)
                return res.data as ISubjects[]
            }
            const taskFromServer = await fetchTasks()
            setSubjects(taskFromServer)
            subjectsSet(taskFromServer)
        }else{
            history("/login");
        }
    }

    useEffect(() => {
        getSubjects()
    }, [])


    return (
        <div>
            {/*<h1>{bookContext.book[0].title}</h1>*/}
            <h1>{context.userEmail}</h1>
            {/*{localStorage.getItem('jwttoken') != null ? ('kek') : ("dd")}*/}
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                </tr>
                </thead>
                <tbody>
            { localStorage.getItem('jwttoken') != "nokey" || localStorage.getItem('jwttoken') != null ?
                (subjects.map( (subject) => (
                <SubjectComponent key={subject.id} oneSubject={subject} />
            ))) : "Please login"  }

                </tbody>
            </table>
        </div>
    );
};

export default AllSubjectsComponent;
