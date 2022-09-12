import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";
import s from './TodoList.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (id: string, filter: FilterType) => void
    removeTask: (tlID: string, id: string) => void
    addTask: (toDoListID: string, task: string) => void
    changeIsDone: (toDoListID: string, id: string, isDone: boolean)=>void
    filter: FilterType
}

export const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const moveToDoList = props.tasks.map(value => {
        const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
            props.changeIsDone(props.id, value.id, event.currentTarget.checked)
        }
        return (
            <li key={value.id} className={value.isDone ? s.isDone: ''}>
                <input type="checkbox" checked={value.isDone}  onChange={onChangeInputHandler}/>
                <span>{value.title}</span>
                <button onClick={()=>{props.removeTask(props.id, value.id)}}>x</button>
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
            props.addTask(props.id ,task.trim())
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
                <button className={props.filter === 'all' ? s.button_active: ''} onClick={()=>{props.changeFilter(props.id, 'all')}}>All</button>
                <button className={props.filter === 'active' ? s.button_active: ''} onClick={()=>{props.changeFilter(props.id, 'active')}}>Active</button>
                <button className={props.filter === 'completed' ? s.button_active: ''} onClick={()=>{props.changeFilter(props.id, 'completed')}}>Completed</button>
            </div>
        </div>
    );
};
