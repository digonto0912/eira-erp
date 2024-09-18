import React, { useEffect, useState } from 'react';
import './General.css';
import { useParams } from 'react-router-dom';

const General = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [workOrderDetails, setWorkOrderDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState(null);

  // Fetch Work Order Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/work-orders/${params.id}`);
        const data = await response.json();
        setWorkOrderDetails(data);
        setUpdatedDetails(data.General_Page_Infos.General_Info); // Initialize update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function on component mount
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/update/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ General_Page_Infos: { General_Info: updatedDetails } }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setWorkOrderDetails(updatedData);
        setIsEditing(false); // Exit edit mode after saving
      } else {
        console.error('Error updating data');
      }
    } catch (error) {
      console.error('Error saving updates:', error);
    }
  };

  if (!workOrderDetails) {
    return <div>Loading...</div>;
  }

  let generalInfo = updatedDetails;
  console.log(generalInfo)

  return (
    <div className="work-order-container">
      <div className="work-order-header">
        <h1>Work Order Info</h1>
      </div>

      <div className="work-order-body">
        <div className="work-order-top-part">
          {/* Left Section for Work Order Details */}
          <div className="work-order-details">
            <div>
              <button onClick={() => {
                setIsEditing(!isEditing);
                if (isEditing) {
                  location.reload()
                }
              }}>
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button onClick={handleSave}>
                  Save
                </button>
              )}
            </div>

            <div>
              <div className="general-form-group">
                <label>work Order Number</label>
                <input
                  type="text"
                  name="woNumber"
                  value={generalInfo.woNumber}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>

              <div className="general-form-group">
                <label>Work Type</label>
                <select
                  value={generalInfo.workType}
                  name='workType'
                  disabled={!isEditing} // Disable select when not editing
                  onChange={handleInputChange}
                >
                  <option value="Type1">Type 1</option>
                  <option value="Type2">Type 2</option>
                  <option value="Type3">Type 3</option>
                </select>
              </div>

              <div className="general-form-group">
                <label>Is Inspection?</label>
                <input
                  type="text"
                  name="inspection"
                  value={generalInfo?.inspection}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Customer</label>
                <input
                  type="text"
                  name="customerNumber"
                  value={generalInfo.customerNumber}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={generalInfo.address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Assigned Admin</label>
                <input
                  type="text"
                  name="admin"
                  value={generalInfo.admin}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Client Company</label>
                <input
                  type="text"
                  name="company"
                  value={generalInfo.company}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Import ID</label>
                <input
                  type="text"
                  name="email"
                  value={generalInfo.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>BATF</label>
                <input
                  type="text"
                  name="batf"
                  value={generalInfo.batf}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Contractor</label>
                <input
                  type="text"
                  name="contractor"
                  value={generalInfo.contractor != "" ? generalInfo.contractor : "Not Assigned"}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Rush?</label>
                <input
                  type="text"
                  name="rush"
                  value={generalInfo.rush ? "Yes" : "No"}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Lot Size</label>
                <input
                  type="text"
                  name="lotSize"
                  value={generalInfo.lotSize}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Lock Code</label>
                <input
                  type="text"
                  name="lotCode"
                  value={generalInfo.lotCode}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Key Code</label>
                <input
                  type="text"
                  name="KeyCode"
                  value={generalInfo.KeyCode}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* 2nd part */}
            <div>
              <div className="general-form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={generalInfo.startDate}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={generalInfo.dueDate}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Invoice Date</label>
                <input
                  type="date"
                  name="invoice_last_Complete_date"
                  value={generalInfo?.invoice_last_Complete_date}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Complete Date</label>
                <input
                  type="date"
                  name="W_O_Complete_Date"
                  value={generalInfo?.W_O_Complete_Date}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Cancel Date</label>
                <input
                  type="date"
                  name="W_O_Cancel_Date"
                  value={generalInfo?.W_O_Cancel_Date}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>


            {/* 3rd part */}
            <div>
              <div className="general-form-group">
                <label>Broker Info</label>
                <input
                  type="text"
                  name="W_O_Broker_Info"
                  value={generalInfo?.W_O_Broker_Info}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Missing Info</label>
                <input
                  type="text"
                  name="W_O_Missing_Info"
                  value={generalInfo?.W_O_Missing_Info}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="general-form-group">
                <label>Comments</label>
                <textarea
                  name="comments"
                  value={generalInfo.comments}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
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
