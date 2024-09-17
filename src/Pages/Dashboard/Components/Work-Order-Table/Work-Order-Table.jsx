import React from 'react';
import "./Work-Order-Table.css";
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const workOrdersColumn = [
  {
    status: 'New',
    statusCls: 'new',
    wo: 'TO031863641',
    dueDate: '08-15-24',
    receivedDate: '08-15-24',
    client: 'Guardian',
    customer: 0,
    loan: 'XXXXXX6568',
    address: '24 E99th Pl',
    city: 'Chicago',
    state: 'IL',
    zip: '60628',
    contractor: 'Valerie Nelson',
    admin: 'Simon Saiful',
    workType: 'Bid'
  },
  {
    status: 'InfoSend',
    statusCls: 'info-send',
    wo: 'TO031863641',
    dueDate: '08-15-24',
    receivedDate: '08-15-24',
    client: 'Guardian',
    customer: 0,
    loan: 'XXXXXX6568',
    address: '24 E99th Pl',
    city: 'Chicago',
    state: 'IL',
    zip: '60628',
    contractor: 'Valerie Nelson',
    admin: 'Simon Saiful',
    workType: 'Bid'
  },
  // Repeat similar objects for other rows
];

function WorkOrderTable() {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Function to handle row click and navigate
  const handleRowClick = () => {
    navigate(`/General`);
  };

  return (
    <div className="work-order-container-dashboard">
    <table className="work-order-table">
      <thead>
        <tr>
          <th>Status</th>
          <th>WO#</th>
          <th>Date Due</th>
          <th>Data Received</th>
          <th>Client</th>
          <th>Customer</th>
          <th>Loan#</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Contractor</th>
          <th>Admin</th>
          <th>Work Type</th>
        </tr>
      </thead>
      <div style={{height:"5px"}}></div>
      <tbody>
        {workOrdersColumn.map((order, index) => (
          <tr key={index} className="clickable-row" onClick={() => handleRowClick()}>
            <td><span className={`status-badge ${order.statusCls}`}>{order.status}</span></td>
            <td>{order.wo}</td>
            <td>{order.dueDate}</td>
            <td>{order.receivedDate}</td>
            <td>{order.client}</td>
            <td>{order.customer}</td>
            <td>{order.loan}</td>
            <td>{order.address}</td>
            <td>{order.city}</td>
            <td>{order.state}</td>
            <td>{order.zip}</td>
            <td>{order.contractor}</td>
            <td>{order.admin}</td>
            <td>{order.workType}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default WorkOrderTable;
