// frontend/src/components/Buttons/Login/LoginButton.js
import React from 'react';
import './loginButton.css';

const LoginButton = ({ children, ...props }) => {
    return (
        <button className="login-button" {...props}>
            {children}
        </button>
    );
};

export default LoginButton;
