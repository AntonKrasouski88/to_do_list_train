import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";
import s from './TodoList.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: (filter: FilterType) => void
    removeTask: (id: string) => void
    addTask: (task: string) => void
    changeIsDone: (id: string, isDone: boolean)=>void
}

export const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const moveToDoList = props.tasks.map(value => {
        const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
            props.changeIsDone(value.id, event.currentTarget.checked)
        }
        return (
            <li key={value.id}>
                <input type="checkbox" checked={value.isDone}  onChange={onChangeInputHandler}/>
                <span>{value.title}</span>
                <button onClick={()=>{props.removeTask(value.id)}}>x</button>
            </li>
        )
    })
    const [task, setTask] = useState('');
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.currentTarget.value)
        setError(false)
    }
    const onClickHandler = () => {
        if (task.trim() !== '') {
            props.addTask(task.trim())
            setTask('')
        } else {
            setError(true);
            setTask('')
        }

    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && onClickHandler();


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? s.error: ''} value = {task} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={onClickHandler}>+</button>
                {error && <div>Error:The field is empty</div>}
            </div>
            <ul>
                {moveToDoList}
            </ul>
            <div>
                <button onClick={()=>{props.filter('all')}}>All</button>
                <button onClick={()=>{props.filter('active')}}>Active</button>
                <button onClick={()=>{props.filter('completed')}}>Completed</button>
            </div>
        </div>
    );
};
