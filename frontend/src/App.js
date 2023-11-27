import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import AllTasks from "./components/tasks/AllTasks";
import { setAuthToken } from './services/api';
import PrivateRoute from "./components/auth/PrivateRoute";
import TaskDetails from "./components/tasks/TaskDetails";
import EditTask from "./components/tasks/EditTask";

const App = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
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

                <Route path="/task/:id"
                       element={(
                           <PrivateRoute element={(
                               <Layout> <TaskDetails /> </Layout>
                           )} />
                       )}
                />

                <Route path="/update-task/:id"
                       element={(
                           <PrivateRoute element={(
                               <Layout> <EditTask /> </Layout>
                           )} />
                       )}
                />
            </Routes>
        </Router>
    );
};

export default App;