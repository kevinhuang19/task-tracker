const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const PORT = 3000;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "kevin",
    database: "tasktracker"
});

app.post("/addTask", (req, res) => {
    const task = req.body.task;
    const user = req.body.user;

    db.query("INSERT INTO tasks (task, user) VALUES (?, ?)",
        [task, user], (err, result) => {
            if (err) console.log(err);
            else res.send("Values inserted successfully");
        }
    );
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});