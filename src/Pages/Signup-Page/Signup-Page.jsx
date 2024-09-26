// SignUpPage.jsx
import './Signup-Page.css';
import React, { useState } from 'react';
import img from "../../../public/Images/SignUp/building.webp";
import { useNavigate, useParams } from 'react-router-dom';

const SignUpPage = () => {
  const { type } = useParams();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    customerNumber: '',
    address: '',
    city: '',
    zip: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // Email validation using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if password and confirmPassword match
  const validatePasswords = () => {
    return formData.password === formData.confirmPassword;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Email format validation
    if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    // Password match validation
    if (!validatePasswords()) {
      validationErrors.password = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      // now send the email verification
      sendEmailVerification();

      // signup endpoint
      const response = await fetch(`http://localhost:3001/users/${type.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Signup successful!');
        navigate(`/Login/${type}`); // Redirect to login page or another page
      } else {
        alert('Failed to sign up, please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup.');
    }
  };

  const sendEmailVerification = async () => {
    try {
      // Send email verification request to your backend
      const response = await fetch('http://localhost:3001/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setEmailSent(true);
        alert('Verification email sent successfully.');
      } else {
        alert('Failed to send verification email.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  const InputForms = () => {
    const formFields = {
      Client: (
        <>
          <div>
            <label>Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} />
          </div>
          <div>
            <label>Customer Number</label>
            <input type="text" name="customerNumber" value={formData.customerNumber} onChange={handleChange} />
          </div>
        </>
      ),
      Office: null,
      Field: null,
    };

    return (
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="Signup-Form-section">
          {type === 'Client' && formFields.Client}
          {['Client', 'Office', 'Field'].includes(type) && (
            <>
              <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label>Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div>
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div>
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div>
                <label>Zip</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
              </div>
              <div>
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </>
          )}
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <div className="button-group">
          <button type="submit" className="btn signup-btn">Sign Up</button>
          <p>
            You already have an account! please <button type="button" className="btn login-btn" onClick={() => navigate('/User-Type/Login')}>Log In</button>
          </p>
        </div>
      </form>
    );
  };

  return (
    <div className="signup-page">
      <div className="signup-form-container">
        <div className="back-arrow" onClick={handleBack}>&#8592;</div>
        <h1>Welcome Sir</h1>
        <p>Please fill out crucial information fields.</p>
        {InputForms()}
        {emailSent && <p>A verification email has been sent to {formData.email}. Please verify your email.</p>}
      </div>
      <div className="image-container">
        <img src={img} alt="side image" className="sidebar-image" />
      </div>
    </div>
  );
};

export default SignUpPage;
