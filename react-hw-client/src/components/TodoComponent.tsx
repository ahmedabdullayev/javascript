import React from 'react';
import {ITodo} from "../types/ITodo";


const TodoComponent = ({oneTodo} : ITodo) => {
    return (
        <tr>
            <td>{oneTodo.todoText}</td>
            <td>{oneTodo.isDone ? 'done' : 'not done yet'}</td>
        </tr>
    );
};

export default TodoComponent;
