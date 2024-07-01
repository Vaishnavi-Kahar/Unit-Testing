// tests/unit/taskRepository.test.js

const Task = require('../../src/models/Task');
const TaskRepository = require('../../src/repositories/taskRepository');

describe('TaskRepository', () => {
    beforeEach(() => {
        TaskRepository.getAllTasks().length = 0; // Clear tasks before each test
    });

    test('should save a task', () => {
        const task = new Task(null, 'Test Task');
        const savedTask = TaskRepository.saveTask(task);
        expect(savedTask.id).toBeDefined();
        expect(TaskRepository.getAllTasks()).toContain(savedTask);
    });

    test('should retrieve a task by id', () => {
        const task = new Task(null, 'Test Task');
        const savedTask = TaskRepository.saveTask(task);
        const retrievedTask = TaskRepository.getTaskById(savedTask.id);
        expect(retrievedTask).toEqual(savedTask);
    });

    test('should update a task', () => {
        const task = new Task(null, 'Test Task');
        const savedTask = TaskRepository.saveTask(task);
        const updatedTask = { ...savedTask, title: 'Updated Task' };
        TaskRepository.updateTask(updatedTask);
        const retrievedTask = TaskRepository.getTaskById(savedTask.id);
        expect(retrievedTask.title).toBe('Updated Task');
    });

    test('should delete a task by id', () => {
        const task = new Task(null, 'Test Task');
        const savedTask = TaskRepository.saveTask(task);
        TaskRepository.deleteTask(savedTask.id);
        expect(TaskRepository.getAllTasks()).not.toContain(savedTask);
    });
});
