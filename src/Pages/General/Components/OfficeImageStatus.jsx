// OfficeImageStatus.jsx
import React from 'react';

const OfficeImageStatus = ({ isClient }) => {

  return (
    <div className="general-page-right-half">
      {/* ... (Rest of the content from original code's right section) */}
      <div className="work-order-status">
        <div>
          <div className='status-check status-check-with-checkbox'>
            <h2>Ready for Office</h2>
            <input type="checkbox" disabled={isClient} />
            <button>Verified</button>
          </div>
          <div className="date-info">
            <p>08-17-2024 12:28 PM by Valerie Nelson</p>
          </div>
        </div>
        <div>
          <div className='status-check'>
            <h2>Estimated Complete Date :</h2>
          </div>
          <div className="date-info">
            <p>08-17-2024 12:28 PM by Valerie Nelson</p>
          </div>
        </div>
        <div className='status-check status-check-with-checkbox'>
          <label>Office Locked</label>
          <input type="checkbox" />
        </div>
        <div className='status-check status-check-with-checkbox'>
          <label>Freeze Property</label>
          <input type="checkbox" />
        </div>
      </div>

      {/* Image Section */}
      <div className="image-section">
        <h3>Front of House (Image)</h3>
        <div className='imageBG'>
          <img src="house-image-url.jpg" alt="Front of House" />
        </div>
      </div>

      {/* Check-In Section */}
      <div className="check-in-section">
        <div>
          <h4>Mobile Check-In</h4>
          <p>User: V Nelson</p>
          <p>Date: Aug 15, 4:04 PM</p>
        </div>
        <div>
          <h4>Check In Sync</h4>
          <p>Sent: Successful</p>
        </div>
      </div>
    </div>

  )
}

export default OfficeImageStatus