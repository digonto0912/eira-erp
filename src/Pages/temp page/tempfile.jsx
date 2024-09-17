import React, { useState, useEffect } from 'react';

function WorkOrder({ workOrderId = "1EvPgxrAYoeVEgK4bBcI" }) {
  const [workOrderData, setWorkOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch(`http://localhost:3001/getWorkOrder/${workOrderId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch work order');
        }
        return response.json();
      })
      .then((data) => {
        setWorkOrderData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [workOrderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      <h2>Work Order Details</h2>
      {workOrderData ? (
        <div>
          <h3>General Info</h3>
          <p>WO Number: {workOrderData.General_Page_Infos.General_Info.woNumber}</p>
          <p>Company: {workOrderData.General_Page_Infos.General_Info.company}</p>
          {/* Display more fields as needed */}
          
          <h3>Status</h3>
          <p>Status: {workOrderData.General_Page_Infos.Status_Info}</p>

          <h3>Work Order Items</h3>
          {workOrderData.General_Page_Infos.Work_Order_Items.map((item, index) => (
            <div key={index}>
              <p>Description: {item.Description}</p>
              <p>Qty: {item.Qty}</p>
              <p>Price: {item.Price}</p>
            </div>
          ))}

          <h3>Photos</h3>
          {/* {workOrderData.photos_page?.map((photoGroup, index) => (
            <div key={index}>
              <h4>{photoGroup[0].row_name}</h4>
              {photoGroup[0].Items.map((item, i) => (
                <div key={i}>
                  <h5>{item.name}</h5>
                  {item.photos.map((url, j) => (
                    <img key={j} src={url} alt={`${item.name} photo`} style={{ width: '200px' }} />
                  ))}
                </div>
              ))}
            </div>
          ))} */}
        </div>
      ) : (
        <p>No work order data found</p>
      )}
    </div>
  );
}

export default WorkOrder;
