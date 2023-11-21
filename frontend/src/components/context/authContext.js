import React, { createContext, useState } from 'react';
import UserController from '../../controllers/userController';
import UserModel from '../../models/userModel';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const user = await UserController.login(email, password);
            const newUser = new UserModel(user.data);
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('token', newUser.token);
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // rethrow the error to be handled by the caller
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};
