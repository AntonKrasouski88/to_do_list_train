import React, {KeyboardEvent, ChangeEvent, useState } from 'react'
import s from './TodoList.module.css'


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType)=> {
    const [error, setError] = useState<boolean>(false)
    const [task, setTask] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.currentTarget.value)
        setError(false)
    }
    const onClickHandler = () => {
        if (task.trim() !== '') {
            props.addItem (task.trim());
            setTask('')
        } else {
            setError(true);
            setTask('')
        }

    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && onClickHandler();

    return ( 
        <div>
            <input className={error ? s.error: ''} value = {task} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <button onClick={onClickHandler}>+</button>
            {error && <div>Error:The field is empty</div>}
        </div>
    )
}

