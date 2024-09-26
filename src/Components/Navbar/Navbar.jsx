import "./Navbar.css";
import React, { useEffect, useState } from 'react';
import user_default from "../../../public/Images/Navbar/user-default.png";

function Navbar() {
  const [userType, setUserType] = useState('');

  // Get userType from localStorage (or from your auth system)
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>EIRA™</h1>
        <ul className="nav-links">

          <a href="/Dashboard">
            <li className='active-nav-btn'>Dashboard</li>
          </a>

          {userType === 'Office' && (
            <a href="/Create-Work-Order">
              <li>New Work Order</li>
            </a>
          )}

          {userType === 'Office' && (
            <a href="/Control-Panel">
              <li>Control Panel</li>
            </a>
          )}

          <a href="/Waiting-Payment">
            <li>Waiting Payment</li>
          </a>
          <a href="/Notification">
            <li>Notification</li>
          </a>

        </ul>
      </div>
      <div className="navbar-right">
        <span>Simon Saiful</span>
        <img src={user_default} alt="Profile" className="profile-icon" />
      </div>
    </nav>
  );
}

export default Navbar;
