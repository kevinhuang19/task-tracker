import './App.css';
import { useState } from "react";
import Axios from 'axios';


function App() {

    const [task, setTask] = useState('');
    const [user, setUser] = useState('');

    const addTask = () => {
        Axios.post("http://localhost:3000/addTask", {
            task: task,
            user: user
        }).then(() => {
            console.log('success');
        });
    };

    return (
        <div className="App">
            <div className="information">
                <label>Task</label>
                <input type="text" onChange={(event) => (setTask(event.target.value))} />
                <label>Assigned To</label>
                <input type="text" onChange={(event) => (setUser(event.target.value))} />
                <button onClick={addTask}>Add Task</button>
            </div>
        </div>
    );
}

export default App;