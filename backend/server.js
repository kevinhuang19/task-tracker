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
    db.query("INSERT INTO tasks (task, user, entry_date) VALUES (?, ?, NOW())",
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
//put request to update a certain task
app.put("/update", (req, res) => {
    const id = req.body.id;
    const task = req.body.task;
    db.query("UPDATE tasks SET task = ? WHERE id = ?",
        [task, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });

})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM tasks WHERE id = ?",
        id, (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});