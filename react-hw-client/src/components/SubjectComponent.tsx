import React from 'react';
import {ISubject} from "../types/ISubject";


const SubjectComponent = ({oneSubject} : ISubject) => {
    return (
        <tr>
            <td>{oneSubject.name}</td>
            <td>{oneSubject.description}</td>
        </tr>
    );
};

export default SubjectComponent;
