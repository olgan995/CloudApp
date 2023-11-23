import React, { useState, useEffect } from 'react';
import {Button, Container} from 'react-bootstrap';
import api from "../../services/api";
import { setAuthToken } from "../../services/api";
import Task from './Task';
import AddTask from "./AddTask";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    setAuthToken(token);
                    const response = await api.getAllTasks();
                    setTasks(response.data);
                }
            } catch (error) {
                setError('Error fetching tasks. Please try again.');
                console.error('Tasks fetch error:', error);
            }
        };

        fetchTasks();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleAddTask = async (formData) => {
        try {
            const response = await api.createTask(formData);
            console.log('Task created:', response.data);

            handleClose();

            // Fetch tasks again after adding a new task
            const updatedTasks = await api.getAllTasks();
            setTasks(updatedTasks.data);

        } catch (error) {
            setError('Error adding task. Please try again.');
            console.error('Task add error:', error);
        }
    };


    return (
        <Container className="mt-4">

            <h1 className="text-center all-tasks-title">Todo List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="d-flex justify-content-center m-3">
                <Button variant="primary" className="rounded-pill" onClick={handleShow}>
                    Add Task
                </Button>

                {/* Render the AddTask component */}
                <AddTask
                    showModal={showModal}
                    handleClose={handleClose}
                    handleAddTask={handleAddTask}
                />
            </div>

            <div className="d-flex m-3">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>

        </Container>
    );
};

export default AllTasks;