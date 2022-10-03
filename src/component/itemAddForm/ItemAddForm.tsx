import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import s from './../TodoList.module.css'

type ItemAddFormPropsType = {
    addTask: (title: string)=> void
}

export const ItemAddForm = (props: ItemAddFormPropsType) => {
    const [task, setTask] = useState('');
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.currentTarget.value)
        setError(null)
    }
    const onClickHandler = () => {
        if(task.trim() !== "") {
            props.addTask(task.trim());
            setTask('')
        } else {
            setError('Error: The field is empty')
        }
    }
    const onKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }
    return  (
       <div>
           <input className={error ? s.error: ''} value ={task} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
           <button onClick={onClickHandler}>+</button>
           {error ? <div className={s.text_error}>{error}</div>: ''}
       </div>
   )
};
