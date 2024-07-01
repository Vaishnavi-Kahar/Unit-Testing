// src/controllers/taskController.js

const express = require('express');
const router = express.Router();
const TaskService = require('../services/taskService');

router.use(express.json());

router.get('/tasks', (req, res) => {
    const tasks = TaskService.getAllTasks();
    res.json(tasks);
});

router.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = TaskService.getTaskById(parseInt(id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

router.post('/tasks', (req, res) => {
    const { title } = req.body;
    const task = TaskService.createTask(title);
    res.status(201).json(task);
});

router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTask = TaskService.updateTask(parseInt(id), title, completed);
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    TaskService.deleteTask(parseInt(id));
    res.sendStatus(204);
});

module.exports = router;


