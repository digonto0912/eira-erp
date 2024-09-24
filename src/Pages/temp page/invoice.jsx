import React from "react";
import './invoice.css';

const PaymentInvoicePage = () => {
  return (
    <div className="payment-invoice-container">
      {/* Contractor Payment Section */}
      <div className="payment-section">
        <h3>Contractor</h3>
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

      {/* Client Invoice Section */}
      <div className="invoice-section">
        <div className="invoice-header">
          <span className="client-name">Client</span>
          <div className="total-balance">
            <span>Total: $0.00</span>
            <span>Balance: $0.00</span>
          </div>
        </div>
        <div className="invoice-table">
          <div className="invoice-item">
            <select>
              <option>All Conditions Photos</option>
              {/* Add more options if needed */}
            </select>
            <input type="text" placeholder="Qty" />
            <input type="text" placeholder="Price" />
            <input type="text" placeholder="Total" />
          </div>
          <button className="add-line-btn">Add Line</button>
          <div className="invoice-summary">
            <label>Sub Total</label>
            <input type="text" placeholder="Enter Sub Total" />
            <label>Cont. Discount</label>
            <input type="text" placeholder="Enter Discount" />
            <label>Cont. Total</label>
            <input type="text" placeholder="Enter Cont. Total" />
          </div>
          <div className="invoice-actions">
            <input type="checkbox" id="invoice-complete" />
            <label htmlFor="invoice-complete">Invoice complete</label>
            <input type="checkbox" id="credit-memo" />
            <label htmlFor="credit-memo">Credit Memo</label>
            <div className="invoice-buttons">
              <button className="save-invoice-btn">Save Invoice</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoicePage;
