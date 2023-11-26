import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {Button, Card, Container, Form} from "react-bootstrap";

const EditTask = () => {
    const [task, setTask] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [updatedTask, setUpdatedTask] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        completed: false,
    });
    //const formattedDueDate = updatedTask.dueDate ? updatedTask.dueDate.slice(0, 16) : '';

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.getTaskById(id);
                setTask(response.data);
                console.log('Fetched Task Data:', response.data);

                // Format the due date received from the backend
                const formattedDueDate = response.data.dueDate.toLocaleString('de-DE', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'UTC'
                });

                setUpdatedTask({
                    ...response.data,
                    dueDate: response.data.dueDate.slice(0, 16),
                });
                console.log('Updated Task Due Date:', formattedDueDate); // Log the dueDate
                console.log('Due Date:', updatedTask.dueDate);
            } catch (error) {
                console.error('Error fetching task details:', error);
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
            console.error('Error updating task:', error);
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