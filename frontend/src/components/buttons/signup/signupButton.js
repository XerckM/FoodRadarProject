// frontend/src/components/Buttons/Login/LoginButton.js
import React from 'react';
import './signupButton.css';

const SignupButton = ({ children, ...props }) => {
    const buttonClassName = className || 'signup-button';
    return (
        <button className={buttonClassName} {...props}>
            {children}
        </button>
    );
};

export default SignupButton;
