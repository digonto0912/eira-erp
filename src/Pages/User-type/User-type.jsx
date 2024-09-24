// SelectionPage.jsx
import React from 'react';
import './User-type.css'; // Import the CSS file
import { useNavigate, useParams } from 'react-router-dom';

const UserType = () => {
  const params = useParams()
  const navigate = useNavigate();

  const Input_Type = params.Input_Type
  const handleBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  return (
    <div className="selection-page">
      <div className="back-arrow" onClick={handleBack}>&#8592;</div>
      <div className="button-container">
        <a href={`/${Input_Type}/Field`}>
          <button className="btn field-worker-btn">Field Worker</button>
        </a>
        <a href={`/${Input_Type}/Office`}>
          <button className="btn office-admin-btn">Office Admin</button>
        </a>
        <a href={`/${Input_Type}/Client`}>
          <button className="btn client-btn">Client</button>
        </a>
      </div>
    </div>
  );
};

export default UserType;
