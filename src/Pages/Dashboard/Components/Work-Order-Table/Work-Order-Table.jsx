import React, { useState, useEffect, useRef } from 'react';
import './Work-Order-Table.css';
import { useNavigate } from 'react-router-dom';


function WorkOrderTable() {
  const navigate = useNavigate();

  // All work Orders Datas
  const [AllWorkOrders, setAllWorkOrders] = useState()

  // Calling All Work Orders Data Api
  useEffect(() => {
    fetch("http://localhost:3001/getWorkOrder")
      .then((res) => res.json())
      .then((data) => setAllWorkOrders(data))
  }, [])

  console.log(AllWorkOrders)

  // Use refs to access the elements after render
  const boxRef = useRef(null);
  const theadRef = useRef(null);

  // Function to handle row click and navigate
  const handleRowClick = () => {
    navigate(`/General`);
  };

  // Function to check scrollbar visibility
  const checkScrollbar = () => {

    const box = boxRef.current;
    const thead = theadRef.current;

    if (box && thead) {
      const hasScrollbar = box.scrollHeight > box.clientHeight;


      if (hasScrollbar) {
        thead.classList.add('scroll-on');
        thead.classList.remove('scroll-off');
      } else {
        thead.classList.add('scroll-off');
        thead.classList.remove('scroll-on');
      }
    }
  };

  // UseEffect to check scrollbar on mount and on resize
  useEffect(() => {
    checkScrollbar(); // Initial check
  }, [AllWorkOrders]);

  return (
    <div className="work-order-container-dashboard">
      <table id="table-box" className="work-order-table">
        <div className="top-head-background"></div>
        <thead ref={theadRef} id="thead" className="scroll-off">
          <tr>
            <th className="dashboard-table-checkbox"><input type="checkbox" name="checkbox" /></th>
            <th>Status</th>
            <th>WO#</th>
            <th>Date Due</th>
            <th>Data Received</th>
            <th>Client</th>
            <th>Customer</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Contractor</th>
            <th>Admin</th>
            <th>Work Type</th>
          </tr>
        </thead>
        <tbody ref={boxRef}>
          {AllWorkOrders?.map((order, index) => {
            // Correctly declare the variable here
            const generalInfo = order.General_Page_Infos.General_Info;

            // Explicitly return the JSX
            return (
              <tr key={index} className="clickable-row">
                <td className="dashboard-table-checkbox"><input type="checkbox" name="checkbox" /></td>
                <td onClick={handleRowClick}>
                  <span className={`status-badge ${generalInfo.statusCls}`}>{generalInfo.status}</span>
                </td>
                <td onClick={handleRowClick}>{generalInfo.woNumber}</td>
                <td onClick={handleRowClick}>{generalInfo.dueDate}</td>
                <td onClick={handleRowClick}>{generalInfo.receivedDate}</td>
                <td onClick={handleRowClick}>{generalInfo.name}</td>
                <td onClick={handleRowClick}>{generalInfo.customerNumber}</td>
                <td onClick={handleRowClick}>{generalInfo.address}</td>
                <td onClick={handleRowClick}>{generalInfo.city}</td>
                <td onClick={handleRowClick}>{generalInfo.state}</td>
                <td onClick={handleRowClick}>{generalInfo.zip}</td>
                <td onClick={handleRowClick}>{generalInfo.contractor}</td>
                <td onClick={handleRowClick}>{generalInfo.admin}</td>
                <td onClick={handleRowClick}>{generalInfo.workType}</td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}

export default WorkOrderTable;
