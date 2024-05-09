import express from 'express';
import { Task } from '../models/taskModel.js';

const router = express.Router();

// Route to Save a new Task
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.task ||
      !request.body.description ||
      !request.body.priority ||
      !request.body.deadline
    ) {
      return response.status(400).send({
        message: 'Send all required fields: task, description, priority, deadline',
      });
    }
    const newTask = {
      task: request.body.task,
      description: request.body.description,
      priority: request.body.priority,
      deadline: request.body.deadline
    };

    const task = await Task.create(newTask);

    return response.status(201).send(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const tasks = await Task.find({});

    return response.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Task from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const task = await Task.findById(id);

    return response.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Task
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.task ||
      !request.body.description ||
      !request.body.priority ||
      !request.body.deadline ||
      !request.body.status
    ) {
      return response.status(400).send({
        message: 'Send all required fields: task, description, priority, deadline, status',
      });
    }

    const { id } = request.params;

    const result = await Task.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Task not found' });
    }

    return response.status(200).send({ message: 'Task updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a task
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Task.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Task not found' });
    }

    return response.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
