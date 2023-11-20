// frontend/src/controllers/UserController.js
import axios from 'axios';

const baseURL = "http://localhost:8000";

const UserController = {
    login: async (email, password) => {
        const response = await axios.post(`${baseURL}/api/user/login`, { email, password });
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    // Other user-related methods can be added here
};

export default UserController;
