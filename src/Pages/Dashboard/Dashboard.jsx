import React from 'react';
import "./Dashboard.css";
import WorkOrderTable from "./Components/Work-Order-Table/Work-Order-Table";
import Pagination from './Components/Pagination/Pagination';

function App() {
  return (
    <div>
      <div className="container">
        <div className='title-and-add-btn'>
          <h1>Work Orders</h1>
          <button className="add-new-btn">Add New +</button>
        </div>
        <WorkOrderTable />
        <Pagination />
      </div>
    </div>
  );
}

export default App;
