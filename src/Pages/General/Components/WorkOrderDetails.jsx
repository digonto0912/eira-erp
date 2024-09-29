// WorkOrderDetails.jsx
import React from 'react';

const WorkOrderDetails = ({ generalInfo, isEditing, handleInputChange, handleSave, setIsEditing }) => {
  return (
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
      {/* ... (Rest of the input fields from the original code's left section) */}

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
  );
};

export default WorkOrderDetails;