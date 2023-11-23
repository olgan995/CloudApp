import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../services/api";
import moment from "moment-timezone";

const UpdateTask = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        completed: false,
    });
    const [updatedTask, setUpdatedTask] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        completed: false,
    });
    const [hasChanges, setHasChanges] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.getTaskById(taskId);
                console.log(response.data)
                setTask(response.data);

                // Konvertiere das ISO-8601-Format in ein unterstütztes Format
                const formattedDueDate = moment(response.data.dueDate).format('YYYY-MM-DDTHH:mm');
                setUpdatedTask({ ...response.data, dueDate: formattedDueDate });
            } catch (error) {
                console.error('Error fetching task:', error);
                navigate('/tasks');
            }
        };

        fetchTask();
    }, [taskId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
        setHasChanges(true);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: checked });
        setHasChanges(true);
    };

    const handleUpdateTask = async () => {
        console.log('handleUpdateTask wird aufgerufen');

        try {
            console.log('in try reingegangen');
            if (task) {
                console.log('in if reingegangen');
                await api.updateTask(taskId, updatedTask)

                console.log('Aufgabe erfolgreich aktualisiert');
                setUpdateSuccess(true);
                setHasChanges(false);

                // Navigiere zurück zum Menü nach erfolgreicher Aktualisierung
                navigate(`/tasks`);
            } else {
                console.error('Fehler beim Aktualisieren der Aufgabe: task ist undefined');
            }
        } catch (error) {
            console.error('Fehler beim Aktualisieren der Aufgabe:', error);
        }
    };

    const handleResetForm = () => {
        console.log('handleResetForm wird aufgerufen');

        if (task) {
            // Setzen Sie updatedTask auf die aktuellen Werte von task zurück
            setUpdatedTask({
                taskName: task.taskName,
                description: task.description,
                dueDate: task.dueDate || '',
                completed: task.completed,
            });
        }
        setHasChanges(false);
        setUpdateSuccess(false);
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Aufgabe bearbeiten</h2>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task name"
                                name="taskName"
                                value={updatedTask.taskName || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter description"
                                name="description"
                                value={updatedTask.description || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dueDate"
                                value={updatedTask.dueDate || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCompleted">
                            <Form.Check
                                type="checkbox"
                                label="Completed"
                                name="completed"
                                checked={updatedTask.completed}
                                onChange={handleCheckboxChange}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleUpdateTask}>
                            Update Task
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UpdateTask;
