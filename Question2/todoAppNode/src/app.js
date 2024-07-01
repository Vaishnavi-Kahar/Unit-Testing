// src/app.js

const express = require('express');
const taskController = require('./controllers/taskController');

const app = express();

app.use(express.json());
app.use('/api', taskController);

module.exports = app;

