// DashboardSubNavbar.js
import React, { useState } from 'react';
import './Dashboard-Sub-Navbar.css'; // Importing styles
import FilterBox from './Component/Filter-Box/Filter-Box';
import ColumnManager from './Component/Column-Manager/Column-Manager';

const DashboardSubNavbar = () => {
  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const [columnManagerIsVisible, setColumnManagerIsVisible] = useState(false);

  const toggleFilterVisibility = () => {
    if (columnManagerIsVisible){
      setColumnManagerIsVisible(!columnManagerIsVisible);
    }
    setFilterIsVisible(!filterIsVisible);
  };
  
  const toggleColumnManagerVisibility = () => {
    if (filterIsVisible){
      setFilterIsVisible(!filterIsVisible);
    }
    setColumnManagerIsVisible(!columnManagerIsVisible);
  };

  return (
    <div className="sub-navbar">
      <button className="Dashboard-nav-item active" onClick={toggleColumnManagerVisibility}>Columns</button>
      <button className="Dashboard-nav-item" onClick={toggleFilterVisibility}>Filter</button>

      {/* Filter Box component */}
      {filterIsVisible && <FilterBox />}
      {/* column Manager component */}
      {columnManagerIsVisible && <ColumnManager />}
    </div>
  );
};

export default DashboardSubNavbar;
