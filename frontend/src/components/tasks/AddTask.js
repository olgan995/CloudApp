import React, {useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddTask = ({ showModal, handleClose, handleAddTask }) => {

    const [formData, setFormData] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        completed: false
    });
    const [recording, setRecording] = useState(false); // Zustand für die Aufnahme
    const handleRecord = () => {
        // Implementieren Sie hier die Logik für die Sprachaufnahme
        // Beachten Sie, dass Sie möglicherweise eine externe Bibliothek oder ein API verwenden müssen.
        // Hier ist ein Beispiel, wie Sie die Aufnahme mit Web-APIs starten könnten:
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                setRecording(true);
                // Hier können Sie die Logik für die Aufnahme des Audiostreams implementieren
            })
            .catch((error) => {
                console.error('Error accessing microphone:', error);
            });
    };

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
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
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
                            placeholder="Enter task name"
                            value={formData.taskName}
                            onChange={handleChange}

                        />
                    </Form.Group>

                    <Form.Group controlId="taskDescription" className="mt-3">
                        <Form.Label>Task Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Enter task description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button
                        variant={recording ? 'danger' : 'primary'}
                        className="rounded-pill mt-3"
                        onClick={recording ? () => setRecording(false) : handleRecord}
                    >
                        {recording ? 'Stop Recording' : 'Start Recording'}
                    </Button>

                    <Form.Group controlId="taskDueDate" className="mt-3">
                        <Form.Label>Due Date:</Form.Label>
                        <Form.Control
                            type="datetime-local"
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