// General.jsx
import './General.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkOrderDetails from './Components/WorkOrderDetails';
import WorkOrderItems from './Components/WorkOrderItems';
import OfficeImageStatus from './Components/OfficeImageStatus'

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
  const [isClient, setIsClient] = useState(false);
  const [isField, setIsField] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);



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


  // Function to disable buttons for 3 seconds
  const disableButtonsTemporarily = () => {
    setButtonsDisabled(true);
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 1500);
  };

  // ... (Other functions for updating work order items remain the same)

  // Get userType from localStorage (or from your auth system)
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setIsClient(storedUserType === 'Client');
    setIsField(storedUserType === 'Field');
    setIsAdmin(storedUserType === 'Admin');
  }, [params]);

  // handling input section sections
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
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

  // handle edited items in w.o. items 
  const handleEditItem = (index) => {
    disableButtonsTemporarily(); // Disable buttons for 3 seconds
    setEditingIndex(index);
    setEditingItem(workOrderItems[index]);
  };

  // same the edited items in w.o. items 
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

  // handel delete items in w.o. items
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
          <WorkOrderDetails
            generalInfo={generalInfo}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            setIsEditing={setIsEditing}

          />
          <OfficeImageStatus isClient={isClient} />
        </div>
        <WorkOrderItems
          workOrderItems={workOrderItems}
          buttonsDisabled={buttonsDisabled}
          handleEditItem={handleEditItem}
          handleSaveItem={handleSaveItem}
          handleDeleteItem={handleDeleteItem}
          handleNewItemInputChange={handleNewItemInputChange}
          handleEditingItemInputChange={handleEditingItemInputChange}
          handleAddItem={handleAddItem}
          newItem={newItem}
          editingIndex={editingIndex}
          editingItem= {editingItem}
        />
      </div>
    </div>
  );
};

export default General;