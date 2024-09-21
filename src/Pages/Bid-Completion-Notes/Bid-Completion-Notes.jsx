import './Bid-Completion-Notes.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BidCompletionNotes = () => {
  const params = useParams();
  const [workOrderDetails, setWorkOrderDetails] = useState(null);
  const [originalAllBids, setOriginalAllBids] = useState([]);
  const [allBids, setAllBids] = useState([]);
  const [totalContractor, setTotalContractor] = useState(0);
  const [totalClient, setTotalClient] = useState(0);
  const [comments, setComments] = useState('');
  const [clientBidSheetHeading, setClientBidSheetHeading] = useState('');
  const [checkedBids, setCheckedBids] = useState([]); // State to track checked bids
  const [showPastCompletion, setShowPastCompletion] = useState(false);
  const [showPastBids, setShowPastBids] = useState(false);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/work-orders/${params.id}`);
      const data = await response.json();
      setWorkOrderDetails(data);
      setOriginalAllBids(data.Bids_Page.All_Bids);
      setAllBids(data.Bids_Page.All_Bids);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusSave = async (updatedBids) => {
    const All_Bids = updatedBids.map((item, index) => ({
      index: item.index,
      Common: item.Common,
      Status: item.Status,
      description: item.description,
      Qty: item.Qty,
      contractor_Price: item.contractor_Price,
      Client_Price: item.Client_Price,
      Client_comments: item.Client_comments,
      Completion_Total: item.Completion_Total,
      Completion_comments: item.Completion_comments,
    }));

    try {
      const response = await fetch(`http://localhost:3001/work-orders/${params.id}`, {
        method: 'PUT',
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
          },
        }),
      });

      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Undo function - sets the bid's status back to 0
  const handleUndo = (index) => {
    const updatedBids = [...allBids];
    updatedBids[index].Status = 0; // Set status to 0 (undo)
    setAllBids(updatedBids);
    handleStatusSave(updatedBids);
  };

  // Permanent delete function - removes the bid completely from the database
  const handlePermanentDelete = async (index, bidId) => {
    const updatedBids = [...allBids].filter((_, i) => i !== index); // Remove the bid from the local state
    setAllBids(updatedBids);
    try {
      const response = await fetch(`http://localhost:3001/delete/bids/${bidId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Bid deleted permanently');
      } else {
        console.error('Failed to delete bid');
      }
    } catch (error) {
      console.error('Error deleting bid:', error);
    }
  };

  return (
    <div className="bid-completion-container">
      <h1>Bid Completion Notes</h1>
      <div className="button-group">
        <button onClick={() => setShowPastCompletion(!showPastCompletion)}>Show Past Completions</button>
        <button onClick={() => setShowPastBids(!showPastBids)}>Show Past Bids</button>
      </div>

      {showPastCompletion && (
        <div className="past-completion">
          <h2>Already Complete</h2>
          <table>
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th>QTY</th>
                <th>CONTRACTOR PRICE</th>
                <th>CONTRACTOR TOTAL</th>
                <th>CLIENT PRICE</th>
                <th>CLIENT TOTAL</th>
                <th>CLIENT COMMENTS</th>
                <th>Completion QTY</th>
                <th>Completion COMMENTS</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBids
                .filter((bid) => bid.Status === 1) // Show only items with Status 1
                .map((bid, index) => (
                  <tr key={index}>
                    <td>{bid.description}</td>
                    <td>{bid.Qty}</td>
                    <td>{bid.contractor_Price}</td>
                    <td>{(bid.contractor_Price * bid.Qty).toFixed(2)}</td>
                    <td>{bid.Client_Price}</td>
                    <td>{(bid.Client_Price * bid.Qty).toFixed(2)}</td>
                    <td>{bid.Client_comments}</td>
                    <td>{bid.Completion_Total}</td>
                    <td>{bid.Completion_comments}</td>
                    <td>
                      <button onClick={() => handleUndo(index)}>Undo</button>
                      <button onClick={() => handlePermanentDelete(index, bid._id)}>Permanent Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {showPastBids && (
        <div className="past-bids">
          <h2>Completion</h2>
          <table>
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th>QTY</th>
                <th>CONTRACTOR PRICE</th>
                <th>CONTRACTOR TOTAL</th>
                <th>CLIENT PRICE</th>
                <th>CLIENT TOTAL</th>
                <th>CLIENT COMMENTS</th>
                <th>Completion QTY</th>
                <th>Completion COMMENTS</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBids
                .filter((bid) => bid.Status === 1) // Show only items with Status 1
                .map((bid, index) => (
                  <tr key={index}>
                    <td>{bid.description}</td>
                    <td>{bid.Qty}</td>
                    <td>{bid.contractor_Price}</td>
                    <td>{(bid.contractor_Price * bid.Qty).toFixed(2)}</td>
                    <td>{bid.Client_Price}</td>
                    <td>{(bid.Client_Price * bid.Qty).toFixed(2)}</td>
                    <td>{bid.Client_comments}</td>
                    <td>{bid.Completion_Total}</td>
                    <td>{bid.Completion_comments}</td>
                    <td>
                      <button onClick={() => handleUndo(index)}>Undo</button>
                      <button onClick={() => handlePermanentDelete(index, bid._id)}>Permanent Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <h2>Deleted</h2>
          <table>
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th>QTY</th>
                <th>CONTRACTOR PRICE</th>
                <th>CONTRACTOR TOTAL</th>
                <th>CLIENT PRICE</th>
                <th>CLIENT TOTAL</th>
                <th>CLIENT COMMENTS</th>
                <th>Completion QTY</th>
                <th>Completion COMMENTS</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBids
                .filter((bid) => bid.Status === -1) // Show only items with Status -1
                .map((bid, index) => (
                  <tr key={index}>
                    <td>{bid.description}</td>
                    <td>{bid.Qty}</td>
                    <td>{bid.contractor_Price}</td>
                    <td>{(bid.contractor_Price * bid.Qty).toFixed(2)}</td>
                    <td>{bid.Client_Price}</td>
                    <td>{(bid.Client_Price * bid.Qty).toFixed(2)}</td>
                    <td>{bid.Client_comments}</td>
                    <td>{bid.Completion_Total}</td>
                    <td>{bid.Completion_comments}</td>
                    <td>
                      <button onClick={() => handleUndo(index)}>Undo</button>
                      <button onClick={() => handlePermanentDelete(index, bid._id)}>Permanent Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BidCompletionNotes;
