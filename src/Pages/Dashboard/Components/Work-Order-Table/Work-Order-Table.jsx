import React, { useState, useEffect, useRef } from 'react';
import './Work-Order-Table.css';
import { useNavigate } from 'react-router-dom';


function WorkOrderTable() {
  const navigate = useNavigate();

  // All work Orders Datas
  const [AllWorkOrders, setAllWorkOrders] = useState(null)

  // Use refs to access the elements after render
  const boxRef = useRef(null);
  const theadRef = useRef(null);


  // Calling All Work Orders Data Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/work-orders");
        const data = await response.json();
        setAllWorkOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function on component mount
  }, []); // Empty dependency array ensures one-time fetch

  console.log(AllWorkOrders)

  // Function to handle row click and navigate
  const handleRowClick = (id) => {
    // console.log(id?.id);
    navigate(`/General/${id}`);
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
                <td onClick={() => handleRowClick(order.id)}>
                  <span className={`status-badge ${generalInfo.statusCls}`}>{generalInfo.status}</span>
                </td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.woNumber}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.dueDate}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.receivedDate}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.name}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.customerNumber}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.address}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.city}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.state}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.zip}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.contractor}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.admin}</td>
                <td onClick={() => handleRowClick(order.id)}>{generalInfo.workType}</td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}

export default WorkOrderTable;
