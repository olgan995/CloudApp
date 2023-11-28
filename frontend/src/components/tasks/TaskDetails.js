import React, { useEffect, useState } from 'react';
import {getTaskById, setAuthToken} from "../../services/api";
import {Link, useParams} from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import '../styles/global.css';

const TaskDetails = () => {
    const [task, setTask] = useState(null);
    const { id } = useParams();
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    };

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    setAuthToken(token);
                    if (id) {
                        const response = await getTaskById(id);
                        setTask(response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="task-details-container">
            <Card className="task-details-card">
                <Card.Body>
                    <Card.Title className="mb-3">{task.taskName || 'N/A'}</Card.Title>
                    <Card.Text className="text-muted">{task.description}</Card.Text>
                    <Card.Text>Due Date: {new Date(task.dueDate).toLocaleString('de-DE', options)}</Card.Text>
                    <Card.Text>Status: {task.completed ? 'Completed' : 'Incomplete'}</Card.Text>
                </Card.Body>
            </Card>

            <div className="text-center mt-4">
                <Link to="/tasks">
                    <Button variant="primary" className="rounded-pill btn-lg">
                        All Tasks
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default TaskDetails;