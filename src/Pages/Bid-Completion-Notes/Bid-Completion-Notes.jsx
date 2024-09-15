import React, { useState } from 'react';
import './Bid-Completion-Notes.css';

const BidCompletionNotes = () => {
  const [items, setItems] = useState([
    { id: 1, description: 'All Conditions Photse', qty: 0, contractorPrice: 0, clientPrice: 0, completionTotal: 1.00 },
    { id: 2, description: 'Bid Approval', qty: 0, contractorPrice: 0, clientPrice: 0, completionTotal: 0 },
    { id: 3, description: 'Bid Icema', qty: 0, contractorPrice: 0, clientPrice: 0, completionTotal: 0 },
  ]);

  const [comments, setComments] = useState('');
  const [clientBidSheetHeading, setClientBidSheetHeading] = useState('');

  const handleAddLine = () => {
    const newItem = {
      id: items.length + 1,
      description: '',
      qty: 0,
      contractorPrice: 0,
      clientPrice: 0,
      completionTotal: 0,
    };
    setItems([...items, newItem]);
  };

  const calculateTotal = (field) => {
    return items.reduce((sum, item) => sum + Number(item[field]), 0).toFixed(2);
  };

  return (
    <div className="bid-completion-container">
      <h1>Bid completion Notes</h1>
      <div className="button-group">
        <button>Show Past Completions</button>
        <button>Show Past Bids</button>
      </div>
      <div className="main-content">
        <div className="button-group">
          <button>Save</button>
          <button>cancel</button>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ITEM/DESCRIPTION</th>
              <th>QTY</th>
              <th colSpan="2">CONTRACTOR</th>
              <th colSpan="3">CLIENT</th>
              <th colSpan="2">Completion info</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>PRICE</th>
              <th>TOTAL</th>
              <th>PRICE</th>
              <th>TOTAL</th>
              <th>COMMENTS</th>
              <th>TOTAL</th>
              <th>COMMENTS</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td><input type="checkbox" /></td>
                <td>{item.description}</td>
                <td><input type="number" value={item.qty} /></td>
                <td><input type="number" value={item.contractorPrice} /></td>
                <td>{(item.qty * item.contractorPrice).toFixed(2)}</td>
                <td><input type="number" value={item.clientPrice} /></td>
                <td>{(item.qty * item.clientPrice).toFixed(2)}</td>
                <td><input type="text" /></td>
                <td>{item.completionTotal.toFixed(2)}</td>
                <td><input type="text" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddLine} className="add-line-button">+ Add Line</button>
        <div className="total-display">
          <div className="total-contractor">
            Total : $ {calculateTotal('contractorPrice')}
          </div>
          <div className="total-client">
            Total : $ {calculateTotal('clientPrice')}
          </div>
        </div>
        <div className="comments-section">
          <h2>Comments/Notes</h2>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <div className="client-heading-section">
          <h2>Client Bid Sheet Heading</h2>
          <input
            type="text"
            value={clientBidSheetHeading}
            onChange={(e) => setClientBidSheetHeading(e.target.value)}
          />
        </div>
        <div className="button-group">
          <div>
            <button>Save</button>
            <button>Cancel</button>
          </div>
          <div>
            <button>Print Contractor</button>
            <button>Print Client</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCompletionNotes;