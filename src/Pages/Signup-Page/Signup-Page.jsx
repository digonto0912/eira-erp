import './Signup-Page.css';
import React, { useRef, useState } from 'react';
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
  const [submittedCode, setSubmittedCode] = useState(''); // Code input by user
  const [serverCode, setServerCode] = useState(''); // Code sent from server
  const emailSent = useRef(false); // Track if email is sent
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    let validationErrors = {};
    if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!validatePasswords()) {
      validationErrors.password = "Passwords do not match";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Trigger email verification first
      await sendEmailVerification(); // Assuming this handles sending the email and returning the code

      console.log(emailSent.current);
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup.');
    }

  };


  const sendEmailVerification = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch('http://localhost:3001/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        const data = await response.json();
        setServerCode(data.code);
        console.log(data.code);
        
        emailSent.current = true; // Prompt user for code
        // After email is sent, system waits for user input of code
      } else {
        alert('Failed to send verification email.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setIsSubmitting(false);
    }
  };

  const handleCodeSubmit = async () => {
    // Check if the submitted code matches the server code
    if (submittedCode === serverCode) {
      await completeSignUp();
    } else {
      alert('Incorrect verification code. Please try again.');
    }
  };

  const completeSignUp = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${type.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Signup successful!');
        navigate(`/Login/${type}`); // Redirect to login page
      } else {
        alert('Failed to sign up, please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-form-container">
        <div className="back-arrow" onClick={handleBack}>&#8592;</div>
        <h1>Welcome Sir</h1>
        <p>Please fill out crucial information fields.</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="Signup-Form-section">
            {type === 'Client' && (
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
            )}
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
          </div>

          {/* If email has been sent, show code input */}
          {emailSent.current && (
            <div>
              <div className="verification-section">
                <label>Enter the 6-digit code sent to your email:</label>
                <input
                  type="text"
                  value={submittedCode}
                  onChange={(e) => setSubmittedCode(e.target.value)}
                  maxLength="6"
                />
              </div>
              <button type="button" onClick={handleCodeSubmit}>
                Submit Code
              </button>
            </div>
          )}

          {/* Single "Sign Up" button */}
          <div className="button-group">
            <button type="submit" className="btn signup-btn" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Sign Up'}
            </button>
          </div>
        </form>

        {emailSent.current && <p>A verification email has been sent to {formData.email}. Please verify your email.</p>}
      </div>
      <div className="image-container">
        <img src={img} alt="side image" className="sidebar-image" />
      </div>
    </div>
  );
};

export default SignUpPage;
