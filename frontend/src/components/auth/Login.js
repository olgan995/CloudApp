import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import '../styles/global.css';
import api from '../../services/api';

const Login = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const successFromRegister = location.state && location.state.successMessage;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleLogin = async (e) => {
        console.log("handle Login")
        e.preventDefault();
        try {
            const response = await api.loginUser(userData);
            const { token } = response.data;

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Logging success message
            console.log('Token set in localStorage:', localStorage.getItem('token'));
            console.log('User logged in successfully:', response.data);

            // Navigating to /tasks after the state is updated
            navigate('/tasks');
            console.log('User navigated to /tasks');
        } catch (error) {
            // Handling errors
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    setError('Invalid credentials. Please double-check your username and password.');
                } else if (status === 400) {
                    setError('Bad request. Please ensure all required fields are filled correctly.');
                } else {
                    setError('An error occurred. Please try again later.');
                    console.error('Login error:', error);
                }
            } else {
                setError('An error occurred. Please try again later.');
                console.error('Login error:', error);
            }
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center custom-container">
            <div className="custom-box">
                <Form className="custom-form">
                    {successFromRegister && <p style={{ color: 'green' }}>{successFromRegister}</p>}
                    {error !== null && <p style={{ color: 'red' }}>{error}</p>}
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleLogin}>
                        Login
                    </Button>

                    <p className="mt-3">
                        Don't have an account? <Link to="/register">Register here</Link>.
                    </p>
                </Form>
            </div>
        </Container>
    );

};

export default Login;