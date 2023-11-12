import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

const Test = () => {
    const tasks = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
        { id: 3, title: 'Task 3', completed: false },
        { id: 4, title: 'Task 4', completed: true },
        { id: 5, title: 'Task 5', completed: false },
    ];

    return (
        <Container className="mt-4">
            <h2 className="text-center">Todo Tasks</h2>
            <ListGroup>
                {tasks.map((task) => (
                    <ListGroup.Item key={task.id} className="d-flex justify-content-between">
                        <span>{task.title}</span>
                        <span>{task.completed ? 'Completed' : 'Incomplete'}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Test;