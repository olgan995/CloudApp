import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8080';   // Local testing
const API_BASE_URL = 'https://test-backend-server-lkqwezxwua-od.a.run.app';   // H2 Database
//const API_BASE_URL = 'https://backend-cloud-with-db-lkqwezxwua-ey.a.run.app';   // Real Database

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

export const logoutUser = (setAuthToken) => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Clear the token in local storage
    localStorage.removeItem('token');

    // If setAuthToken is available, clear the authentication token
    if (setAuthToken) {
        setAuthToken(null);
    }

    // Send the token to the backend for invalidation using headers
    return api.post('/auth/logout', null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Logout successful:', response.data); // Log success message
        return response;
    })
    .catch(error => {
        console.error('Logout error:', error);
        throw error;
    });
};
export const getAllTasks = () => api.get('/tasks');
export const createTask = (taskData) => api.post('/tasks', taskData);
export const getTaskById = (taskId) => api.get(`/tasks/${taskId}`);
export const updateTask = (taskId, taskData) => api.patch(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export const transcribeAudioFile = async (audioFile) => {
    try {
        console.log('Sending request with data:', audioFile);
        const response = await api.post('/tasks/transcriptions', audioFile, {
            headers: {
                //"Content-Type" : 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Content-Type" : 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        /console.error('Error transcribing audio:', error);
        const errorMessage = error.response?.data?.message || 'An error occurred while transcribing audio.';
        throw new Error(errorMessage);
    }
};

export const transcribeAudioFile2 = async (audioFile) => {
    try {
        const token = localStorage.getItem('token');
        setAuthToken(token);

        console.log('Sending request with data:', audioFile);

        const formData = new FormData();
        console.log('FormData:', formData);

        formData.append('audioFile', audioFile, 'audioFile.wav');
        console.log('FormData after appending audioFile:', formData);

        const response = await api.post('/tasks/transcriptions', formData, {
            headers: {
                "Content-Type" : 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error transcribing audio:', error);
        throw error;
    }
};


export const transcribeAudioFile3 = (audioFile) => {
    return api.post('/tasks/transcriptions', audioFile, {
        headers: {
            "Content-Type" : 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
    })
        .then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Transcription failed');
            }
        })
        .catch(error => {
            console.error('Error transcribing audio:', error);
            throw error;
        });
};


const apis = {
    registerUser,
    loginUser,
    logoutUser,
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    transcribeAudioFile,
};

export default apis;
export { setAuthToken };