import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import api from "../../services/api";
import { setAuthToken } from "../../services/api";
import Task from './Task';

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

    return (
        <Container className="mt-4">
            <h1 className="text-center all-tasks-title">Todo List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        {tasks.map((task) => (
                            <Task key={task.id} task={task} />
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AllTasks;
