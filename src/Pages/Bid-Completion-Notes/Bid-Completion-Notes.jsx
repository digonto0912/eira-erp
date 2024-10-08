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
  const [showPastBids, setShowPastBids] = useState(false);


  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/work-orders/${params.id}`);
      const data = await response.json();
      setWorkOrderDetails(data);
      setOriginalAllBids(data.Bids_Page.All_Bids)
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
      _id: Date.now() * Math.random(),
      Common: 0,
      Status: 0,
      description: '',
      Qty: 0,
      contractor_Price: 0,
      Client_Price: 0,
      Client_comments: '',
      Completion_Total: 0,
      Completion_comments: '',
    };
    setAllBids([...allBids, newBids]);
  };

  const handleBidChange = (index, field, value) => {
    const updatedBids = [...allBids];
    updatedBids[index][field] = value;
    setAllBids(updatedBids);
  };

  const calculateTotal = (data, fieldPrice, fieldQty) => {
    return data.reduce(
      (sum, item) => sum + Number(item[fieldPrice]) * Number(item[fieldQty]),
      0
    ).toFixed(2);
  };

  const handleSave = async () => {
    console.log("handleSave");

    const filteredBids = allBids.filter((bid) => bid.Qty > 0 || bid.Common === 1);

    const All_Bids = filteredBids.map((item) => ({
      _id: item._id,
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

    console.log(All_Bids);

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

  const handleStatusSave = async (updatedBids) => {
    const new_added_items = updatedBids.slice(originalAllBids.length, updatedBids.length)

    const filtered_new_added_items = new_added_items.filter((bid) => bid.Status != 0 && bid.description != "");

    if (!filtered_new_added_items) {
      return
    }

    const updatedBidsInRange = updatedBids.slice(0, originalAllBids.length)
    const all_selected_Bids = [...updatedBidsInRange, ...filtered_new_added_items]

    const filteredBids = all_selected_Bids.filter((bid) => bid.Qty > 0 || bid.Common === 1);

    const All_Bids = filteredBids.map((item) => ({
      _id: item._id,
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

  // Handle checkbox changes
  const handleCheckboxChange = (_id) => {
    if (checkedBids.includes(_id)) {
      // removing checkmarked from history
      setCheckedBids(checkedBids.filter((value) => value !== _id));
    } else {
      // adding checkmarked from history
      setCheckedBids([...checkedBids, _id]);
    }
  };

  // Update status when "Done" is clicked
  const handleDoneClick = () => {
    const updatedBids = allBids.map((bid) => {
      if (checkedBids.includes(bid._id) && bid.description != "" && bid.Qty > 0) {
        return { ...bid, Status: 1 };
      }

      return bid;
    });

    // i don't use that time but for next time datas update set is important
    setAllBids(updatedBids);
    handleStatusSave(updatedBids);

    location.reload()

  };

  // Update status when "Delete" is clicked
  const handleDeleteClick = () => {
    const updatedBids = allBids.map((bid) => {
      if (checkedBids.includes(bid._id)) {
        return { ...bid, Status: -1 };
      }
      return bid;
    });
    setAllBids(updatedBids);
    handleStatusSave(updatedBids);

    location.reload()
  };

  const handleUndoDeleteSave = async (updatedBids) => {
    const All_Bids = updatedBids.map((item, _id) => ({
      _id: item._id,
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
  const handleUndo = (_id) => {
    const updatedBids = [...allBids];
    const index = updatedBids.findIndex(bid => bid._id === _id);
    updatedBids[index].Status = 0; // Set status to 0 (undo)
    setAllBids(updatedBids);
    handleUndoDeleteSave(updatedBids);
  };

  // Permanent delete function - removes the bid completely from the database
  const handlePermanentDelete = async (_id) => {
    const updatedBids = [...allBids].filter((value) => value._id !== _id); // Remove the bid from the local state
    setAllBids(updatedBids);
    handleUndoDeleteSave(updatedBids)
  };



  if (!workOrderDetails) {
    return <div>Loading...</div>;
  }



  return (
    <div className="bid-completion-container">
      <div className='bid-page-headline'>
        <h1>Bid Completion Notes</h1>
        <button onClick={() => setShowPastBids(!showPastBids)} className="show-past-btn">Show Past Bids</button>
      </div>


      {/* deleted and done bids table */}
      <div>
        {showPastBids && (
          <div className="bids-section">
            <h2>Completion</h2>
            <table className="bids-table">
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
                    <tr key={bid._id}>
                      <td>{bid.description}</td>
                      <td>{bid.Qty}</td>
                      <td>{bid.contractor_Price}</td>
                      <td>{(bid.contractor_Price * bid.Qty).toFixed(2)}</td>
                      <td>{bid.Client_Price}</td>
                      <td>{(bid.Client_Price * bid.Qty).toFixed(2)}</td>
                      <td className="client-comments">{bid.Client_comments}</td>
                      <td>{bid.Completion_Total}</td>
                      <td className="completion-comments">{bid.Completion_comments}</td>
                      <td>
                        <button className="action-btn" onClick={() => handleUndo(bid._id)}>Undo</button>
                        <button className="action-btn" onClick={() => handlePermanentDelete(bid._id)}>Permanent Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <h2>Deleted</h2>
            <table className="bids-table">
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
                  .map((bid) => (
                    <tr key={bid._id}>
                      <td>{bid.description}</td>
                      <td>{bid.Qty}</td>
                      <td>{bid.contractor_Price}</td>
                      <td>{(bid.contractor_Price * bid.Qty).toFixed(2)}</td>
                      <td>{bid.Client_Price}</td>
                      <td>{(bid.Client_Price * bid.Qty).toFixed(2)}</td>
                      <td className="client-comments">{bid.Client_comments}</td>
                      <td>{bid.Completion_Total}</td>
                      <td className="completion-comments">{bid.Completion_comments}</td>
                      <td>
                        <button className="action-btn" onClick={() => handleUndo(bid._id)}>Undo</button>
                        <button className="action-btn" onClick={() => handlePermanentDelete(bid._id)}>Permanent Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>



      {/* bids complete box */}
      <div className="main-content">

        {/* top 4 button */}
        <div className="button-group">
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => { location.reload() }}>Cancel</button>
          </div>
          <div>
            <button onClick={handleDoneClick}>Done</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>

        <table>
          <thead>
            <tr className='tr-bid-info-row'>
              <th></th>
              <th></th>
              <th></th>
              <th colSpan="5" className='Bid-Info'>Bid Info</th>
              <th colSpan="2">Completion Info</th>
            </tr>
            <tr className='tr-CONTRACTOR-CLIENT-row'>
              <th></th>
              <th></th>
              <th></th>
              <th colSpan="2.7" id="CONTRACTOR-th">CONTRACTOR</th>
              <th colSpan="3" id="CLIENT-th">CLIENT</th>
              <th colSpan="2"></th>
            </tr>
            <tr className='tr-sub-items-row'>
              <th>
                <input type="checkbox" className='checkbox-in-docs-page' />
              </th>
              <th>ITEM/DESCRIPTION</th>
              <th>QTY</th>
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
            {/* all bids */}
            {allBids.map((bid, index) => {

              if (bid.Status === -1 || bid.Status === 1) {
                return
              }

              return (
                <tr key={bid._id} className={`tr-per-bid-infos-${(index + 1) % 2} tr-per-bid-infos`}>
                  <td>
                    <input
                      className="checkbox-in-docs-page"
                      type="checkbox"
                      checked={checkedBids.includes(bid._id)}
                      onChange={() => handleCheckboxChange(bid._id)}
                    />
                  </td>
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
                  <td className="CONTRACTOR-td">
                    <div className="amount-with-sign">
                      <span>
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={bid.contractor_Price}
                        onChange={(e) => handleBidChange(index, 'contractor_Price', e.target.value)}
                      />
                    </div>
                  </td>
                  <td className="CONTRACTOR-td">
                    <input
                      type='number'
                      value={(bid.Qty * bid.contractor_Price).toFixed(2)}
                      readOnly />
                  </td>
                  <td className="CLIENT-td">
                    <div className="amount-with-sign">
                      <span>
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={bid.Client_Price}
                        onChange={(e) => handleBidChange(index, 'Client_Price', e.target.value)}
                      />
                    </div>
                  </td>
                  <td className="CLIENT-td">
                    <input
                      type='number'
                      value={(bid.Qty * bid.Client_Price).toFixed(2)}
                      readOnly />
                  </td>
                  <td className="CLIENT-td">
                    <textarea
                      value={bid.Client_comments}
                      onChange={(e) => handleBidChange(index, 'Client_comments', e.target.value)}
                      rows="1"
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={bid.Completion_Total}
                      onChange={(e) => handleBidChange(index, 'Completion_Total', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={bid.Completion_comments}
                      type="text"
                      onChange={(e) => handleBidChange(index, 'Completion_comments', e.target.value)}
                    />
                  </td>
                </tr>
              )
            })}

            {/* total amount of client & contractor */}
            <tr className='tr-total-row'>
              <th colSpan="4">
                <button onClick={handleAddLine} className="add-line-button">+ Add Line</button>
              </th>
              <th>
                <div className="total-contractor">
                  Total: $ {totalContractor}
                </div>
              </th>
              <th></th>
              <th>
                <div className="total-client">
                  Total: $ {totalClient}
                </div>
              </th>
              <th colSpan="2"></th>
            </tr>
          </tbody>
        </table>

        {/* bids page comment and headline section */}
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
