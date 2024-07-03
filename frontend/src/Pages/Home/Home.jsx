import React, { useState, useEffect } from 'react';
import './Home.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

import { FaEye } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [toggleBtn, setToggleBtn] = useState(false);
    const [activeBtn, setActiveBtn] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [editingTask, setEditingTask] = useState(null); 
    const [viewingTask, setViewingTask] = useState(null); 

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', { title, description, date: startDate });
            setTasks([...tasks, response.data]);
            setToggleBtn(false);
            setActiveBtn(false);
            setTitle('');
            setDescription('');
            setStartDate(new Date());
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            const updatedTasks = tasks.filter(task => task._id !== id);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const updateTask = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedData);
            fetchTasks(); 
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const openEditForm = (task) => {
        setEditingTask(task);
    };

    const closeEditForm = () => {
        setEditingTask(null);
    };

    const submitEditForm = async () => {
        try {
            await updateTask(editingTask._id, { title: title || editingTask.title, description: description || editingTask.description, date: startDate });
            closeEditForm();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const openViewForm = (task) => {
        setViewingTask(task);
    };

    const closeViewForm = () => {
        setViewingTask(null);
    };

    return (
        <div className='homePage p-5'>
            <h1 id='homeTitle' className='p-3 mb-3'>Task Management App</h1>
            <div>
                <Button variant="outline-warning" className={activeBtn ? "active mx-5 mb-5 w-sm-50" : "mx-5 mb-5 w-sm-50"} onClick={() => { setToggleBtn(false); setActiveBtn(true); fetchTasks(); }}>Current Tasks</Button>
                <Button variant="outline-warning" className={activeBtn ? "mx-5 mb-5 w-sm-50" : "active mx-5 mb-5 w-sm-50"} onClick={() => { setToggleBtn(true); setActiveBtn(false); }}>Add a new task</Button>
            </div>

            {toggleBtn ?
                (<div className='addTaskForm m-auto bg-light rounded-3 p-5'>
                    <Form onSubmit={addTask}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter task title here" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <br />
                            <DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </Form.Group>

                        <Button type="submit" className='mt-3 py-2 px-sm-5 btn-light btn-outline-warning' id='submitBtn'>
                            Submit
                        </Button>
                    </Form>
                </div>) :
                (<Table striped bordered hover responsive className='m-auto'>
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Date</th>
                            <th>Task</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No task to show</td>
                            </tr>
                        ) : (
                            tasks.map((task, index) => (
                                <tr key={task._id}>
                                    <td>{index + 1}</td>
                                    <td>{task.date}</td>
                                    <td>{task.title}</td>
                                    <td>
                                        <FaEye size={19} onClick={() => openViewForm(task)} style={{ cursor: 'pointer' }} />
                                    </td>
                                    <td>
                                        <AiFillEdit size={20} onClick={() => openEditForm(task)} style={{ cursor: 'pointer' }} />
                                    </td>
                                    <td>
                                        <MdDeleteForever size={20} onClick={() => deleteTask(task._id)} style={{ cursor: 'pointer' }} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>)
            }

            {/* Edit Task Form */}
            {editingTask && (
                <div className='editTaskForm m-auto bg-light rounded-3 p-5 mt-5'>
                    <Form onSubmit={submitEditForm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter task title here" value={title || editingTask.title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description || editingTask.description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <br />
                            <DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </Form.Group>

                        <Button type="submit" className='mt-3 py-2 px-sm-5 btn-light btn-outline-warning' id='submitBtn'>
                            Update Task
                        </Button>
                        <Button variant="secondary" className="mt-3 ms-3 py-2 px-sm-5" onClick={closeEditForm}>
                            Cancel
                        </Button>
                    </Form>
                </div>
            )}

            {/* View Task Form */}
            {viewingTask && (
                <div className='viewTaskForm m-auto bg-light rounded-3 p-5 mt-5'>
                    <p><strong>Title:</strong> {viewingTask.title}</p>
                    <p><strong>Description:</strong> {viewingTask.description}</p>
                    <p><strong>Date:</strong> {viewingTask.date}</p>
                    <Button variant="secondary" onClick={closeViewForm}>Close</Button>
                </div>
            )}
        </div>
    );
};

export default Home;
