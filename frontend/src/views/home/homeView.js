// frontend/src/views/home/homeView.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../components/buttons/logout/logoutButton';
import GooglePlaces from "../../components/google/googlePlaces";
import { AuthContext } from '../../components/context/authContext';

export const HomeView = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div>
            <LogoutButton className="logout-button" onClick={handleLogout}>Logout</LogoutButton>
            <GooglePlaces />
        </div>
    );
};
