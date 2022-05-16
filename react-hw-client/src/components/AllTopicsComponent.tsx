import React, {useContext, useEffect, useState} from 'react';
import {ITopics} from "../types/ITopics";
import TopicComponent from "./TopicComponent";
import {TopicsServices} from "../services/books/TopicsServices";
import {AppContext} from "../context/AppContext";
import {useTopicsContext} from "../context/TopicContext";
import {useNavigate} from "react-router";
import {IdentityService} from "../services/identity/IdentityService";

const AllTopicsComponent = () => {
    const context = useContext(AppContext);
    const [topics, topicsSet] = useTopicsContext();

    let mytopic : ITopics[] = [{ name:'php', description: 'bad'}]
    let history = useNavigate();
    const [topicsData, setTopics] = useState<ITopics[]>([]);

    const getTopics = async () => {
        if(context.token) {
            const fetchTasks = async () => {
                //to refresh token
                let refreshData = await IdentityService.RefreshToken("identity/account/refreshtoken", {jwt: context.token, refreshToken: context.refreshToken} )
                console.warn("real: " + refreshData.data.token)
                await IdentityService.delay(500);
                context.setAuthInfo(refreshData.data.token, refreshData.data.email, refreshData.data.firstname, refreshData.data.refreshToken)

                const res = await TopicsServices.GetTopics('topic/GetTopics',  refreshData.data.token)
                console.warn(res.data)
                return res.data as ITopics[]
            }
            const taskFromServer = await fetchTasks()
            setTopics(taskFromServer)
            topicsSet(taskFromServer)
        }else{
            history("/login");
        }
    }

    useEffect(() => {
        getTopics()
    }, [])


    return (
        <div>
            {/*<h1>{bookContext.book[0].title}</h1>*/}
            <h1>{context.userEmail}</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                </tr>
                </thead>
                <tbody>
            {/*{localStorage.getItem('jwttoken') != null ? ('kek') : ("dd")}*/}
            { localStorage.getItem('jwttoken') != "nokey" || localStorage.getItem('jwttoken') != null ?
                (topics.map( (topic) => (
                <TopicComponent key={topic.id} oneTopic={topic} />
            ))) : "Please login"  }
                    </tbody>
            </table>
        </div>
    );
};

export default AllTopicsComponent;
