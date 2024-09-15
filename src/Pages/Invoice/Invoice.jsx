import React, { useState } from 'react';
import './Invoice.css';

const Invoice = () => {
  const [invoiceItems, setInvoiceItems] = useState([
    { description: 'All Conditions Photos', qty: 0, price: 0, adjPrice: 0, total: 0, comment: '' },
  ]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [referenceId, setReferenceId] = useState('');
  const invoiceNumber = "T0031863641";

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field] = value;
    updatedItems[index].total = updatedItems[index].qty * updatedItems[index].price;
    setInvoiceItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    setSubtotal(subtotal);
    setTotal(subtotal - discount);
  };

  const handleDiscountChange = (e) => {
    setDiscount(parseFloat(e.target.value) || 0);
    setTotal(subtotal - (parseFloat(e.target.value) || 0));
  };

  const addNewItem = () => {
    setInvoiceItems([...invoiceItems, { description: '', qty: 0, price: 0, adjPrice: 0, total: 0, comment: '' }]);
  };

  const removeItem = (index) => {
    const updatedItems = invoiceItems.filter((_, i) => i !== index);
    setInvoiceItems(updatedItems);
    calculateTotals(updatedItems);
  };

  return (
    <div className="invoice-container">
      <h1>Invoice</h1>
      <div className="invoice-header">
        <div className="invoice-type">Contractor</div>
        <div>Total: ${total.toFixed(2)}</div>
        <div>Balance: ${total.toFixed(2)}</div>
        <div>Invoice #: {invoiceNumber}</div>
        <div>
          Invoice Date: <input type="date" />
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Adj. Price</th>
            <th>Total</th>
            <th>Comment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={index}>
              <td>
                <select
                  value={item.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                >
                  <option value="All Conditions Photos">All Conditions Photos</option>
                  <option value="Additional Service">Additional Service</option>
                  <option value="Inspection Fee">Inspection Fee</option>
                </select>
              </td>
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
                  value={item.adjPrice}
                  onChange={(e) => handleInputChange(index, 'adjPrice', e.target.value)}
                />
              </td>
              <td>{(item.qty * item.adjPrice).toFixed(2)}</td>
              <td>
                <input
                  type="text"
                  value={item.comment}
                  onChange={(e) => handleInputChange(index, 'comment', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => removeItem(index)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-line">
        <button onClick={addNewItem}>Add Line</button>
      </div>

      <div className="invoice-footer">
        <div>
          <label>Sub Total:</label>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div>
          <label>Cont. Discount:</label>
          <input
            type="number"
            value={discount}
            onChange={handleDiscountChange}
          />
        </div>
        <div>
          <label>Cont. Total:</label>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="reference">
        <label>Reference ID:</label>
        <input
          type="text"
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
        />
      </div>

      <div className="action-buttons">
        <button>Save Invoice</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Invoice;
