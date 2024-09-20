import './Bid-Completion-Notes.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BidCompletionNotes = () => {
  const params = useParams();
  const [workOrderDetails, setWorkOrderDetails] = useState(null);
  const [allBids, setAllBids] = useState([]);
  const [totalContractor, setTotalContractor] = useState(0);
  const [totalClient, setTotalClient] = useState(0);
  const [comments, setComments] = useState('');
  const [clientBidSheetHeading, setClientBidSheetHeading] = useState('');
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
      setAllBids(data.Bids_Page.All_Bids);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const contractorTotal = Number(calculateTotal(allBids, 'contractor_Price', 'Qty'));
    setTotalContractor(contractorTotal.toFixed(2));

    const clientTotal = Number(calculateTotal(allBids, 'Client_Price', 'Qty'));
    setTotalClient(clientTotal.toFixed(2));
  }, [allBids]);


  const handleAddLine = () => {
    const newBids = {
      description: '',
      Qty: 0,
      contractor_Price: 0,
      Client_Price: 0,
      client_Comment: "",
      Completion_Total: 0,
      Completion_Comment: ""
    };
    setAllBids([...allBids, newBids]);
  };

  const handleBidChange = (index, field, value) => {
    const updatedBids = [...allBids]; // Work with allBids directly
    updatedBids[index][field] = value;
    setAllBids(updatedBids); // Update the allBids state
  };

  const calculateTotal = (data, fieldPrice, fieldQty) => {
    return data
      .reduce((sum, item) => sum + (Number(item[fieldPrice]) * Number(item[fieldQty])), 0)
      .toFixed(2);
  };

  const handleSave = async () => {
    // Filter bids where Qty > 0 and retain their index (offset by the length of items)
    const filteredBids = allBids
      .map((bid, index) => ({ ...bid, index }))
      .filter((bid) => bid.Qty > 0);

    // Prepare the payload for the API call
    const All_Bids = filteredBids.map((item) => ({
      index: item.index,
      description: item.description,
      Qty: item.Qty,
      contractor_Price: item.contractor_Price,
      Client_Price: item.Client_Price,
      Completion_Total: item.Completion_Total,
      client_Comment: item.client_Comment,
      Completion_Comment: item.Completion_Comment
    }))

    // Make an API call to save the data
    try {
      const response = await fetch(`http://localhost:3001/work-orders/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Bids_Page: {
            All_Bids,
            Client_Total: totalClient,
            Comments: workOrderDetails.Bids_Page.All_Bids.Comments,
            Contractor_Total: totalContractor,
            Headline: workOrderDetails.Bids_Page.All_Bids.Headline,
          }
        }),
      });

      if (response.ok) {
        console.log('Data saved successfully');
        // Add any UI feedback you want here, like success notifications
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };




  if (!workOrderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bid-completion-container">
      <h1>Bid Completion Notes</h1>
      <div className="button-group">
        <button>Show Past Completions</button>
        <button>Show Past Bids</button>
      </div>
      <div className="main-content">
        <div className="button-group">
          <div>
            <button onClick={handleSave}>Save</button>
            <button>Cancel</button>
          </div>
          <div>
            <button>Done</button>
            <button>Delete</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>ITEM/DESCRIPTION</th>
              <th>QTY</th>
              <th colSpan="2">CONTRACTOR</th>
              <th colSpan="3">CLIENT</th>
              <th colSpan="2">Completion Info</th>
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
            {allBids.map((bid, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>
                  <input
                    type="text"
                    value={bid.description}
                    onChange={(e) => handleBidChange(index, 'description', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={bid.Qty}
                    onChange={(e) => handleBidChange(index, 'Qty', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={bid.contractor_Price}
                    onChange={(e) => handleBidChange(index, 'contractor_Price', e.target.value)}
                  />
                </td>
                <td>{(bid.Qty * bid.contractor_Price).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={bid.Client_Price}
                    onChange={(e) => handleBidChange(index, 'Client_Price', e.target.value)}
                  />
                </td>
                <td>{(bid.Qty * bid.Client_Price).toFixed(2)}</td>
                <td><input
                  value={bid?.client_Comment}
                  type="text"
                  onChange={(e) => handleBidChange(index, 'client_Comment', e.target.value)}
                /></td>
                <td>
                  <input
                    type="number"
                    value={bid.Completion_Total}
                    onChange={(e) => handleBidChange(index, 'Completion_Total', e.target.value)}
                  />
                </td>
                <td><input
                  value={bid?.Completion_Comment}
                  type="text"
                  onChange={(e) => handleBidChange(index, 'Completion_Comment', e.target.value)}
                /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleAddLine} className="add-line-button">+ Add Line</button>

        <div className="total-display">
          <div className="total-contractor">
            Total Contractor: $ {totalContractor}
          </div>
          <div className="total-client">
            Total Client: $ {totalClient}
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
            <button onClick={handleSave}>Save</button>
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
