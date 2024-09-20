import './General.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const General = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [workOrderDetails, setWorkOrderDetails] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState(null);
  const [workOrderItems, setWorkOrderItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newItem, setNewItem] = useState({
    Description: '',
    Qty: 0,
    Price: 0,
    Total: 0,
    Additional_Instructions: '',
    Source: '',
  });
  const [editingItem, setEditingItem] = useState({
    Description: '',
    Qty: 0,
    Price: 0,
    Total: 0,
    Additional_Instructions: '',
    Source: '',
  });
  const [buttonsDisabled, setButtonsDisabled] = useState(false); // New state for disabling buttons

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/work-orders/${params.id}`
      );
      const data = await response.json();
      setWorkOrderDetails(data);
      setUpdatedDetails(data.General_Page_Infos.General_Info);
      setWorkOrderItems(data.General_Page_Infos.Work_Order_Items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to disable buttons for 3 seconds
  const disableButtonsTemporarily = () => {
    setButtonsDisabled(true);
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 1500);
  };

  // Save general info updates
  // creating in database
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/work-orders/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          General_Page_Infos: {
            General_Info: updatedDetails,
            House_Front_Image: workOrderDetails.General_Page_Infos.House_Front_Image,
            Work_Order_Last_Tracker: workOrderDetails.General_Page_Infos.Work_Order_Last_Tracker,
            Work_Order_Items: workOrderItems,
          },
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setWorkOrderDetails(updatedData);
        setIsEditing(false);
        fetchData(); // Refresh data to sync state with the database
      } else {
        console.error('Error updating data');
      }
    } catch (error) {
      console.error('Error saving updates:', error);
    }
  };

  // Work Order Item Functions
  const handleAddItem = async () => {
    disableButtonsTemporarily(); // Disable buttons for 3 seconds
    const updatedItems = [...workOrderItems, newItem];
    setWorkOrderItems(updatedItems);
    setNewItem({
      Description: '',
      Qty: 0,
      Price: 0,
      Total: 0,
      Additional_Instructions: '',
      Source: '',
    });
    await updateWorkOrderItemsInDatabase(updatedItems);
  };

  const handleEditItem = (index) => {
    disableButtonsTemporarily(); // Disable buttons for 3 seconds
    setEditingIndex(index);
    setEditingItem(workOrderItems[index]);
  };

  const handleSaveItem = async (index) => {
    disableButtonsTemporarily(); // Disable buttons for 3 seconds
    const updatedItems = [...workOrderItems];
    updatedItems[index] = editingItem;
    setWorkOrderItems(updatedItems);
    setEditingIndex(null);
    setEditingItem({
      Description: '',
      Qty: 0,
      Price: 0,
      Total: 0,
      Additional_Instructions: '',
      Source: '',
    });
    await updateWorkOrderItemsInDatabase(updatedItems);
  };

  const handleDeleteItem = async (index) => {
    disableButtonsTemporarily(); // Disable buttons for 3 seconds
    const updatedItems = workOrderItems.filter((_, i) => i !== index);
    setWorkOrderItems(updatedItems);
    await updateWorkOrderItemsInDatabase(updatedItems);
  };

  const handleNewItemInputChange = (e, field) => {
    setNewItem({
      ...newItem,
      [field]: e.target.value,
    });
  };

  const handleEditingItemInputChange = (e, field) => {
    setEditingItem({
      ...editingItem,
      [field]: e.target.value,
    });
  };

  // updating and creting database {here creating, deleteing and editing both are PUT because they just make change under a single file. not making new collection or a new file in a collection}
  const updateWorkOrderItemsInDatabase = async (updatedItems) => {
    try {
      const response = await fetch(`http://localhost:3001/work-orders/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          General_Page_Infos: {
            General_Info: updatedDetails,
            House_Front_Image: workOrderDetails.General_Page_Infos.House_Front_Image,
            Work_Order_Last_Tracker: workOrderDetails.General_Page_Infos.Work_Order_Last_Tracker,
            Work_Order_Items: updatedItems,
          },
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setWorkOrderDetails(updatedData);
        setIsEditing(false);
        fetchData(); // Sync the latest data from the server after each operation
      } else {
        console.error('Error updating items in the database');
      }
    } catch (error) {
      console.error('Error updating work order items:', error);
    }
  };

  if (!workOrderDetails) {
    return <div>Loading...</div>;
  }

  let generalInfo = updatedDetails;

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
                <th></th>
                <th>+</th>
              </tr>
            </thead>
            <tbody>
              {workOrderItems?.map((item, index) => (
                <tr key={index}>
                  <td>
                    {editingIndex === index ? (
                      <input
                        value={editingItem.Description}
                        onChange={(e) =>
                          handleEditingItemInputChange(e, 'Description')
                        }
                        disabled={buttonsDisabled} // Disable buttons
                      />
                    ) : (
                      item.Description
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        value={editingItem.Qty}
                        onChange={(e) =>
                          handleEditingItemInputChange(e, 'Qty')
                        }
                        disabled={buttonsDisabled} // Disable buttons
                      />
                    ) : (
                      item.Qty
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        value={editingItem.Price}
                        onChange={(e) =>
                          handleEditingItemInputChange(e, 'Price')
                        }
                        disabled={buttonsDisabled} // Disable buttons
                      />
                    ) : (
                      item.Price
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        value={editingItem.Total}
                        onChange={(e) =>
                          handleEditingItemInputChange(e, 'Total')
                        }
                        disabled={buttonsDisabled} // Disable buttons
                      />
                    ) : (
                      item.Total
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        value={editingItem.Additional_Instructions}
                        onChange={(e) =>
                          handleEditingItemInputChange(e, 'Additional_Instructions')
                        }
                        disabled={buttonsDisabled} // Disable buttons
                      />
                    ) : (
                      item.Additional_Instructions
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        value={editingItem.Source}
                        onChange={(e) =>
                          handleEditingItemInputChange(e, 'Source')
                        }
                        disabled={buttonsDisabled} // Disable buttons
                      />
                    ) : (
                      item.Source
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <button onClick={() => handleSaveItem(index)} disabled={buttonsDisabled}>
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleEditItem(index)} disabled={buttonsDisabled}>
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteItem(index)} disabled={buttonsDisabled}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    value={newItem.Description}
                    onChange={(e) => handleNewItemInputChange(e, 'Description')}
                    placeholder="New Description"
                    disabled={buttonsDisabled}
                  />
                </td>
                <td>
                  <input
                    value={newItem.Qty}
                    onChange={(e) => handleNewItemInputChange(e, 'Qty')}
                    placeholder="New Qty"
                    disabled={buttonsDisabled}
                  />
                </td>
                <td>
                  <input
                    value={newItem.Price}
                    onChange={(e) => handleNewItemInputChange(e, 'Price')}
                    placeholder="New Price"
                    disabled={buttonsDisabled}
                  />
                </td>
                <td>
                  <input
                    value={newItem.Total}
                    onChange={(e) => handleNewItemInputChange(e, 'Total')}
                    placeholder="New Total"
                    disabled={buttonsDisabled}
                  />
                </td>
                <td>
                  <input
                    value={newItem.Additional_Instructions}
                    onChange={(e) =>
                      handleNewItemInputChange(e, 'Additional_Instructions')
                    }
                    placeholder="New Instructions"
                    disabled={buttonsDisabled}
                  />
                </td>
                <td>
                  <input
                    value={newItem.Source}
                    onChange={(e) => handleNewItemInputChange(e, 'Source')}
                    placeholder="New Source"
                    disabled={buttonsDisabled}
                  />
                </td>
                <td colSpan="2">
                  <button onClick={handleAddItem} disabled={buttonsDisabled}>
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default General;
