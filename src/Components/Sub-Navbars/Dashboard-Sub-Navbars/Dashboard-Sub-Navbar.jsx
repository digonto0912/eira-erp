import React from 'react';
import './Dashboard-Sub-Navbar.css';
import { Link } from 'react-router-dom';

const DashboardSubNavbar = () => {
  return (
    <div className="sub-navbar">
        <button className="Dashboard-nav-item active">Columns</button>
        <button className="Dashboard-nav-item">Filter</button>
    </div>
  );
};

export default DashboardSubNavbar;
