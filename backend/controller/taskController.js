// taskController.js
import Task from '../schema/taskSchema.js';

// Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({ title, description, date });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndUpdate(id, req.body);
        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
