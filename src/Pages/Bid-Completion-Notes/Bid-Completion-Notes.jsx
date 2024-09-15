import React, { useState } from 'react';
import './Bid-Completion-Notes.css';

const BidCompletionNotes = () => {
  const [bidItems, setBidItems] = useState([
    { description: 'All Conditions Photse', qty: 0, price: 0, contractorTotal: 0, clientPrice: 0, clientTotal: 0, comments: '' },
    { description: 'Bid Approval', qty: 0, price: 0, contractorTotal: 0, clientPrice: 0, clientTotal: 0, comments: '' },
    { description: 'Bid Icema', qty: 0, price: 0, contractorTotal: 0, clientPrice: 0, clientTotal: 0, comments: '' }
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...bidItems];
    updatedItems[index][field] = value;
    setBidItems(updatedItems);
  };

  return (
    <div className="bid-completion-container">
      <h1>Bid completion Notes</h1>
      <div className="buttons">
        <button>Show Past Completions</button>
        <button>Show Past Bids</button>
      </div>
      <table className="bid-table">
        <thead>
          <tr>
            <th>Item/Description</th>
            <th>QTY</th>
            <th>Contractor Price</th>
            <th>Contractor Total</th>
            <th>Client Price</th>
            <th>Client Total</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {bidItems.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                />
              </td>
              <td>{(item.qty * item.price).toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={item.clientPrice}
                  onChange={(e) => handleInputChange(index, 'clientPrice', e.target.value)}
                />
              </td>
              <td>{(item.qty * item.clientPrice).toFixed(2)}</td>
              <td>
                <input
                  type="text"
                  value={item.comments}
                  onChange={(e) => handleInputChange(index, 'comments', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totals">
        <div className="contractor-total">Contractor Total: $ {bidItems.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2)}</div>
        <div className="client-total">Client Total: $ {bidItems.reduce((sum, item) => sum + item.qty * item.clientPrice, 0).toFixed(2)}</div>
      </div>

      <div className="notes-section">
        <textarea placeholder="Comments/Notes"></textarea>
      </div>
      <div className="bid-sheet-section">
        <input type="text" placeholder="Client Bid Sheet Heading" />
      </div>

      <div className="action-buttons">
        <button>Save</button>
        <button>Cancel</button>
        <button>Print Contractor</button>
        <button>Print Client</button>
      </div>
    </div>
  );
};

export default BidCompletionNotes;
