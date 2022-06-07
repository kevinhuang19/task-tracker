import './App.css';
import { useState } from "react";
import Axios from 'axios';


function App() {

    const [task, setTask] = useState('');
    const [user, setUser,entry_date] = useState('');

    const [tasksList, setTaskList] = useState([]);

    const [newTask, setNewTask] = useState('');

    //addTask function to add data to database
    const addTask = () => {
        Axios.post("http://localhost:3000/addTask", {
            task: task,
            user: user,
            entry_date: entry_date,
        }).then(() => {
            //add onto the existing array
            setTaskList([
                ...tasksList,
                {
                    task: task,
                    user: user,
                    entry_date: entry_date
                },

            ]);
        });
    };
    //get data from backend
    const getTasks = () => {
        Axios.get("http://localhost:3000/getTasks").then((response) => {
            setTaskList(response.data);
        });
    };
    const updateTask = (id) => {
        Axios.put("http://localhost:3000/update", {
            task: newTask,
            id: id

        }).then((response) => {
            setTaskList(tasksList.map((val) => {
                return val.id === id ? {id: val.id, user: val.user, entry_date: val.entry_date, task: newTask}: val
            }))
        });
    };
    const deleteTask = (id) => {
        Axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
            setTaskList(tasksList.filter((val) => {
                return val.id !== id;
            }))
        });
    }

    return (
        <div className="App">
            <div className="taskAssign">
                <label>Task</label>
                <input type="text" onChange={(event) => (setTask(event.target.value))} required/>
                <label>Assigned To</label>
                <input type="text" onChange={(event) => (setUser(event.target.value))} required />
                <button onClick={addTask}>Add Task</button>
            </div>

            <div className="showTasks">
                <button onClick={getTasks}>Show Tasks</button>
                {tasksList.map((val, key) => {
                    return (
                        <div className="users">
                            <div>
                                <h4>Task Assigned: {val.user}</h4>
                                <h4>Task: {val.task}</h4>
                                <h4>Date: {val.entry_date}</h4>
                            </div>
                            <div>
                                <input type="text" placeholder="new task..." onChange={(event) => (setNewTask(event.target.value))} />
                                <button onClick={() => { updateTask(val.id) }}>Update</button>
                                <button onClick={() => {deleteTask(val.id) } }>Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;