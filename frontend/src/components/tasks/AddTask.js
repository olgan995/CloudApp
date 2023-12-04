import React, {useRef, useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import {transcribeAudioFile} from "../../services/api";
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const AddTask = ({ showModal, handleClose, handleAddTask }) => {

    const [formData, setFormData] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        completed: false
    });
    const [recording, setRecording] = useState(false);
    const audioChunksRef = useRef([]);
    const mediaRecorderRef = useRef(null);

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

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size) {
                    audioChunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setFormData((prevData) => ({
                    ...prevData,
                    audioFile: audioBlob, // Save the recorded audio as a File in the form data
                }));
                audioChunksRef.current = [];

                // Send the recorded audio to the backend for transcription
                try {
                    const transcription = await transcribeAudioFile(audioBlob);
                    setFormData((prevData) => ({
                        ...prevData,
                        description: transcription, // Update description with transcription result
                    }));
                } catch (error) {
                    console.error('Error accessing the microphone or starting recording:', error);
                    console.error('Error:', error);
                }
            };

            mediaRecorderRef.current.start();
            setRecording(true);

            setTimeout(() => {
                if (mediaRecorderRef.current.state !== 'inactive') {
                    mediaRecorderRef.current.stop();
                    setRecording(false);
                }
            }, 60000); // Stop recording after 1 minute (60 seconds)
        } catch (error) {
            console.error('Error accessing the microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
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

                    <div className="d-flex justify-content-center">
                        <Form.Group controlId="audioRecording" className="mt-3">
                            <Button className="rounded-pill"
                                    variant={recording ? 'danger' : 'primary'}
                                    onClick={recording ? stopRecording : startRecording}
                            >
                                {recording ? (
                                    <>
                                        <FaMicrophoneSlash /> Stop
                                    </>
                                ) : (
                                    <>
                                        <FaMicrophone /> Start
                                    </>
                                )}
                            </Button>
                        </Form.Group>
                    </div>

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