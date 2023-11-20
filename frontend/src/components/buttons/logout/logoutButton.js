import React from 'react';
import './loginButton.css';

const LoginButton = ({ children, ...props }) => {
    return (
        <button className="logout-button" {...props}>
            {children}
        </button>
    );
};

export default LoginButton;