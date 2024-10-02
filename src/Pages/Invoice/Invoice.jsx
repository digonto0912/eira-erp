import React, { useEffect, useRef, useState } from 'react';
import './Invoice.css';
import { useParams } from 'react-router-dom';

const Invoice = () => {
  const params = useParams();
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [clientInvoiceItems, setClientInvoiceItems] = useState([]);
  const [workOrderDetails, setWorkOrderDetails] = useState(null);
  const [allBids, setAllBids] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [clientSubtotal, setClientSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [clientDiscount, setClientDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [clientTotal, setClientTotal] = useState(0);
  const invoiceNumber = workOrderDetails?.General_Page_Infos?.General_Info?.woNumber;
  const [mainComment, setMainComment] = useState('');
  const [refId, setRefId] = useState('');
  const [clientMainComment, setClientMainComment] = useState('');
  const [invoiceComplete, setInvoiceComplete] = useState(false);
  const [creditMemo, setCreditMemo] = useState(false);
  const [invoice_date, setInvoice_date] = useState("");
  const [clientInvoice_date, setClientInvoice_date] = useState("");
  const [savePayment, setSavePayment] = useState({});
  const [sending_Invoive, set_Sending_Invoive] = useState(false);
  const [sending_Client_Invoive, set_Sending_Client_Invoive] = useState(false);


  useEffect(() => {
    fetchData();
    console.log(mainComment);

  }, [params.id, mainComment]);

  useEffect(() => {
    if (workOrderDetails != null) {
      console.log(workOrderDetails);

      setSavePayment(workOrderDetails.Invoice.Save_Payment)
    }
  }, [workOrderDetails]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/work-orders/${params.id}`);
      const data = await response.json();
      setWorkOrderDetails(data);
      setAllBids(data.Bids_Page.All_Bids);
      setInvoiceItems(data.Invoice.Contractor.invoiceItems)
      setClientInvoiceItems(data.Invoice.Client.invoiceItems)
      setInvoice_date(data.Invoice.Contractor.invoice_date)
      setClientInvoice_date(data.Invoice.Client.invoice_date)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /* Handles input changes for both contractor and client invoice items
   * index: the index of the item being modified
   * field: the field being modified (e.g., 'description', 'qty', 'price')
   * value: the new value for the field
   * isClient: boolean, indicates whether the change is for a client item
   */
  const handleInputChange = (index, field, value, isClient = false) => {
    const updatedItems = isClient ? [...clientInvoiceItems] : [...invoiceItems];
    updatedItems[index][field] = value;

    if (field === "description") {
      const selected_bid = allBids.filter((bid) => (bid.description === value))[0]
      console.log(selected_bid);

      updatedItems[index]["qty"] = selected_bid.Qty;
      updatedItems[index]["price"] = isClient ? selected_bid.Client_Price : selected_bid.contractor_Price;
      updatedItems[index]["comment"] = selected_bid.Completion_comments;
    }

    updatedItems[index].total = updatedItems[index].qty * updatedItems[index].price;
    isClient ? setClientInvoiceItems(updatedItems) : setInvoiceItems(updatedItems);
    calculateTotals(isClient ? updatedItems : invoiceItems, isClient);
  };

  /* Calculates subtotals and totals for contractor and client invoices
   * items: the array of invoice items
   * isClient: boolean, indicates whether the calculation is for a client invoice
   */
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

  /* Handles discount changes for both contractor and client invoices
   * e: the change event
   * isClient: boolean
   */
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

  /* Adds a new item to either the contractor or client invoice
  * isClient: boolean
  */
  const addNewItem = (isClient = false) => {
    const newItem = { description: '', qty: 0, price: 0, total: 0, comment: '' };
    if (isClient) {
      setClientInvoiceItems([...clientInvoiceItems, newItem]);
    } else {
      setInvoiceItems([...invoiceItems, newItem]);
    }
  };

  // Removes an item from either the contractor or client invoice
  const removeItem = (index, isClient = false) => {
    const updatedItems = isClient
      ? clientInvoiceItems.filter((_, i) => i !== index)
      : invoiceItems.filter((_, i) => i !== index);
    isClient ? setClientInvoiceItems(updatedItems) : setInvoiceItems(updatedItems);
    calculateTotals(updatedItems, isClient);
  };

  // Removes an item from either the contractor or client invoice
  const InvoiceSaveInDB = async (isClient = false) => {
    try {
      let payload = {};
      if (isClient) {
        set_Sending_Client_Invoive(true)
        payload = {
          client_Head_Comment: clientMainComment,
          invoice_Complete: invoiceComplete,
          credit_Memo: creditMemo,
          send_to_client: isClient,
          send_to_contractor: !isClient,
          workOrderId: params.id,
          Discount: clientDiscount,
          invoiceItems: clientInvoiceItems, // list of items
          Sub_Total: clientSubtotal,
          Total: clientTotal,
          invoice_date: new Date(),  // Assuming you're getting this from input, else update
        };
      } else {
        set_Sending_Invoive(true)
        payload = {
          Head_comment: mainComment,
          Reference_ID: refId,
          send_to_client: isClient,
          send_to_contractor: !isClient,
          workOrderId: params.id,
          Discount: discount,
          invoiceItems: invoiceItems, // list of items
          Sub_Total: subtotal,
          Total: total,
          invoice_date: new Date(),  // Assuming you're getting this from input, else update
        };
      }

      const response = await fetch('http://localhost:3001/api/invoices/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save invoice');
        set_Sending_Invoive(false)
        set_Sending_Client_Invoive(false)
      } else {
        const data = await response.json()
        alert(`message send to this mail: ${data.message} `)
        set_Sending_Invoive(false)
        set_Sending_Client_Invoive(false)
      }

      const result = await response.json();
      console.log('Invoice saved:', result);
    } catch (error) {
      console.error('Error saving invoice:', error);
      set_Sending_Invoive(false)
      set_Sending_Client_Invoive(false)

    }
  };

  // Handles changes in contractor payment fields and updates state
  const handlePaymentChange = (field, value) => {
    setSavePayment({
      ...savePayment,
      [field]: value,
    });
  };

  // Save contractor payment data to the database
  const saveContractorPayment = async () => {
    try {
      const payload = {
        ...savePayment,
        workOrderId: params.id,
      };

      const response = await fetch('http://localhost:3001/api/payments/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save contractor payment');
      }

      const result = await response.json();
      console.log('Contractor payment saved:', result);
    } catch (error) {
      console.error('Error saving contractor payment:', error);
    }
  };


  // ... (rest of the JSX code remains unchanged)
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
            <div>Invoice #: {invoiceNumber}</div>
            <div>Invoice Date: <input
              value={invoice_date ? new Date(invoice_date).toISOString().split('T')[0] : ""}
              type="date"
              readOnly
            /></div>
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
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={item.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    >
                      <option value="Not_Selected">Not Selected</option>
                      {allBids && allBids.filter((bid) => (bid.Qty > 0)).map((bid) => (
                        <option value={bid.description}>{bid.description}</option>
                      ))}
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
                <input type="text" value={mainComment} name="main_comment" id="#" onChange={(e) => (setMainComment(e.target.value))} />
              </div>
              <div>
                <p>Reference ID</p>
                <input type="text" value={refId} name="Reference_ID" id="" onChange={(e) => (setRefId(e.target.value))} />
              </div>
              <button className='send-Invoice-Button' disabled={sending_Invoive || sending_Client_Invoive} onClick={() => InvoiceSaveInDB(false)}>
                {sending_Invoive ? "Sending ..." : "Send Invoice"}
              </button>
            </div>


            <div className="invoice-footer">
              <div>
                <label>Sub Total:</label>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div>
                <label>Contractor Discount:</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => handleDiscountChange(e, false)}
                />
              </div>
              <div>
                <label>Client Total:</label>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Client Invoice Section */}
        <div className="invoice-section">
          <div className="invoice-header">
            <span className="client-name invoice--type">Client</span>
            <div>
              <span>Total: ${clientTotal.toFixed(2)} / </span>
              <span>Invoice Date:
                <input
                  value={clientInvoice_date ? new Date(clientInvoice_date).toISOString().split('T')[0] : ""}
                  type="date"
                  readOnly
                />
              </span>
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
                      <option value="Not_Selected">Not Selected</option>
                      {allBids && allBids.filter((bid) => (bid.Qty > 0)).map((bid) => (
                        <option value={bid.description}>{bid.description}</option>
                      ))}
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
                <input type="text" value={clientMainComment} name="client_Main_Comment" id="#" onChange={(e) => (setClientMainComment(e.target.value))} />
              </div>
              <div>
                <div className='d-flex'>
                  <p>Invoice Complete</p>
                  <input type="checkbox" name="Invoice_Complete" id="" onClick={(e) => (setInvoiceComplete(!invoiceComplete))} />
                </div>
                <div className='d-flex'>
                  <p>Credit memo</p>
                  <input type="checkbox" name="Credit_Memos" id="" onClick={(e) => (setCreditMemo(!creditMemo))} />
                </div>
                <button className='send-Invoice-Button' disabled={sending_Invoive || sending_Client_Invoive} onClick={() => InvoiceSaveInDB(true)}>
                  {sending_Client_Invoive ? "Sending ..." : "Send Invoice"}
                </button>
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
            <input
              value={savePayment.Payment_Date || ""}
              type="date"
              onChange={(e) => handlePaymentChange('Payment_Date', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Amount</label>
            <input
              type="text"
              value={savePayment.Amount || ""}
              placeholder="Enter Amount"
              onChange={(e) => handlePaymentChange('Amount', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Check Number #</label>
            <input
              type="text"
              value={savePayment.Check_Number || ""}
              placeholder="Enter Check #"
              onChange={(e) => handlePaymentChange('Check_Number', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Comment</label>
            <input
              type="text"
              value={savePayment.Comment || ""}
              placeholder="Enter Comment"
              onChange={(e) => handlePaymentChange('Comment', e.target.value)}
            />
          </div>
          <div className="input-group checkbox-group">
            <input
              type="checkbox"
              id="charge-back"
              checked={savePayment.Charge_Back || false}
              onChange={(e) => handlePaymentChange('Charge_Back', e.target.checked)}
            />
            <label htmlFor="charge-back">Charge Back</label>
          </div>
          <button className="save-btn" onClick={saveContractorPayment}>Save Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
