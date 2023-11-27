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
import UpdateTask from "./components/tasks/UpdateTask";
import TaskDetails from "./components/tasks/TaskDetails";

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
                <Route path="/update-task/:taskId" element={<PrivateRoute element={<UpdateTask />} />} />
                <Route path="/task/:taskId"
                       element={(
                           <PrivateRoute element={(
                               <Layout> <TaskDetails /> </Layout>
                           )} />
                       )}
                />
            </Routes>
        </Router>
    );
};

export default App;