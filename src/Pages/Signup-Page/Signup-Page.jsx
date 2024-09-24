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

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
    // Perform validation checks here (e.g., password match, required fields)

    try {
      // Replace the URL with your actual backend endpoint
      const response = await fetch(`http://localhost:3001/users/${type.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      
      if (response.ok) {
        // Handle successful signup
        alert('Signup successful!');
        navigate('/Login'); // Redirect to login page or another page
      } else {
        // Handle errors
        alert('Failed to sign up, please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup.');
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
          <button type="button" className="btn login-btn" onClick={() => navigate('/Login')}>Log In</button>
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
      </div>
      <div className="image-container">
        <img src={img} alt="side image" className="sidebar-image" />
      </div>
    </div>
  );
};

export default SignUpPage;
