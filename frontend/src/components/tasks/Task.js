import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Task = ({ task }) => {
    return (
        <Card style={{ width: '18rem', margin: '10px', backgroundColor: task.completed ? '#32CD32' : '#EA7B7B' }}>
            <Card.Body>
                <Card.Title>{task.taskName}</Card.Title>
                <Card.Text>
                    Description: {task.description}
                    <br />
                    Due Date: {task.dueDate}
                    <br />
                    Status: {task.completed ? 'Completed' : 'Incomplete'}
                </Card.Text>
                <Link to={{ pathname: `/update-task/${task.id}`, state: { task } }}>
                    <Button variant="primary">Task ändern</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Task;