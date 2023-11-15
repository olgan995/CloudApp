import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import AllTasks from "./components/tasks/AllTasks";
import { setAuthToken } from './services/api';
import Test from "./components/tasks/Test";

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

    return isAuthenticated ? (
        element
    ) : (
        <Navigate to="/login" state={{ from: rest.location.pathname }} replace />
    );
};

const App = () => {
    // Check if the user has a token on app load and set it in the API module
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route
                    path="/tasks"
                    element={(
                        <PrivateRoute element={(
                            <Layout> <AllTasks /> </Layout>
                        )} />
                    )}
                />
                <Route path="/test" element={<Layout> <Test /> </Layout>} />
            </Routes>
        </Router>
    );
};

export default App;