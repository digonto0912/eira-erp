import React, { useState } from 'react';
import "./Column-Manager.css";

const ColumnManager = () => {
  // Initial active and inactive columns
  const [activeColumns, setActiveColumns] = useState([
    'Status', 'WO #', 'Date Due', 'Date Received', 'Client', 'Customer', 'Loan #', 'Address', 'City', 'State', 'Zip', 'Contractor', 'Admin'
  ]);

  const [inactiveColumns, setInactiveColumns] = useState([
    'Status Sub', 'FN Sync', 'FN Photos', 'World4PP Crew', 'PPW #', 'Date Created', 'Ready Office', 'Client Date Due', 'Sent to Client', 'Complete Date', 'Estimated Complete Date', 'Cancel Date', 'Start Date'
  ]);

  // Handle drag and drop
  const handleDragStart = (e, column, fromActive) => {
    e.dataTransfer.setData('column', column);
    e.dataTransfer.setData('fromActive', fromActive);
  };

  const handleDrop = (e, toActive) => {
    const column = e.dataTransfer.getData('column');
    const fromActive = e.dataTransfer.getData('fromActive') === 'true';

    if (toActive && !activeColumns.includes(column)) {
      setActiveColumns([...activeColumns, column]);
      setInactiveColumns(inactiveColumns.filter(item => item !== column));
    } else if (!toActive && !inactiveColumns.includes(column)) {
      setInactiveColumns([...inactiveColumns, column]);
      setActiveColumns(activeColumns.filter(item => item !== column));
    }
  };

  const handleSave = () => {
    // Logic for saving selected active columns to display in the table
    console.log('Active columns saved:', activeColumns);
  };

  return (
    <div className="column-manager">
      <div className="column-status-box">
        <div>
          <h3>Active</h3>
          <div className="column-section">
            <ul
              className="ColumnBoxUl active-columns"
              onDrop={e => handleDrop(e, true)}
              onDragOver={e => e.preventDefault()}
            >
              {activeColumns.map((column, index) => (
                <li
                  key={index}
                  draggable
                  onDragStart={e => handleDragStart(e, column, true)}
                >
                  {column}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3>Inactive</h3>
          <div className="column-section">
            <ul
              className="ColumnBoxUl inactive-columns"
              onDrop={e => handleDrop(e, false)}
              onDragOver={e => e.preventDefault()}
            >
              {inactiveColumns.map((column, index) => (
                <li
                  key={index}
                  draggable
                  onDragStart={e => handleDragStart(e, column, false)}
                >
                  {column}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="column-options">
          <label>
            <input type="checkbox" />
            Show line numbers
          </label>
          <label>
            <input type="checkbox" />
            Freeze Icons Column
          </label>
        </div>

        <div className="column-actions">
          <button onClick={handleSave}>Save</button>
          <button>Cancel</button>
          <button>Reset to Default</button>
        </div>
      </div>
    </div>
  );
};

export default ColumnManager;
