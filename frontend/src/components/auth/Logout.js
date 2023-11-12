import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import api from '../../services/api';

const Logout = () => {
    const navigate = useNavigate();

    const clearAuthentication = () => {
        localStorage.removeItem('authToken');
    };

    const handleLogout = () => {
        api.logoutUser()
            .then(() => {
                clearAuthentication();
                navigate('/login');
            })
            .catch(error => {
                console.error('Logout error:', error);
                clearAuthentication();
                navigate('/login');
            });
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <div className="text-center">
                    <h2>Are you sure you want to log out?</h2>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Row>
        </Container>
    );
};

export default Logout;