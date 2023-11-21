import React, { useState } from 'react';
import { Form, Button, Container} from 'react-bootstrap';
import '../styles/global.css';
import api from "../../services/api";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRegister = () => {
        // Validate that username, email, and password are not empty
        if (!username || !email || !password) {
            setError('All fields are required.');
            return;
        }

        const userData = { username, email, password };
        api.registerUser(userData)
            .then(response => {
                console.log('Registration successful:', response.data);
                setSuccess('Registration successful. Please Login!');
                navigate('/login', { state: { successMessage: 'Registration successful. Please Login!' } });
            })
            .catch(error => {
                console.error('Registration error:', error);
                setError('Registration failed');
            });
    };

    return (
        <Container className="d-flex align-items-center justify-content-center custom-container">
            <div className="custom-box">
                <Form className="custom-form">
                    {success !== null && <p style={{ color: 'green' }}>{success}</p>}
                    {error !== null && <p style={{ color: 'red' }}>{error}</p>}
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            required
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            value={email}
                            required
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={handleRegister} className="rounded-pill">
                        Register
                    </Button>

                    <p className="mt-3">
                        Already have an account? <Link to="/login">Login here</Link>.
                    </p>


                </Form>
            </div>
        </Container>
    );
};

export default Register;