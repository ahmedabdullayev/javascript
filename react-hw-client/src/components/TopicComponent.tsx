import React from 'react';
import {ITopic} from "../types/ITopic";


const TopicComponent = ({oneTopic} : ITopic) => {
    return (
        <tr>
            <td>{oneTopic.name} </td>
            <td>{oneTopic.description}</td>
        </tr>

    );
};

export default TopicComponent;
