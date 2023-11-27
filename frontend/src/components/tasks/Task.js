import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Task = (props) => {
    const { task, handleDelete } = props;

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    };

    return (
        <Card className="m-2" style={{ width: '18rem' }}>
            <Card.Body
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: task.completed ? '#90EE90' : '#DCDCDC',
                }}
            >
                <div className="mb-2">
                    <Card.Title style={{ fontSize: '24px' }}>{task.taskName || 'N/A'}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                    <Card.Text>Due Date: {new Date(task.dueDate).toLocaleString('de-DE', options)}</Card.Text>
                    <Card.Text>Status: {task.completed ? 'Completed' : 'Incomplete'}</Card.Text>
                </div>

                <div className="d-flex justify-content-between mt-auto">

                    <Link to={{ pathname: `/update-task/${task.id}`, state: { task } }}>
                        <Button
                            className="rounded-pill w-45"
                            size="sm"
                            variant="primary"
                        >Update Task</Button>
                    </Link>

                    <Button
                        className="rounded-pill w-45"
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                    >Delete</Button>

                </div>

            </Card.Body>
        </Card>
    );
};

export default Task;