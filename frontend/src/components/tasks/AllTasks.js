import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import api from "../../services/api";
import { setAuthToken } from "../../services/api";
import '../styles/global.css';
import AddTask from "./AddTask";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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

        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

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
                <Button variant="primary" className="rounded-pill"  onClick={handleShow}>
                    Add Task
                </Button>
            </div>

            {/* Render the AddTaskForm component */}
            <AddTask
                showModal={showModal}
                handleClose={handleClose}
                handleAddTask={handleAddTask}
            />

            <div className="d-flex flex-wrap justify-content-center">
                {tasks.map((task) => (
                    <Card key={task.id} className="m-2" style={{ width: '18rem' }}>
                        <Card.Body
                            style={{
                                backgroundColor: task.completed ? '#32CD32' : '#DCDCDC',
                            }}
                        >
                            <Card.Title>{task.taskName || 'N/A'}</Card.Title>
                            <Card.Text>{task.description}</Card.Text>
                            <Card.Text>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Card.Text>
                            <Card.Text>Status: {task.completed ? 'Completed' : 'Incomplete'}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>

        </Container>
    );
};

export default AllTasks;