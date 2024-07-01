// tests/unit/taskController.test.js

const request = require('supertest');
const app = require('../../src/app');
const TaskRepository = require('../../src/repositories/taskRepository');
const Task = require('../../src/models/Task');

describe('TaskController', () => {
    beforeEach(() => {
        TaskRepository.getAllTasks().length = 0; // Clear tasks before each test
    });

    test('GET /tasks should retrieve all tasks', async () => {
        const task1 = TaskRepository.saveTask(new Task(null, 'Task 1'));
        const task2 = TaskRepository.saveTask(new Task(null, 'Task 2'));

        await request(app)
            .get('/api/tasks')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expect.arrayContaining([task1, task2]));
            });
    });

    test('GET /tasks/:id should retrieve a task by id', async () => {
        const task = TaskRepository.saveTask(new Task(null, 'Task to retrieve'));

        await request(app)
            .get(`/api/tasks/${task.id}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(task);
            });
    });

    test('POST /tasks should create a new task', async () => {
        const taskTitle = 'New Task';

        await request(app)
            .post('/api/tasks')
            .send({ title: taskTitle })
            .expect(201)
            .then((response) => {
                expect(response.body.title).toBe(taskTitle);
            });
    });

    test('PUT /tasks/:id should update a task', async () => {
        const newTask = TaskRepository.saveTask(new Task(null, 'Task to update'));

        const updatedTitle = 'Updated Task';
        const updatedTask = { ...newTask, title: updatedTitle };

        await request(app)
            .put(`/api/tasks/${newTask.id}`)
            .send(updatedTask)
            .expect(200)
            .then((response) => {
                expect(response.body.title).toBe(updatedTitle);
            });

        const retrievedTask = TaskRepository.getTaskById(newTask.id);
        expect(retrievedTask.title).toBe(updatedTitle);
    });

    test('DELETE /tasks/:id should delete a task', async () => {
        const task = TaskRepository.saveTask(new Task(null, 'Task to delete'));

        await request(app)
            .delete(`/api/tasks/${task.id}`)
            .expect(204);

        const deletedTask = TaskRepository.getTaskById(task.id);
        expect(deletedTask).toBeUndefined();
    });
});
