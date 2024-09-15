import React from 'react';
import './Work-Order-Sub-Navbar.css';
import { Link } from 'react-router-dom';

const WorkOrderSubNavbar = () => {
  return (
    <div className="sub-navbar">
      <a href={"General"}>
        <button className="nav-item active">General Info</button>
      </a>
      <a href={"Job-Notes"}>
        <button className="nav-item">Job Notes</button>
      </a>
      <a href="/Bid-Completion-Notes">
        <button className="nav-item">Bid / Completion Info</button>
      </a>
      <a href="/Photos-Documents">
        <button className="nav-item">Photos / Documents</button>
      </a>
      <a href="/Invoice">
        <button className="nav-item">Invoice</button>
      </a>
    </div>
  );
};

export default WorkOrderSubNavbar;
