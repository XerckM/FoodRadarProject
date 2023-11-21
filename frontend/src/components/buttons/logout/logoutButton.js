import React from 'react';
import './logoutButton.css';

const LogoutButton = ({ children, ...props }) => {
    const buttonClassName = className || 'logout-button';
    return (
        <button className={buttonClassName} {...props}>
            {children}
        </button>
    );
};

export default LogoutButton;