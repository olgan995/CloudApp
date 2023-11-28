import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import {logoutUser} from '../../services/api';

const Logout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            setSuccess(location.state.successMessage);
            localStorage.setItem('logoutSuccessMessage', location.state.successMessage);
        }
    }, [location.state]);

    const handleLogout = () => {
        logoutUser();
        navigate('/login', { state: { successMessage: 'Logout successful. Please login again!' } });
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <div className="text-center">
                    <h2>Are you sure you want to log out?</h2>
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <Button variant="primary" onClick= {handleLogout}>
                        Logout
                    </Button>
                </div>
            </Row>
        </Container>
    );
};

export default Logout;