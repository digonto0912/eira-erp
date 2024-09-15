import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar() {
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>EIRA™</h1>
        <ul className="nav-links">
          <Link to="/"><li>Dashboard</li></Link>
          <Link to="/Create-Work-Order"><li>New Work Order</li></Link>
          <li>Control Panel</li>
          <li>Waiting Payment</li>
          <li>Notification</li>
        </ul>
      </div>
      <div className="navbar-right">
        <span>Simon Saiful</span>
        <img src="profile_icon.png" alt="Profile" className="profile-icon" />
      </div>
    </nav>
  );
}

export default Navbar;
