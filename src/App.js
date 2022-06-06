import './App.css';
import { useState } from "react";
import Axios from 'axios';


function App() {

    const [task, setTask] = useState('');
    const [user, setUser] = useState('');

    const [tasksList, setTaskList] = useState([]);

    //addTask function to add data to database
    const addTask = () => {
        Axios.post("http://localhost:3000/addTask", {
            task: task,
            user: user
        }).then(() => {
            //add onto the existing array
            setTaskList([
                ...tasksList,
                {
                    task: task,
                    user: user,
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


    return (
        <div className="App">
            <div className="taskAssign">
                <label>Task</label>
                <input type="text" onChange={(event) => (setTask(event.target.value))} />
                <label>Assigned To</label>
                <input type="text" onChange={(event) => (setUser(event.target.value))} />
                <button onClick={addTask}>Add Task</button>
            </div>

            <div className="showTasks">
                <button onClick={getTasks}>Show Tasks</button>
                {tasksList.map((val, key) => {
                    return (
                        <div className="users" key='{val.id}'>
                            <h4>Task Assigned: {val.user}</h4>
                            <h4>Task: { val.task }</h4>
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;