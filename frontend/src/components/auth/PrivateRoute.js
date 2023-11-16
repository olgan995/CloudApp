import React from 'react';
import {Link} from "react-router-dom";

const PrivateRoute = ({ element }) => {

    const isAuthenticated = !!localStorage.getItem('token');

    // If user is not authenticated, display an unauthorized message
    if (!isAuthenticated) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title text-center">Unauthorized Access</h1>
                                <p className="card-text text-center">
                                    You are not authorized to access this page.
                                </p>
                                <p className="card-text text-center">
                                    Please <Link to="/login">Log in</Link> to access this content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return element;
};

export default PrivateRoute;