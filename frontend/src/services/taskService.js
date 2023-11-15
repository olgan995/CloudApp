import api from "./api";

const fetchTasks = async () => {
    try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        // Make a request to get all tasks with authorization header
        const response = await api.getAllTasks({
            headers: {
                Authorization: `Bearer ${token}`, // Attach token to the request headers
            },
        });

        // Handle the response data accordingly
        console.log('All tasks:', response.data);
        // Return the tasks data
        return response.data;
    } catch (error) {
        // Handle errors
        console.error('Error fetching tasks:', error);
        // Throw the error to be handled by the calling function/component
        throw error;
    }
};

export default fetchTasks;