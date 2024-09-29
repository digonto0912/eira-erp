import React, { useState, useEffect } from 'react';
import './Control-Panel.css';

const ControlPanel = () => {
  const [bidCompletionItems, setBidCompletionItems] = useState([]);
  const [photosAndDocsItems, setPhotosAndDocsItems] = useState([]);
  const [photosAndDocsChildItems, setPhotosAndDocsChildItems] = useState([]);
  const [bidInput, setBidInput] = useState('');
  const [photoInput, setPhotoInput] = useState('');
  const [photoChildInput, setPhotoChildInput] = useState('');
  const [editingItemId, setEditingItemId] = useState(null); // ID of the item being edited
  const [editingValue, setEditingValue] = useState(''); // The value being edited

  // Fetch existing data when component mounts
  useEffect(() => {
    const fetchBidItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bid-items');
        if (!response.ok) throw new Error('Failed to fetch bid items');
        const data = await response.json();
        setBidCompletionItems(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPhotoItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/photo-items');
        if (!response.ok) throw new Error('Failed to fetch photo items');
        const data = await response.json();
        setPhotosAndDocsItems(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBidItems();
    fetchPhotoItems();
  }, []);

  // Add bid item
  const addBidItem = async () => {
    if (bidInput.trim()) {
      try {
        const response = await fetch('http://localhost:3001/api/bid-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item: bidInput }),
        });
        if (!response.ok) throw new Error('Failed to save bid item');
        location.reload();
      } catch (error) {
        console.error(error);
      }
      setBidInput('');
    }
  };

  // Add photo item
  const addPhotoItem = async () => {
    if (photoInput.trim()) {
      const newPhotoItem = { item: photoInput, child_item: [] }

      try {
        const response = await fetch('http://localhost:3001/api/photo-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPhotoItem),
        });
        if (!response.ok) throw new Error('Failed to save photo item');
        location.reload();
      } catch (error) {
        console.error(error);
      }
      setPhotoInput('');
    }
  };

  // add photos or docs child item
  const addPhotoChildItem = async (parentId, index) => {
    if (photoChildInput.trim()) {
      
      if (index < 0 || index >= photosAndDocsItems.length) {
        console.error(`Invalid index: ${index}`);
        return;
      }
      
      const old_childs = photosAndDocsItems[index]?.child_item;
      let container = [];
      
      if(old_childs){
        container = [
          ...old_childs, photoChildInput
        ]
      } else{
        container = [
          photoChildInput
        ]
      }

      try {
        const response = await fetch(`http://localhost:3001/api/photo-items/${parentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ child_item: container }),
        });
        if (!response.ok) throw new Error('Failed to update photo child item');
        location.reload();
      } catch (error) {
        console.error(error);
      }
      setPhotoChildInput('');
    }
  };

  // Delete item
  const deleteItem = async (collection, id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${collection}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
      location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  // Edit item
  const editItem = async (collection, id, newValue) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${collection}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: newValue }),
      });
      if (!response.ok) throw new Error('Failed to update item');
      location.reload();
    } catch (error) {
      console.error(error);
    }
    setEditingItemId(null);
    setEditingValue(''); // Clear the input after editing
  };

  // Start editing
  const startEditing = (id, currentItem) => {
    setEditingItemId(id);
    setEditingValue(currentItem); // Set the current value of the item being edited
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingItemId(null);
    setEditingValue('');
  };

  return (
    <div className="page-container">
      <div className="section">
        <h2>Bid Completion Notes</h2>
        <div className="items-box">
          {bidCompletionItems.length > 0 ? (
            bidCompletionItems.map((item, index) => (
              <div key={index} className="item">
                {editingItemId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editingValue} // Use the current editing value
                      onChange={(e) => setEditingValue(e.target.value)}
                    />
                    <button onClick={() => editItem('bid-items', item.id, editingValue)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    {item.item}
                    <button onClick={() => startEditing(item.id, item.item)}>Edit</button>
                    <button onClick={() => deleteItem('bid-items', item.id)}>Delete</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="no-items">No items added</div>
          )}
        </div>
        <input
          type="text"
          value={bidInput}
          onChange={(e) => setBidInput(e.target.value)}
          placeholder="Add a bid completion note"
        />
        <div className="button-group">
          <button onClick={addBidItem}>Add</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      </div>

      <div className="section">
        <h2>Photos and Docs</h2>
        <div className="items-box">
          {photosAndDocsItems.length > 0 ? (
            photosAndDocsItems.map((item, index) => (
              <div key={index} className="item">
                {editingItemId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editingValue} // Use the current editing value
                      onChange={(e) => setEditingValue(e.target.value)}
                    />
                    <button onClick={() => editItem('photo-items', item.id, editingValue)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    {item.item}
                    <button onClick={() => startEditing(item.id, item.item)}>Edit</button>
                    <button onClick={() => deleteItem('photo-items', item.id)}>Delete</button>
                  </>
                )}

                <div className="child-items-container">
                  <input
                    type="text"
                    value={photoChildInput}
                    onChange={(e) => setPhotoChildInput(e.target.value)}
                    placeholder="Add a child item"
                  />
                  <button onClick={() => addPhotoChildItem(item.id, index)}>Add Child Item</button>
                </div>

                <div className="child-items-list">
                  {item.child_item.length > 0 && (
                    <>
                      <span>Child Item:</span>
                      <ul>
                        {item.child_item.map((child, index) => (
                          <li key={index}>{child}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-items">No items added</div>
          )}
        </div>
        <input
          type="text"
          value={photoInput}
          onChange={(e) => setPhotoInput(e.target.value)}
          placeholder="Add a photo or document"
        />
        <div className="button-group">
          <button onClick={addPhotoItem}>Add</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;