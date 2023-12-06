import React, {useRef, useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import {transcribeAudioFile} from "../../services/api";
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import '../styles/global.css';

const AddTask = ({ showModal, handleClose, handleAddTask }) => {

    const [formData, setFormData] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        completed: false
    });

    // Function to handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle form submission
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

    // Audio recording functionality
    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState('');

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            setAudioChunks((prevChunks) => [...prevChunks, event.data]);
            console.log('Received audio chunk:', event.data);

            const audioBlob = new Blob([...audioChunks, event.data], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        }
    };

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
        try {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
                streamRef.current.getTracks().forEach((track) => track.stop());
                setIsRecording(false);
                handleSendAudio();
                setAudioChunks([]);
            }
        } catch (error) {
            console.error('Error stopping recording:', error.message);
        }
    };

    const handleSendAudio = async () => {
        try {
            console.log("Starting handleSendAudio()");
            console.log("Audio chunks length:", audioChunks.length);

            if (audioChunks.length === 0) {
                console.warn('No audio recorded.');
                return;
            }

            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('audioFile', audioBlob, 'recording.wav');

            // Log the FormData object before making the API call
            console.log('FormData:', formData);
            formData.forEach((value, key) => {
                console.log(key, value);
            });

            // Send the recorded audio to the backend for transcription
            try {
                const transcription = await transcribeAudioFile(formData);
                setFormData((prevData) => ({
                    ...prevData,
                    description: transcription,
                }));
                console.log("transcription", transcription);
            } catch (error) {
                console.error('Error sending audio for transcription:', error);
            }

        }   catch (error) {
            console.error('Error handling audio recording:', error);
        }
    };

    // Function to Upload Audio
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    // Function to handle file change
    const handleFileChange = (event) => {
        const fileInput = event.target;
        const selectedFile = fileInput.files[0];
        setSelectedFile(selectedFile); // Update the state with the selected file

        // Update the selected file name in the state
        if (selectedFile) {
            setSelectedFileName(selectedFile.name);
        } else {
            setSelectedFileName(''); // If no file selected, reset the selected file name
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            console.warn('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('audioFile', selectedFile);

        // Send the recorded audio to the backend for transcription
        try {
            const response = await transcribeAudioFile(formData);
            // Destructure 'transcription' from the response
            const { transcription } = response;

            setFormData((prevData) => ({
                ...prevData,
                description: transcription,
            }));
            console.log('File uploaded successfully!', transcription);
        } catch (error) {
            console.error('Error uploading file:', error);
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
                            className="custom-textarea"
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

                    <div className="d-flex justify-content-center">
                        <Form.Group controlId="audioRecording" className="mt-3">
                            <input
                                type="file"
                                id="fileInput"
                                className="input-file"
                                onChange={handleFileChange}
                                accept="audio/*"
                            />
                            <label htmlFor="fileInput" className="custom-file-upload">
                                <span>Choose File</span>
                            </label>

                            <span id="fileNameDisplay">{selectedFileName}</span>

                            <Button className="rounded-pill ml-2"
                                    onClick={handleFileUpload}
                                    disabled={!selectedFile}>
                                Upload File
                            </Button>
                        </Form.Group>
                    </div>
                    <div className="d-flex center m-3">
                        <audio controls src={audioUrl} />
                        <Button
                            href={audioUrl}
                            variant="secondary"
                            className="rounded-pill"
                            download="recording.wav">
                            Download
                        </Button>
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