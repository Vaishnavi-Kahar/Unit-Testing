// src/services/taskService.js

const TaskRepository = require('../repositories/taskRepository');
const Task = require('../models/Task');

class TaskService {
    static getAllTasks() {
        return TaskRepository.getAllTasks();
    }

    static getTaskById(id) {
        return TaskRepository.getTaskById(id);
    }

    static createTask(title) {
        const task = new Task(null, title);
        return TaskRepository.saveTask(task);
    }

    static updateTask(id, title, completed) {
        const existingTask = TaskRepository.getTaskById(id);
        if (!existingTask) {
            return null;
        }
        const updatedTask = {
            ...existingTask,
            title: title !== undefined ? title : existingTask.title,
            completed: completed !== undefined ? completed : existingTask.completed
        };
        return TaskRepository.updateTask(updatedTask);
    }

    static deleteTask(id) {
        TaskRepository.deleteTask(id);
    }
}

module.exports = TaskService;
