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

          <a href="/Dashboard" className="bg-red">
            <li className='active-nav-btn'>Dashboard</li>
          </a>

          {userType === 'Office' && (
            <a href="/Create-Work-Order"  className="bg-yellow">
              <li>New Work Order</li>
            </a>
          )}

          {userType === 'Office' && (
            <a href="/Control-Panel" className="bg-yellow">
              <li>Control Panel</li>
            </a>
          )}

          <a href="/Waiting-Payment" className="bg-dark-red">
            <li>Waiting Payment</li>
          </a>
          <a href="/Notification" className="bg-red">
            <li>Notification</li>
          </a>

          <a href="/Notification" className="bg-red">
            <li>Profile</li>
          </a>
          <a href="/Notification" className="bg-red">
            <li>Interection 3 users</li>
          </a>
          <a href="/Notification" className="bg-red">
            <li>access limitation</li>
          </a>
          <a href="/Notification" className="bg-red">
            <li>3 type Tracking</li>
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
