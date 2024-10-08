import React, { useEffect, useState } from 'react';
import './Work-Order-Sub-Navbar.css';
import { useParams, useNavigate } from 'react-router-dom';

const WorkOrderSubNavbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  // Get userType from localStorage (or from your auth system)
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const handleButtonClick = (path) => {
    // Ensure you use the absolute path
    navigate(`${path}/${id}`);
    location.reload()
  };

  return (
    <div className="sub-navbar">

      <button
        onClick={() => handleButtonClick("/General")}
        className="general-nav-item bg-red"
      >
        General Info
      </button>

      <button
        onClick={() => handleButtonClick("/Job-Notes")}
        className="general-nav-item bg-red"
      >
        Job Notes
      </button>

      {userType === 'Office' && (
        <button
          onClick={() => handleButtonClick("/Bid-Completion-Notes")}
          className="general-nav-item bg-red"
        >
          Bid / Completion Info
        </button>
      )}

      <button
        onClick={() => handleButtonClick("/Photos-Documents")}
        className="general-nav-item"
      >
        Photos / Documents
      </button>

      {userType === 'Office' && (
        <button
          onClick={() => handleButtonClick("/Invoice")}
          className="general-nav-item"
        >
          Invoice
        </button>
      )}

    </div>
  );
};

export default WorkOrderSubNavbar;
