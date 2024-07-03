// tasks.js
import express from 'express';
const router = express.Router();
import { createTask, getAllTasks, updateTask, deleteTask } from '../controller/taskController.js';

// Define routes
router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;