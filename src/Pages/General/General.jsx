import React from 'react';
import './General.css';

const General = () => {
  return (
    <div className="work-order-container">
      <div className="work-order-header">
        <h1>Work Order Info</h1>
      </div>

      <div className="work-order-body">
        {/* Left Section for Work Order Details */}
        <div className="work-order-details">
          <div className="form-group">
            <label>WO #</label>
            <input type="text" value="TO031836:841" readOnly />
          </div>
          <div className="form-group">
            <label>PPW #</label>
            <input type="text" value="14962" readOnly />
          </div>
          <div className="form-group">
            <label>Work Type</label>
            <input type="text" value="Bid" readOnly />
          </div>
          <div className="form-group">
            <label>Is Inspection?</label>
            <input type="text" value="No" readOnly />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value="74 E 59th Pl, Chicago, IL 60628" readOnly />
          </div>
          <div className="form-group">
            <label>Client Company</label>
            <input type="text" value="Guardian" readOnly />
          </div>
          <div className="form-group">
            <label>Import ID</label>
            <input type="text" value="ftxGenerals@gmail.com" readOnly />
          </div>
          <div className="form-group">
            <label>Assigned Admin</label>
            <input type="text" value="Simon Sarful" readOnly />
          </div>
          <div className="form-group">
            <label>Contractor</label>
            <input type="text" value="Valerie Nelson (ARCPI IL064713057)" readOnly />
          </div>
          <div className="form-group">
            <label>Rush?</label>
            <input type="text" value="No" readOnly />
          </div>
          <div className="form-group">
            <label>Lock Code</label>
            <input type="text" value="3681" readOnly />
          </div>
          <div className="form-group">
            <label>Key Code</label>
            <input type="text" value="35241" readOnly />
          </div>
          <div className="form-group">
            <label>Received Date</label>
            <input type="text" value="August 15, 2024" readOnly />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input type="text" value="May 1, 2024" readOnly />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="text" value="August 16, 2024" readOnly />
          </div>
          <div className="form-group">
            <label>Client Due Date</label>
            <input type="text" value="August 17, 2024" readOnly />
          </div>
          <div className="form-group">
            <label>Comments</label>
            <textarea value="Provide bid for fascia repair, clear gutter, fence repair, roof tarp and roof repair. Secure basement door with clear scope of work and supporting photos." readOnly />
          </div>
        </div>

        {/* Right Section for Office and Image Status */}
        <div className="general-page-right-half">
          <div className="work-order-status">
            <h2>Ready for Office</h2>
            <input type="checkbox" checked readOnly />
            <div className="date-info">
              <p>08-17-2024 12:28 PM by Valerie Nelson</p>
            </div>
            <div className="other-status">
              <label>Office Locked</label>
              <input type="checkbox" />
              <label>Freeze Property</label>
              <input type="checkbox" />
            </div>
          </div>

          {/* Image Section */}
          <div className="image-section">
            <h3>Front of House (Image)</h3>
            <div className='imageBG'>
              <img src="house-image-url.jpg" alt="Front of House" />
            </div>
          </div>

          {/* Check-In Section */}
          <div className="check-in-section">
            <div>
              <h4>Mobile Check-In</h4>
              <p>User: V Nelson</p>
              <p>Date: Aug 15, 4:04 PM</p>
            </div>
            <div>
              <h4>Check In Sync</h4>
              <p>Sent: Successful</p>
            </div>
          </div>
        </div>

        {/* Work Order Item Details */}
        <div className="work-order-items">
          <h3>Work Order Item Details</h3>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Additional Instructions</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All Conditions Photos</td>
                <td>0</td>
                <td>0.00</td>
                <td>0.00</td>
                <td></td>
                <td>Auto</td>
              </tr>
              <tr>
                <td>Obtaining Bid</td>
                <td>1</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>Provide bid for fascia repair, clear gutter, fence repair, roof tarp, and roof repair.</td>
                <td>Import</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default General;
