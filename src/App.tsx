import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, TodoList} from "./component/TodoList";
import {ItemAddForm} from "./component/itemAddForm/ItemAddForm";

export type FilterType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
function App() {
    let toDoListsId_1 = v1();
    let toDoListsID_2 = v1();

    let [toDoLists, setToDoLists] = useState<Array<TodolistType>>([
        {id: toDoListsId_1, title: "What to learn", filter: 'all'},
        {id: toDoListsID_2, title: "What to more learn", filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
            [toDoListsId_1]: [
                {id: v1(), title: 'HTMl&CSS', isDone: true},
                {id: v1(), title: 'Javascript', isDone: true},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'Angular', isDone: false},
                {id: v1(), title: 'Node JS', isDone: false},
            ],
            [toDoListsID_2]: [
                {id: v1(), title: 'Python', isDone: true},
                {id: v1(), title: 'C#', isDone: true},
                {id: v1(), title: 'C++', isDone: true},
                {id: v1(), title: 'Ruby', isDone: false},
                {id: v1(), title: 'Go', isDone: false},
            ]
        }
    )
    /*let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTMl&CSS', isDone: true},
        {id: v1(), title: 'Javascript', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Angular', isDone: false},
        {id: v1(), title: 'Node JS', isDone: false},
    ])*/
    //const [filter, setFilter] = React.useState<FilterType>('all');
    function changeFilter (id: string, filter: FilterType) {
        setToDoLists([...toDoLists.map(value => value.id === id? {...value, filter}: value)])
    }



    function removeTask (toDoListID: string, id: string) {
        /*let changeTask = tasks[tlID];
        tasks[tlID] = changeTask.filter(value => value.id !== id);
        setTasks({...tasks});*/
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].filter(value => value.id !== id)})
    }
    function addTask (toDoListID: string, task: string) {
        /*let newTask = {id: v1(), title: task, isDone: false};
        let toDoListTask = tasks[toDoListID];
        tasks[toDoListID] = [newTask,...toDoListTask];
        setTasks({...tasks})*/
        setTasks({...tasks, [toDoListID]:[{id: v1(), title: task, isDone: false},...tasks[toDoListID]]})
    }
    function changeIsDone (toDoListID: string, id: string, isDone: boolean) {
        /*let task = tasks.find(value => value.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }*/
        setTasks({...tasks, [toDoListID]: tasks[toDoListID].map(t => t.id === id ? {...t, isDone}: t)})

    }
    function removeListTasks (toDoListId: string) {
        setToDoLists([...toDoLists.filter(value => value.id !== toDoListId)])
    }
    function addNewTodoList (title: string) {
        const toDoListId = v1();
        setToDoLists([{id: toDoListId, title: title, filter: 'all'},...toDoLists]);
        setTasks({[toDoListId]: [], ...tasks})
    }

    return (
        <div className="App">
            <div>
                <h3>Add new to do list</h3>
                <ItemAddForm addTask={addNewTodoList}/>
            </div>

            {
                toDoLists.map(todolist => {
                    let showTask:Array<TaskType>;
                    switch (todolist.filter) {
                        case 'active':
                            showTask = tasks[todolist.id].filter(value => !value.isDone);
                            break;
                        case 'completed':
                            showTask = tasks[todolist.id].filter(value => value.isDone);
                            break;

                        default:
                            showTask = tasks[todolist.id];
                            break;
                    }
                    return (
                        < TodoList
                            key = {todolist.id}
                            id = {todolist.id}
                            title ={todolist.title}
                            tasks = {showTask}
                            changeFilter = {changeFilter}
                            removeTask={removeTask}
                            addTask = {addTask}
                            changeIsDone={changeIsDone}
                            filter = {todolist.filter}
                            removeListTasks = {removeListTasks}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
