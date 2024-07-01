// tests/unit/taskService.test.js

const TaskService = require('../../src/services/taskService');
const TaskRepository = require('../../src/repositories/taskRepository');
const Task = require('../../src/models/Task');

describe('TaskService', () => {
    beforeEach(() => {
        TaskRepository.getAllTasks().length = 0; // Clear tasks before each test
    });

    test('should create a new task', () => {
        const title = 'New Task';
        const task = TaskService.createTask(title);
        expect(task.title).toBe(title);
        expect(TaskRepository.getAllTasks()).toContain(task);
    });

    test('should retrieve all tasks', () => {
        const task1 = TaskService.createTask('Task 1');
        const task2 = TaskService.createTask('Task 2');
        const tasks = TaskService.getAllTasks();
        expect(tasks).toContain(task1);
        expect(tasks).toContain(task2);
    });

    test('should update a task', () => {
        const task = TaskService.createTask('Task to update');
        const updatedTask = TaskService.updateTask(task.id, 'Updated Task', true);
        expect(updatedTask.title).toBe('Updated Task');
        expect(updatedTask.completed).toBe(true);
    });

    test('should delete a task', () => {
        const task = TaskService.createTask('Task to delete');
        TaskService.deleteTask(task.id);
        expect(TaskRepository.getAllTasks()).not.toContain(task);
    });
});
