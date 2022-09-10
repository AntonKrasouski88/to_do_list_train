import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, TodoList} from "./component/TodoList";

export type FilterType = 'all' | 'active' | 'completed';
function App() {
    const title = 'What to learn';
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTMl&CSS', isDone: true},
        {id: v1(), title: 'Javascript', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Angular', isDone: false},
        {id: v1(), title: 'Node JS', isDone: false},
    ])
    const [filter, setFilter] = React.useState('all');
    function changeFilter (filter: FilterType) {
        setFilter(filter);
    }

    let showTask;
    switch (filter) {
        case 'active':
            showTask = tasks.filter(value => !value.isDone);
            break;
        case 'completed':
            showTask = tasks.filter(value => value.isDone);
            break;

        default:
            showTask = tasks;
            break;
    }

    function removeTask (id: string) {
        setTasks([...tasks.filter(value => value.id !== id)])
    }
    function addTask (task: string) {
        setTasks([{id: v1(), title: task, isDone: false},...tasks])
    }
    function changeIsDone (id: string, isDone: boolean) {
        /*let task = tasks.find(value => value.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }*/
        setTasks([...tasks.map(value => value.id === id ?{...value, isDone}: value)])
    }


    return (
        <div className="App">
            < TodoList
                title ={title}
                tasks = {showTask}
                filter = {changeFilter}
                removeTask={removeTask}
                addTask = {addTask}
                changeIsDone={changeIsDone}
            />
        </div>
    );
}

export default App;
