// TaskById.js
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const TaskById = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`/api/tasks/${id}`);
                if (!response.ok) {
                    throw new Error('Task not found');
                }
                const data = await response.json();
                setTask(data);
            } catch (error) {
                console.error('Error fetching task:', error);

                navigate('/tasks');
            }
        };

        fetchTask();
    }, [id, navigate]);

    const handleUpdateTaskClick = () => {
        if (task) {
            navigate(`/update-task/${id}`, { state: { task } });
        } else {
            console.error('Task not found');

            navigate('/tasks');
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Task Details</h2>
            {task && (
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Task Name:</strong> {task.taskName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Description:</strong> {task.description}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Due Date:</strong> {task.dueDate}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Status:</strong> {task.completed ? 'Completed' : 'Incomplete'}
                            </ListGroup.Item>
                        </ListGroup>
                        <Button variant="primary" onClick={handleUpdateTaskClick}>
                            Update Task
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default TaskById;
