import React from 'react';
import './logoutButton.css';

const LogoutButton = ({ children, ...props }) => {
    return (
        <button className="logout-button" {...props}>
            {children}
        </button>
    );
};

export default LogoutButton;