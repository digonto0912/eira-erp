import React, { useState } from 'react';
import './FilterBox.css'; // Importing the CSS file

const FilterBox = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? 'Hide Filters' : 'Show Filters'}
      </button>

      {isVisible && (
        <div className="filter-box">
          <form>
            <div className="filter-row">
              <label><input type="checkbox" /> New</label>
              <label><input type="checkbox" /> Info Send</label>
              <label><input type="checkbox" /> Ready Office</label>
              <label><input type="checkbox" /> Invoiced</label>
              <label><input type="checkbox" /> Cancel</label>
              <label><input type="checkbox" /> Info Complete</label>
              <label><input type="checkbox" /> Working</label>
            </div>
            <div className="filter-row">
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="City / State" />
              <input type="text" placeholder="Zip Code" />
              <input type="text" placeholder="County" />
              <input type="text" placeholder="Work Type" />
            </div>
            <div className="filter-row">
              <input type="text" placeholder="WO #" />
              <input type="text" placeholder="PPW #" />
              <input type="text" placeholder="Loan #" />
              <input type="text" placeholder="Invoice #" />
            </div>
            <div className="filter-row">
              <select>
                <option value="">Select a Contractor</option>
              </select>
              <select>
                <option value="">Admin</option>
              </select>
              <select>
                <option value="">Client</option>
              </select>
              <select>
                <option value="">Customer</option>
              </select>
              <select>
                <option value="">Category</option>
              </select>
            </div>
            <div className="button-row">
              <button type="submit">Run</button>
              <button type="reset">Cancel</button>
              <button type="button" onClick={() => window.location.reload()}>
                Reset to Default
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
