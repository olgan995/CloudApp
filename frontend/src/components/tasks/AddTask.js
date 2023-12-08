import React, {useRef, useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import {transcribeAudioFile} from "../../services/api";
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import '../styles/global.css';

const AddTask = ({ showModal, handleClose, handleAddTask }) => {

    // State for form data
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
    const MAX_RECORDING_TIME = 60 * 1000;

    // Function to handle available data during recording
    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            setAudioChunks((prevChunks) => [...prevChunks, event.data]);
            const audioBlob = new Blob([...audioChunks, event.data], { type: 'audio/wav' });
            console.log('Received audio chunk:', audioBlob);

            // Send the original audio blob to the handleSendAudio function
            handleSendAudio(audioBlob);
        }
    };

    // Function to start recording audio
    const startRecording = async () => {
        try {
            // Access user's microphone and start recording
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();

            // Set timeout to stop recording after 1 Minute
            setTimeout(() => {
                stopRecording();
            }, MAX_RECORDING_TIME);

            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    // Function to stop recording audio
    const stopRecording = () => {
        try {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
                streamRef.current.getTracks().forEach((track) => track.stop());
                setIsRecording(false);

                setTimeout(() => {
                    setAudioChunks([]);
                }, 5000);
            }
        } catch (error) {
            console.error('Error stopping recording:', error.message);
        }
    };

    // Function to handle sending recorded audio
    const handleSendAudio = async (audioBlob) => {
        try {
            console.log("Original Audio Blob:", audioBlob);

            const convertedAudio = await convertAudio(audioBlob);
            console.log("Converted Audio Blob:", convertedAudio);

            // Prepare the converted audio data and send it to the backend for transcription
            const formData = new FormData();
            formData.append('audioFile', convertedAudio, 'converted.wav');

            // Log the FormData object before making the API call
            console.log('FormData (Audio to be sent):', formData);

            // Send the converted audio to the backend for transcription
            const response = await transcribeAudioFile(formData);
            const { transcription } = response;

            // Update form data with transcription result
            setFormData((prevData) => ({
                ...prevData,
                description: transcription,
            }));
            console.log('Transcription successfully!');
            console.log("Transcription Result:", transcription);
        }   catch (error) {
            console.error('Error handling audio recording:', error);
        }
    };

    // Function to Upload Audio
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    // Function to handle file change
    const handleFileChange = (event) => {
        // Update selected file and its name
        const fileInput = event.target;
        const selectedFile = fileInput.files[0];
        setSelectedFile(selectedFile);
        if (selectedFile) {
            setSelectedFileName(selectedFile.name);
        } else {
            setSelectedFileName('');
        }
    };

    // Function to handle uploading selected Audio
    const handleFileUpload = async () => {
        try {
            if (!selectedFile) {
                console.warn('No file selected.');
                return;
            }
            // Prepare file data and send it to the backend for transcription
            const formData = new FormData();
            formData.append('audioFile', selectedFile);

            // Send the recorded audio to the backend for transcription
            const response = await transcribeAudioFile(formData);
            const { transcription } = response;

            setFormData((prevData) => ({
                ...prevData,
                description: transcription,
            }));
            console.log('File uploaded successfully!');
            console.log("Transcription Result:", transcription);
        } catch (error) {
            console.error('Error uploading Audio:', error);
        }
    };

    /// Function for converting audio/webm to audio/wav with LINEAR16 encoding
    const convertAudio = async (audioBlob) => {
        return new Promise((resolve, reject) => {
            const audioContext = new AudioContext();
            const reader = new FileReader();

            reader.onload = async () => {
                try {
                    const arrayBuffer = reader.result;
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    const pcmBuffer = audioBuffer.getChannelData(0);

                    const wavBuffer = new ArrayBuffer(44 + pcmBuffer.length * 2);
                    const view = new DataView(wavBuffer);

                    const writeString = (offset, string) => {
                        for (let i = 0; i < string.length; i++) {
                            view.setUint8(offset + i, string.charCodeAt(i));
                        }
                    };

                    const floatTo16BitPCM = (output, offset, input) => {
                        for (let i = 0; i < input.length; i++, offset += 2) {
                            const s = Math.max(-1, Math.min(1, input[i]));
                            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
                        }
                    };

                    writeString(0, 'RIFF'); // RIFF header
                    view.setUint32(4, 32 + pcmBuffer.length * 2, true); // file length minus RIFF header
                    writeString(8, 'WAVE'); // RIFF type
                    writeString(12, 'fmt '); // format chunk identifier
                    view.setUint32(16, 16, true); // format chunk length
                    view.setUint16(20, 1, true); // sample format (1 for PCM)
                    view.setUint16(22, 1, true); // channel count
                    view.setUint32(24, audioBuffer.sampleRate, true); // sample rate
                    view.setUint32(28, audioBuffer.sampleRate * 2, true); // byte rate (sample rate * block align)
                    view.setUint16(32, 2, true); // block align (channel count * bytes per sample)
                    view.setUint16(34, 16, true); // bits per sample
                    writeString(36, 'data'); // data chunk identifier
                    view.setUint32(40, pcmBuffer.length * 2, true); // data chunk length

                    floatTo16BitPCM(view, 44, pcmBuffer);

                    const blob = new Blob([view], { type: 'audio/wav' });
                    resolve(blob);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(audioBlob);
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
                            className="custom-textarea"
                            maxLength={200}
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
                                <span>Choose Audio</span>
                            </label>

                            <span id="fileNameDisplay">{selectedFileName}</span>

                            <Button className="rounded-pill ml-2"
                                    onClick={handleFileUpload}
                                    disabled={!selectedFile}>
                                Transcribe
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