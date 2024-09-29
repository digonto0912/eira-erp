// WorkOrderItems.jsx
import React from 'react';

const WorkOrderItems = ({ workOrderItems, buttonsDisabled, handleEditItem, handleSaveItem, handleDeleteItem, handleNewItemInputChange, handleEditingItemInputChange, handleAddItem, newItem, editingIndex, editingItem }) => {
  return (
    <div className="work-order-items">
      {/* ... (Table and related logic from the original code) */}
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
  );
};

export default WorkOrderItems;