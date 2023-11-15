import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Task = ({ title, description, dueDate, completed }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Description: {description}</Card.Text>
                <Card.Text>Due Date: {dueDate}</Card.Text>
                <Card.Text>Status: {completed ? 'Completed' : 'Incomplete'}</Card.Text>
            </Card.Body>
        </Card>
    );
};

const Test = () => {
    const tasks = [
        { title: 'Task 1', description: 'Description for Task 1', dueDate: '2023-11-30', completed: false },
        { title: 'Task 2', description: 'Description for Task 2', dueDate: '2023-12-15', completed: true },
        { title: 'Task 3', description: 'Description for Task 3', dueDate: '2023-12-31', completed: false },
        { title: 'Task 4', description: 'Description for Task 4', dueDate: '2023-11-20', completed: true },
        { title: 'Task 5', description: 'Description for Task 5', dueDate: '2023-12-05', completed: false },
    ];

    return (
        <Container className="mt-4">
            <h2 className="text-center">Todo Lists</h2>
            {tasks.map((task, index) => (
                <Task
                    key={index}
                    title={task.title}
                    description={task.description}
                    dueDate={task.dueDate}
                    completed={task.completed}
                />
            ))}
        </Container>
    );
};

export default Test;