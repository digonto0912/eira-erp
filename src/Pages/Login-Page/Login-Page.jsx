// LoginPage.jsx
import './Login-Page.css'; // Import the CSS file
import React, { useState } from 'react';
import img from "../../../public/Images/SignUp/building.webp";
import { useNavigate, useParams } from 'react-router-dom';

const LoginPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const type = params.type;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error messages

    try {
      // Replace the URL with your actual backend login endpoint
      const response = await fetch(`http://localhost:3001/users/${type}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token or any relevant data here if needed
        alert('Login successful!');
        navigate('/dashboard'); // Redirect to the dashboard page
      } else {
        // Handle errors such as incorrect credentials
        setErrorMessage(data.message || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="back-arrow" onClick={handleBack}>&#8592;</div>
        <h1>Welcome Sir</h1>
        <p>Please fill out crucial information fields.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="button-group">
            <button type="submit" className="btn login-btn">Log In</button>
            <button type="button" className="btn signup-btn" onClick={() => navigate('/Signup-Type')}>Sign Up</button>
          </div>
        </form>
      </div>
      <div className="image-container">
        <img src={img} alt="side image" className="sidebar-image" />
      </div>
    </div>
  );
};

export default LoginPage;
