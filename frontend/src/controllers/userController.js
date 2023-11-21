import axios from 'axios';

const apiURL = "http://localhost:8000";

const UserController = {
    login: async (email, password) => {
        const response = await axios.post(`${apiURL}/api/user/login`, { email, password }, { withCredentials: true });
        console.log(response.data);
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
    // add more methods here if needed
};

export default UserController;
