import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = 'https://backend-cloud-with-db-lkqwezxwua-ey.a.run.app';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Function to set the authorization token in the request headers
const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData)
    .then(response => {
        const { token } = response.data;
        // Set the token in local storage and headers after successful login
        localStorage.setItem('token', token);
        setAuthToken(token);
        return response;
    });
export const logoutUser = (userData) => {
    // Clear the token in local storage and headers on logout
    localStorage.removeItem('token');
    setAuthToken(null);
    return api.post('/auth/logout', userData);
};
export const getAllTasks = () => api.get('/tasks');
export const createTask = (taskData) => api.post('/tasks', taskData);
export const getTaskById = (taskId) => api.get(`/tasks/${taskId}`);
export const updateTask = (taskId, taskData) => api.patch(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

const apis = {
    registerUser,
    loginUser,
    logoutUser,
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
};

export default apis;
export { setAuthToken };