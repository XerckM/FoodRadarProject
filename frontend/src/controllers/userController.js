import axios from 'axios';

const apiURL = "http://localhost:8000";

const UserController = {
    login: async (email, password) => {
        const response = await axios.post('/api/user/login', { email, password });
        return response.data;
    },
    // Add other methods as needed
};

export default UserController;
