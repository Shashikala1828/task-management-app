const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');


const port = 3000;     // for prduction mode
app.use(express.static(path.join(__dirname, 'build')));

//const port = 8080;  // for dev mode
//app.use(cors());



let tasks = []; // This will hold our tasks in-memory

app.use(bodyParser.json());


// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const task = { id: tasks.length + 1, ...req.body };
    tasks.push(task);
    res.status(201).json(task);
});

// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Update an existing task
app.put('/api/tasks/:id', (req, res) => {
    
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        Object.assign(task, req.body);
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
    
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.status(204).send();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
  });
app.listen(port, () => {
    console.log(`Task Management API is running at http://localhost:${port}`);
});
