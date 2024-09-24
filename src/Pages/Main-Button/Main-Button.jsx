// ButtonsPage.jsx
import React from 'react';
import './Main-Button.css'; // Import the CSS file

const MainButton = () => {
    return (
        <div className="buttons-container">
            <a href="User-type/Login">
                <button className="btn login-btn">Login</button>
            </a>
            <a href="User-type/Signup">
                <button className="btn signup-btn">Signup</button>
            </a>
        </div>
    );
};

export default MainButton;
