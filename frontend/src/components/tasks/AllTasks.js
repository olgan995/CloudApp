import React, { useState, useEffect } from 'react';
import {Button, Container} from 'react-bootstrap';
import api from "../../services/api";
import { setAuthToken } from "../../services/api";
import Task from './Task';
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";

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

    // State to manage the visibility of a modal/dialog
    const [showModal, setShowModal] = useState(false);
    // Function to show the modal/dialog
    const handleShow = () => setShowModal(true);
    // Function to close the modal/dialog
    const handleClose = () => setShowModal(false);
    // Function to handle the addition of a new task
    const handleAddTask = async (formData) => {
        try {
            const response = await api.createTask(formData);
            console.log('Task created:', response.data);

            // Closing the modal/dialog after successfully adding a task
            handleClose();

            // Fetching the updated list of tasks after adding a new task
            const updatedTasks = await api.getAllTasks();
            setTasks(updatedTasks.data);

        } catch (error) {
            setError('Error adding task. Please try again.');
            console.error('Task add error:', error);
        }
    };
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };
    const handleDelete = (taskId) => {
        setTaskToDelete(taskId);
        handleShowDeleteModal();
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await api.deleteTask(taskToDelete);
            console.log('Deleted Task Response:', response.data);

            // Filter out the deleted task from the current state
            const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
            setTasks(updatedTasks);

            // Fetch tasks again after deleting a task
            const refreshedTasks = await api.getAllTasks();
            setTasks(refreshedTasks.data);

            handleCloseDeleteModal();
        } catch (error) {
            setError('Error deleting task. Please try again.');
            console.error('Task delete error:', error);
        }
    };


    return (
        <Container className="mt-4">

            <h1 className="text-center all-tasks-title">Todo List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="d-flex justify-content-center m-3">
                <Button variant="primary" className="rounded-pill btn-lg" onClick={handleShow}>
                    Add Task
                </Button>

                {/* Render the AddTask component */}
                <AddTask
                    showModal={showModal}
                    handleClose={handleClose}
                    handleAddTask={handleAddTask}
                />
            </div>

            {/* Render the DeleteTask component */}
            <DeleteTask
                showModal={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDeleteTask={handleDeleteConfirm}
            />

            <div className="d-flex m-3">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} handleDelete={handleDelete} />
                ))}
            </div>

        </Container>
    );
};

export default AllTasks;