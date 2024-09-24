import "./Navbar.css";
import React from 'react';
import { Link } from 'react-router-dom';
import user_default from "../../../public/Images/Navbar/user-default.png";

function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>EIRA™</h1>
        <ul className="nav-links">

          <Link to="/Dashboard">
            <li className='active-nav-btn'>Dashboard</li>
          </Link>
          <Link to="/Create-Work-Order">
            <li>New Work Order</li>
          </Link>
          <Link to="/Control-Panel">
            <li>Control Panel</li>
          </Link>
          <Link to="/Waiting-Payment">
            <li>Waiting Payment</li>
          </Link>
          <Link to="/Notification">
            <li>Notification</li>
          </Link>

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
