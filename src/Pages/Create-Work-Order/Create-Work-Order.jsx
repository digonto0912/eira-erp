import React, { useEffect, useRef, useState } from 'react';
import './Create-Work-Order.css';

const CreateWorkOrder = () => {

  // Prepare the payload for a complete Future Work-Order
  const formData = useRef({});
  const [common_Bids_Items, setCommon_Bids_Items] = useState([]);

  useEffect(() => {
    fetch_Common_Bids_Items();
  }, []);

  const fetch_Common_Bids_Items = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bid-items');
      if (!response.ok) throw new Error('Failed to fetch bid items');
      const data = await response.json();
      setCommon_Bids_Items(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const complete_data_payload = {
    Work_Order_Creating_Date: new Date(),
    General_Page_Infos: {
      Status_Info: "New",
      General_Info: {
        status: 'New',
        statusCls: 'new',
        woNumber: "",
        company: "",
        name: "",
        phone: "",
        email: "",
        customerNumber: "",
        workType: "",
        address: "",
        city: "",
        zip: "",
        contractor: "",
        rush: false,
        lotSize: "",
        mortgager: "",
        checkinProvider: "",
        receivedDate: "",
        dueDate: "",
        recurring: false,
        comments: "",
        category: "",
        loanNumber: "",
        state: "",
        admin: "",
        batf: false,
        lockCode: "",
        keyCode: "",
        lockLocation: "",
        gateCode: "",
        startDate: "",
        clientDueDate: ""
      },
      House_Front_Image: "",
      Work_Order_Last_Tracker: {
        Client: {
          Client: "",
          Date: "",
          Seen: "",
          Status: "Unpaid"
        },
        Admin: {
          User: "",
          Date: "",
          Checkin: "",
          more: "id number giver for knowing detailed"
        }
      },
      Work_Order_Items: [
        {
          Description: "",
          Qty: "",
          Price: "",
          Total: "",
          Additional_Instructions: "",
          Source: ""
        },
        {
          Description: "",
          Qty: "",
          Price: "",
          Total: "",
          Additional_Instructions: "",
          Source: ""
        }
      ]
    },
    Job_Notes: [
      {
        Note: "",
        Date: ""
      }
    ],
    Bids_Page: {
      All_Bids: common_Bids_Items.map((item, index) => {
        return (
          {
            Status: 0,
            Item_Description: item.item,
            Qty: 0,
            contractor_Price: 0,
            Client_Price: 0,
            Client_comments: "",
            Completion_Total: 0,
            Completion_comments: ""
          }
        );
      }),
      Client_Total: 0,
      Contractor_Total: 0,
      Comments: "",
      Headline: ""
    },
    photos_page: {
      conditional_photos: [
        {
          name: "Before",
          photos: ["list of photos url"]
        },
        {
          name: "During",
          photos: ["list of photos url"]
        },
        {
          name: "After",
          photos: ["list of photos url"]
        }
      ]
    },
    Invoice: {
      Contractor: {
        Rows: [
          {
            Item_Description: "",
            Qty: "",
            Price: "",
            Total: "",
            Adj_Price: "",
            After_Adj_Price_Total: "",
            Comment: ""
          }
        ],
        Sub_Total: "",
        Discount: "",
        Total: "",
        comment: "",
        invoice_date: "",
        reference: ""
      },
      Save_Payment: {
        Payment_Date: "",
        Amount: "",
        Check: "",
        Comment: "",
        Charge_back: false
      },
      Client: {
        Rows: [
          {
            Item_Description: "",
            Qty: "",
            Price: "",
            Total: ""
          }
        ],
        Sub_Total: "",
        Discount: "",
        Total: "",
        comment: "",
        invoice_Complete: "",
        Credit_Memo: ""
      }
    }
  }

  // sending the payload to formData for sending to db
  formData.current  = complete_data_payload

  // others functions
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    formData.current.General_Page_Infos.General_Info[name] = type === 'checkbox' ? checked : value

    formData.current(formData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('http://localhost:3001/api/work-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.current),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Work order created:', result);
        // Optionally reset the form or show a success message
      } else {
        console.error('Failed to create work order:', result.error);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };


  return (
    <form className="work-order-form" onSubmit={handleSubmit}>
      <div className="section">
        <label>WO Number</label>
        <input type="text" name="woNumber" value={formData.woNumber} onChange={handleChange} />
      </div>

      <div className="section">
        <h3>Client Info</h3>
        <div className='client-Info-Inputs'>
          <label>Company</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} />

          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />

          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
      </div>

      <div className="section">
        <h3>Customer Info</h3>
        <div className='Info-Inputs-box'>
          <div>
            <label>Customer Number</label>
            <input type="text" name="customerNumber" value={formData.customerNumber} onChange={handleChange} />
          </div>

          <div>
            <label>Work Type</label>
            <input type="text" name="workType" value={formData.workType} onChange={handleChange} />
          </div>

          <div>
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div>
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </div>

          <div>
            <label>Zip</label>
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
          </div>

          <div>
            <label>Contractor</label>
            <select name="contractor" value={formData.contractor} onChange={handleChange}>
              <option value="">Select Contractor</option>
              {/* Add contractor options */}
            </select>
          </div>

          <div className='d-flex'>
            <label>Rush</label>
            <input type="checkbox" name="rush" checked={formData.rush} onChange={handleChange} />
          </div>

          <div>
            <label>Lot Size</label>
            <input type="text" name="lotSize" value={formData.lotSize} onChange={handleChange} />
          </div>

          <div>
            <label>Mortgager</label>
            <input type="text" name="mortgager" value={formData.mortgager} onChange={handleChange} />
          </div>

          <div>
            <label>Background Checkin Provider</label>
            <input type="text" name="checkinProvider" value={formData.checkinProvider} onChange={handleChange} />
          </div>

          <div>
            <label className='mt-100'>Received Date</label>
            <input type="date" name="receivedDate" value={formData.receivedDate} onChange={handleChange} />
          </div>

          <div>
            <label>Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>

          <div>
            <label>Recurring</label>
            <input type="checkbox" name="recurring" checked={formData.recurring} onChange={handleChange} />
          </div>

          <div>
            <label>Comments</label>
            <textarea name="comments" value={formData.comments} onChange={handleChange}></textarea>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Additional Info</h3>
        <div className='Info-Inputs-box'>
          <div>
            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
          </div>

          <div>
            <label>Loan Number/Type</label>
            <input type="text" name="loanNumber" value={formData.loanNumber} onChange={handleChange} />
          </div>

          <div>
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} />
          </div>

          <div>
            <label className='mt-100'>Assigned Admin</label>
            <input type="text" name="admin" value={formData.admin} onChange={handleChange} />
          </div>

          <div>
            <label>BATF (Did After the Fact)</label>
            <input type="checkbox" name="batf" checked={formData.batf} onChange={handleChange} />
          </div>

          <div>
            <label>Lock Code</label>
            <input type="text" name="lockCode" value={formData.lockCode} onChange={handleChange} />
          </div>

          <div>
            <label>Key Code</label>
            <input type="text" name="keyCode" value={formData.keyCode} onChange={handleChange} />
          </div>

          <div>
            <label className='mt-100'>Lock Location</label>
            <input type="text" name="lockLocation" value={formData.lockLocation} onChange={handleChange} />
          </div>

          <div>
            <label>Gate Code</label>
            <input type="text" name="gateCode" value={formData.gateCode} onChange={handleChange} />
          </div>

          <div>
            <label>Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          </div>

          <div>
            <label>Client Due Date</label>
            <input type="date" name="clientDueDate" value={formData.clientDueDate} onChange={handleChange} />
          </div>
        </div>
      </div>



      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button">Save & Create New</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  );
};

export default CreateWorkOrder;
