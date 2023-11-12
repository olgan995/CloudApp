import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../styles/global.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        api.loginUser(userData)
            .then((response) => {
                console.log('User logged in successfully:', response.data);
                navigate('/tasks');
            })
            .catch((error) => {
                setError('Invalid credentials. Please try again.');
                console.error('Login error:', error);
            });
    };

    return (
        <Container className="d-flex align-items-center justify-content-center custom-container">
            <div className="custom-box">
                <Form className="custom-form">
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            required
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