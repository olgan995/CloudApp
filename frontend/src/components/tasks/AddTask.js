import React, {useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
const AddTask = ({ showModal, handleClose, handleAddTask }) => {

    const [formData, setFormData] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        completed: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTask(formData);
        // Clear the form fields after submission if needed
        setFormData({
            taskName: '',
            description: '',
            dueDate: '',
            completed: false
        });
    };

    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            style={{ marginLeft: '0', transform: 'translateX(-32%)' }}
        >
            <Modal.Header closeButton >
                <Modal.Title className="w-100 text-center">Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="taskName" className="mt-3">
                        <Form.Label>Task Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="taskName"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter task name"
                        />
                    </Form.Group>

                    <Form.Group controlId="taskDescription" className="mt-3">
                        <Form.Label>Task Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter task description"
                        />
                    </Form.Group>

                    <Form.Group controlId="taskDueDate" className="mt-3">
                        <Form.Label>Due Date:</Form.Label>
                        <Form.Control
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="success" type="submit" className="rounded-pill">
                            Save Task
                        </Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTask;