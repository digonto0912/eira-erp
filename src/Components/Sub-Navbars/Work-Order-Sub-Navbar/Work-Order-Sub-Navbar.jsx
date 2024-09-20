import React from 'react';
import './Work-Order-Sub-Navbar.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

const WorkOrderSubNavbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    // Ensure you use the absolute path
    navigate(`${path}/${id}`);
  };

  return (
    <div className="sub-navbar">

      <button
        onClick={() => handleButtonClick("/General")}
        className="general-nav-item"
      >
        General Info
      </button>
      
      <button
        onClick={() => handleButtonClick("/Job-Notes")}
        className="general-nav-item"
      >
        Job Notes
      </button>
      
      <button
        onClick={() => handleButtonClick("/Bid-Completion-Notes")}
        className="general-nav-item"
      >
        Bid / Completion Info
      </button>
      
      <button
        onClick={() => handleButtonClick("/Photos-Documents")}
        className="general-nav-item"
      >
        Photos / Documents
      </button>
      
      <button
        onClick={() => handleButtonClick("/Invoice")}
        className="general-nav-item"
      >
        Invoice
      </button>
    </div>
  );
};

export default WorkOrderSubNavbar;
