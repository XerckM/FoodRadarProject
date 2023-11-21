import axios from 'axios';

const apiURL = "http://localhost:8000";

const UserController = {
    login: async (email, password) => {
        const response = await axios.post(`${apiURL}/api/user/login`, { email, password });
        return response;
    },
    logout: async () => {
        try {
            await axios.get(`${apiURL}/api/user/logout`, { withCredentials: true });
            console.log('User logged out');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
};

export default UserController;
