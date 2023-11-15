import React from 'react';
import {Link} from "react-router-dom";

const PrivateRoute = ({ element }) => {

    const isAuthenticated = !!localStorage.getItem('token');

    // If user is not authenticated, display an unauthorized message
    if (!isAuthenticated) {
        return (
            <div>
                <h1>Unauthorized Access</h1>
                <p>You are not authorized to access this page.</p>
                <p>Please log in to access this content.</p>
                <Link to="/login">Log in</Link>
            </div>
        );
    }

    return element;
};

export default PrivateRoute;