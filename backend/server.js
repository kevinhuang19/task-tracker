const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');//allow front end to communicate to backend
const PORT = 3000;
app.use(cors());
//parse data from frontend to backend
app.use(express.json());

//connection to local database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "kevin",
    database: "tasktracker"
});
//post request to insert into tasks database
app.post("/addTask", (req, res) => {
    const task = req.body.task;
    const user = req.body.user;
    //request information and then submit query in an array
    db.query("INSERT INTO tasks (task, user) VALUES (?, ?)",
        [task, user], (err, result) => {
            if (err) console.log(err);
            else res.send("Values Inserted Successfully");
        }
    );
});
//get request to retrieve data from tasks database
app.get("/getTasks", (req, res) => {
    db.query("SELECT * FROM tasks", (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});