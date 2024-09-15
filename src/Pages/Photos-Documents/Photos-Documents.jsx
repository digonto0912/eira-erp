import React, { useState } from 'react';
import './Photos-Documents.css';

const PhotosDocuments = () => {
  const [selectedTab, setSelectedTab] = useState('before');
  
  const photos = {
    before: Array(100).fill({ imgUrl: 'https://via.placeholder.com/150', altText: 'Before Image' }),
    during: Array(0).fill({ imgUrl: 'https://via.placeholder.com/150', altText: 'During Image' }),
    after: Array(12).fill({ imgUrl: 'https://via.placeholder.com/150', altText: 'After Image' }),
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="photos-documents-container">
      <h1>Photos / Documents</h1>
      <div className="photo-count">Photos: {photos.before.length + photos.during.length + photos.after.length}</div>

      <div className="tab-header">
        <h2>All Conditions Photos</h2>
      </div>

      <div className="tabs">
        <button
          className={selectedTab === 'before' ? 'active' : ''}
          onClick={() => handleTabClick('before')}
        >
          Before ({photos.before.length})
        </button>
        <button
          className={selectedTab === 'during' ? 'active' : ''}
          onClick={() => handleTabClick('during')}
        >
          During ({photos.during.length})
        </button>
        <button
          className={selectedTab === 'after' ? 'active' : ''}
          onClick={() => handleTabClick('after')}
        >
          After ({photos.after.length})
        </button>
      </div>

      <div className="photos-gallery">
        {photos[selectedTab].length > 0 ? (
          photos[selectedTab].map((photo, index) => (
            <img key={index} src={photo.imgUrl} alt={photo.altText} />
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>
    </div>
  );
};

export default PhotosDocuments;
