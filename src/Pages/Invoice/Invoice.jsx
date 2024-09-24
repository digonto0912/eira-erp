import React, { useState } from 'react';
import './Invoice.css';

const Invoice = () => {
  // Contractor invoice items state
  const [invoiceItems, setInvoiceItems] = useState([
    { description: 'All Conditions Photos', qty: 0, price: 0, adjPrice: 0, total: 0, comment: '' },
  ]);

  // Client invoice items state
  const [clientInvoiceItems, setClientInvoiceItems] = useState([
    { description: 'All Conditions Photos', qty: 0, price: 0, total: 0, comment: '' }
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [clientSubtotal, setClientSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [clientDiscount, setClientDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [clientTotal, setClientTotal] = useState(0);
  const [referenceId, setReferenceId] = useState('');
  const invoiceNumber = "T0031863641";

  const handleInputChange = (index, field, value, isClient = false) => {
    const updatedItems = isClient ? [...clientInvoiceItems] : [...invoiceItems];
    updatedItems[index][field] = value;
    updatedItems[index].total = updatedItems[index].qty * updatedItems[index].price;
    isClient ? setClientInvoiceItems(updatedItems) : setInvoiceItems(updatedItems);
    calculateTotals(isClient ? updatedItems : invoiceItems, isClient);
  };

  const calculateTotals = (items, isClient = false) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    if (isClient) {
      setClientSubtotal(subtotal);
      setClientTotal(subtotal - clientDiscount);
    } else {
      setSubtotal(subtotal);
      setTotal(subtotal - discount);
    }
  };

  const handleDiscountChange = (e, isClient = false) => {
    const discountValue = parseFloat(e.target.value) || 0;
    if (isClient) {
      setClientDiscount(discountValue);
      setClientTotal(clientSubtotal - discountValue);
    } else {
      setDiscount(discountValue);
      setTotal(subtotal - discountValue);
    }
  };

  const addNewItem = (isClient = false) => {
    const newItem = { description: '', qty: 0, price: 0, total: 0, comment: '' };
    if (isClient) {
      setClientInvoiceItems([...clientInvoiceItems, newItem]);
    } else {
      setInvoiceItems([...invoiceItems, newItem]);
    }
  };

  const removeItem = (index, isClient = false) => {
    const updatedItems = isClient
      ? clientInvoiceItems.filter((_, i) => i !== index)
      : invoiceItems.filter((_, i) => i !== index);
    isClient ? setClientInvoiceItems(updatedItems) : setInvoiceItems(updatedItems);
    calculateTotals(updatedItems, isClient);
  };

  return (
    <div className="invoice-container">
      <h1>Invoice</h1>

      {/* Contractor and Client Invoice Section */}
      <div className="payment-invoice-container">

        {/* Contractor Invoice Section */}
        <div>
          <div className="invoice-header">
            <div className="invoice-type">Contractor</div>
            <div>Total: ${total.toFixed(2)}</div>
            <div>Balance: ${total.toFixed(2)}</div>
            <div>Invoice #: {invoiceNumber}</div>
            <div>Invoice Date: <input type="date" /></div>
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
            <button onClick={() => addNewItem(false)}>Add Line</button>
          </div>

          <div className='client-invoice-footer'>
            <div>
              <div>
                <p>
                  Comment
                </p>
                <input type="text" name="comment" id="#" />
              </div>
              <div>
                  <p>Reference ID</p>
                  <input type="text" name="Reference_ID" id="" />
                </div>
            </div>


            <div className="invoice-footer">
              <div>
                <label>Sub Total:</label>
                <span>${clientSubtotal.toFixed(2)}</span>
              </div>
              <div>
                <label>Client Discount:</label>
                <input
                  type="number"
                  value={clientDiscount}
                  onChange={(e) => handleDiscountChange(e, true)}
                />
              </div>
              <div>
                <label>Client Total:</label>
                <span>${clientTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Client Invoice Section */}
        <div className="invoice-section">
          <div className="invoice-header">
            <span className="client-name">Client</span>
            <div className="total-balance">
              <span>Total: ${clientTotal.toFixed(2)}</span>
              <span>Balance: ${clientTotal.toFixed(2)}</span>
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Comment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clientInvoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={item.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value, true)}
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
                      onChange={(e) => handleInputChange(index, 'qty', e.target.value, true)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleInputChange(index, 'price', e.target.value, true)}
                    />
                  </td>
                  <td>{(item.qty * item.price).toFixed(2)}</td>
                  <td>
                    <input
                      type="text"
                      value={item.comment}
                      onChange={(e) => handleInputChange(index, 'comment', e.target.value, true)}
                    />
                  </td>
                  <td>
                    <button onClick={() => removeItem(index, true)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="add-line">
            <button onClick={() => addNewItem(true)}>Add Line</button>
          </div>

          <div className='client-invoice-footer'>
            <div>
              <div>
                <p>
                  Comment
                </p>
                <input type="text" name="comment" id="#" />
              </div>
              <div>
                <div>
                  <p>Invoice Complete</p>
                  <input type="checkbox" name="Invoice_Complete" id="" />
                </div>
                <div>
                  <p>Credit memo</p>
                  <input type="checkbox" name="Credit_Memos" id="" />
                </div>
              </div>
            </div>


            <div className="invoice-footer">
              <div>
                <label>Sub Total:</label>
                <span>${clientSubtotal.toFixed(2)}</span>
              </div>
              <div>
                <label>Client Discount:</label>
                <input
                  type="number"
                  value={clientDiscount}
                  onChange={(e) => handleDiscountChange(e, true)}
                />
              </div>
              <div>
                <label>Client Total:</label>
                <span>${clientTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Contractor Payment Section */}
      <div className="payment-section">
        <h3>Contractor Payment</h3>
        <div className="payment-details">
          <div className="input-group">
            <label>Payment Date</label>
            <input type="text" placeholder="Enter Date" />
          </div>
          <div className="input-group">
            <label>Amount</label>
            <input type="text" placeholder="Enter Amount" />
          </div>
          <div className="input-group">
            <label>Check #</label>
            <input type="text" placeholder="Enter Check #" />
          </div>
          <div className="input-group">
            <label>Comment</label>
            <input type="text" placeholder="Enter Comment" />
          </div>
          <div className="input-group checkbox-group">
            <input type="checkbox" id="charge-back" />
            <label htmlFor="charge-back">Charge Back</label>
          </div>
          <button className="save-btn">Save Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
