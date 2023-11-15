import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import api from "../../services/api";
import '../styles/global.css';

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch tasks from the backend
        const fetchTasks = async () => {
            try {
                const response = await api.getAllTasks();
                setTasks(response.data);
            } catch (error) {
                setError('Error fetching tasks. Please try again.');
                console.error('Tasks fetch error:', error);
            }
        };

        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    return (
        <Container className="mt-4">
            <h1 className="text-center all-tasks-title">Todo List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        {tasks.map((task) => (
                            <ListGroup.Item
                                key={task.id}
                                style={{
                                    backgroundColor: task.completed ? '#32CD32' : '#EA7B7B'
                                }}
                            >
                                <div className="task-item">
                                    <p className="task-title">{task.taskName || 'N/A'}</p>
                                    <p>Description: {task.description}</p>
                                    <p>Due Date: {task.dueDate}</p>
                                    <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AllTasks;