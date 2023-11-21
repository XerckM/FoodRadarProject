import axios from 'axios';

const apiURL = "http://localhost:8000";

const UserController = {
    login: async (email, password) => {
        const response = await axios.post(`${apiURL}/api/user/login`, { email, password });
        return response;
    },
    // Add other methods as needed
};

export default UserController;
