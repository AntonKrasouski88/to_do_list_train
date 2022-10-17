import React, {ChangeEvent} from 'react';
import {FilterType} from "../App";
import { AddItemForm } from './AddItemForm';
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
    removeListTasks: (toDoListId: string)=> void
}

export const TodoList = (props: TodoListPropsType) => {
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
    
    const onClickRemoveListHandler = () => {
        props.removeListTasks(props.id);
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    return (
        <div>
            <div className={s.title}>
                <h3>{props.title}</h3>
                <button className={s.button_title} onClick={onClickRemoveListHandler}>X</button>
            </div>
            <AddItemForm addItem={addTask}/>
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


