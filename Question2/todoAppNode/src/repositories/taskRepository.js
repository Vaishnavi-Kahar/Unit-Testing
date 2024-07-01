// src/repositories/taskRepository.js

const Task = require('../models/Task');

let tasks = [];
let nextId = 1;

class TaskRepository {
    static getAllTasks() {
        return tasks;
    }

    static getTaskById(id) {
        return tasks.find(task => task.id === id);
    }

    static saveTask(task) {
        task.id = nextId++;
        tasks.push(task);
        return task;
    }

    static updateTask(updatedTask) {
        const index = tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
            tasks[index] = updatedTask;
        }
        return updatedTask;
    }

    static deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
    }
}

module.exports = TaskRepository;

