import React, {useEffect, useRef, useState} from 'react';
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

    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState('');

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            streamRef.current.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
            handleSendAudio();
        } else {
            console.log("failed")
        }
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            setAudioChunks([...audioChunks, event.data]);
            const audioBlob = new Blob([...audioChunks, event.data], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        }
    };

    const handleSendAudio = async () => {
        console.log("Starting handleSendAudio")
/*        if (audioChunks.length === 0) {
            console.warn('No audio recorded.');
            return;
        }*/

        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audioFile', audioBlob, 'recording.wav');
        setAudioChunks([]);

        // Log the FormData object before making the API call
        console.log('FormData:', formData);
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setAudioChunks([]); // Clear audioChunks after sending the audio

        // Send the recorded audio to the backend for transcription
        try {
            const transcription = await transcribeAudioFile(formData);
            setFormData((prevData) => ({
                ...prevData,
                description: transcription, // Update description with transcription result
            }));
        } catch (error) {
            console.error('Error accessing the microphone or starting recording:', error);
            console.error('Error:', error);
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
                                    variant={isRecording ? 'danger' : 'primary'}
                                    onClick={isRecording ? stopRecording : startRecording}
                            >
                                {isRecording ? (
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

                    <div className="d-flex justify-content-center mt-4">
                        <audio controls src={audioUrl} />
                        <Button
                            href={audioUrl}
                            variant="secondary"
                            className="rounded-pill"
                            download="recording.wav">
                            Download
                        </Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTask;