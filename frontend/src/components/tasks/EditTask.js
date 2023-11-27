import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {Button, Card, Container, Form} from "react-bootstrap";

const EditTask = () => {
    const [task, setTask] = useState(null);
    const { id  } = useParams();
    const navigate = useNavigate();
    const [updatedTask, setUpdatedTask] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        completed: false,
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    console.log('Fetching task with ID:', id);
                    const response = await api.getTaskById(id);
                    console.log('Fetched Task Data:', response.data);
                    setTask(response.data);

                    if (response.data.dueDate) {
                        const slicedDueDate = response.data.dueDate.slice(0, 16);
                        setUpdatedTask({
                            ...response.data,
                            dueDate: slicedDueDate,
                        });
                    } else {
                        console.warn('Task dueDate not found in response:', response.data);
                    }
                }
            } catch (error) {
                if (error.response) {
                    console.error('Server Error Response Data:', error.response.data);
                } else if (error.request) {
                    console.error('No server response received:', error.request);
                } else {
                    console.error('Error in request setup:', error.message);
                }
            }
        };

        fetchTask();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setUpdatedTask({
            ...updatedTask,
            [name]: newValue,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.updateTask(id, updatedTask);
            navigate('/tasks');
        } catch (error) {
            if (error.response) {
                console.error('Server Error Response Data:', error.response.data);
            } else if (error.request) {
                console.error('No server response received:', error.request);
            } else {
                console.error('Error in request setup:', error.message);
            }
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center">Edit Task</h2>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formTaskName" className="mt-4">
                            <Form.Label>Task Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="taskName"
                                placeholder="Enter task name"
                                value={updatedTask.taskName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mt-4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter description"
                                name="description"
                                value={updatedTask.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDueDate" className="mt-4">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dueDate"
                                value={updatedTask.dueDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCompleted" className="mt-4">
                            <Form.Check
                                type="checkbox"
                                label="Completed"
                                name="completed"
                                checked={updatedTask.completed}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center m-4">
                            <Button variant="success" type="submit" className="rounded-pill">
                                Update Task
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditTask;