import React, { useState, useEffect } from 'react';
import './Photos-Documents.css';
import { useParams } from 'react-router-dom';

const PhotosDocuments = () => {
  const params = useParams();
  const [workOrderDetails, setWorkOrderDetails] = useState(null);
  const [originalAllRows, setOriginalAllRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [imgMetaData, setImgMetaData] = useState(null);
  const [selectedTabs, setSelectedTabs] = useState({});

  //// new part start

  useEffect(() => {
    console.log("workOrderDetails->", workOrderDetails);
    console.log("uploadedPhotos->", uploadedPhotos);

  }, [workOrderDetails, uploadedPhotos]);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/work-orders/${params.id}`);
      const data = await response.json();
      setWorkOrderDetails(data);
      setOriginalAllRows(data.photos_page);
      setAllRows(data.photos_page);
  
      // Initialize default selected tab for each row
      const initialSelectedTabs = {};
      data.photos_page.forEach((row) => {
        if (row.child_item && row.child_item.length > 0) {
          initialSelectedTabs[row.rowName] = row.child_item[0].item_Name; // Set the first tab as active
        }
      });
  
      setSelectedTabs(initialSelectedTabs); // Update the selectedTabs state with the initial values
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //// new part end

  const fetchItemRows = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/photo-items');
      if (!response.ok) {
        throw new Error('Failed to fetch Item Rows');
      }

      const data = await response.json();

      setItemRows(data); // Update the state with the fetched images
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchImageMetaData = async () => {
    try {
      // geting Meta Data Of All Images
      const responseMetaData = await fetch('http://localhost:3001/api/photos/Photos_Meta_Data');

      if (!responseMetaData) {
        throw new Error('Failed to fetch images meta data');
      }

      const imgMetaData = await responseMetaData.json();
      console.log(imgMetaData);

      setImgMetaData(imgMetaData);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchImages = async (rowName) => {
    if (!rowName) {
      return;
    }

    const tabs = imgMetaData?.all_rows_infos[rowName];

    if (!tabs) {
      return;
    }

    Object.keys(tabs).forEach(async (tab) => {
      try {
        if (!uploadedPhotos[rowName]) {
          uploadedPhotos[rowName] = {};
        }

        // all photo getting for filling arrays
        const response = await fetch(`http://localhost:3002/fetch-docs/${rowName}/${tab}`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();

        uploadedPhotos[rowName][tab] = data; // Update the state with the fetched images
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    });
  };

  useEffect(() => {
    // Fetch images when the component loads
    fetchItemRows();
    fetchImageMetaData();
  }, []);

  const handleTabClick = (rowName, tab) => {
    setSelectedTabs((prevTabs) => ({
      ...prevTabs,
      [rowName]: tab,  // Set the selected tab for the specific row
    }));
  };

  const handleFileSelect = (event, rowName, allActiveTab) => {
    const tab = allActiveTab[rowName]; // Get the selected tab for the specific row
    console.log("tab-> ", tab, rowName);

    if (!rowName || !tab) {
      return;
    }

    const files = Array.from(event.target.files);
    const updatedPhotos = files.map(file => ({
      imgUrl: URL.createObjectURL(file),
      altText: file.name,
      file: file // Keep original file for submission
    }));

    setUploadedPhotos((prevState) => ({
      ...prevState,
      [rowName]: {
        ...prevState[rowName],
        [tab]: [...(prevState[rowName]?.[tab] || []), ...updatedPhotos]
      }
    }));
  };

  const handleDrop = (event, rowName) => {
    event.preventDefault();
    const tab = selectedTabs[rowName]; // Get the selected tab for the specific row
    if (!rowName || !tab) {
      return;
    }

    const files = Array.from(event.dataTransfer.files);
    const updatedPhotos = files.map(file => ({
      imgUrl: URL.createObjectURL(file),
      altText: file.name,
      file: file // Keep original file for submission
    }));

    setUploadedPhotos((prevState) => ({
      ...prevState,
      [rowName]: {
        ...prevState[rowName],
        [tab]: [...(prevState[rowName]?.[tab] || []), ...updatedPhotos]
      }
    }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (rowName) => {

    if (!uploadedPhotos[rowName]) {
      return;
    }

    // Get all photos for the selected row
    const photosToSubmit = [];

    Object.keys(uploadedPhotos[rowName]).forEach((tab) => {
      photosToSubmit.push(...uploadedPhotos[rowName][tab].map(photo => photo.file));
    });

    if (photosToSubmit.length === 0) {
      alert("No images to submit.");
      return;
    }

    const formData = new FormData();
    photosToSubmit.forEach(photo => {
      formData.append('photos', photo); // Use 'photos' as the key for all files
    });

    console.log(rowName)
    formData.append('rowName', rowName); // Also append the selected tab value
    formData.append('tab', selectedTabs[rowName]);  // Append the selected tab for this row

    // Log formData content
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch('http://localhost:3001/upload-docs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Images submitted successfully!');
      } else {
        alert('Failed to submit images.');
      }
    } catch (error) {
      console.error('Error submitting images:', error);
      alert('Error submitting images.');
    }
  };

  // Handle removing an image before submission
  const handleRemoveImage = (rowName, index) => {
    const tab = selectedTabs[rowName]; // Get the selected tab for the specific row
    if (!rowName || !tab) {
      return;
    }

    setUploadedPhotos((prevState) => ({
      ...prevState,
      [rowName]: {
        ...prevState[rowName],
        [tab]: prevState[rowName][tab].filter((_, i) => i !== index),
      }
    }));
  };

  return (
    <div className="photos-documents-container">
      <h1>Photos / Documents</h1>
      <div className="photo-count">
        Photos: {imgMetaData?.total_photos}
      </div>

      {
        allRows &&
        allRows.map((singleRow, index) => {
          const rowName = singleRow.rowName;

          return (
            <div key={index}>
              <div className="tab-header">
                <h2>{rowName}</h2>
              </div>

              <div className="tabs">
                {singleRow?.child_item && (singleRow?.child_item?.length > 0) &&
                  singleRow?.child_item.map((tab, index) => {
                    return (
                      <div key={index}>
                        <button
                          className={selectedTabs[rowName] === tab.item_Name ? 'active' : ''}
                          onClick={() => handleTabClick(rowName, tab.item_Name)}
                        >
                          {tab.item_Name} ({tab.photos.length})
                        </button>
                      </div>
                    );
                  })
                }
              </div>

              {/* Image Gallery for each tab */}
              <div className="photos-gallery">
                {uploadedPhotos[rowName]?.[selectedTabs[rowName]]?.length > 0 &&
                  uploadedPhotos[rowName][selectedTabs[rowName]].map((photo, index) => (
                    <div key={index} className="image-wrapper">
                      <img src={photo.imgUrl} alt={photo.altText || `Image ${index}`} />
                      <button className="remove-button" onClick={() => handleRemoveImage(rowName, index)}>X</button>
                    </div>
                  ))
                }
              </div>

              {/* Upload and Drag-and-Drop area */}
              <div className="upload-area" key={index} onDrop={(e) => handleDrop(e, rowName)} onDragOver={handleDragOver}>
                <div className="drag-drop-box">Drag And Drop</div>
                <div className="upload-button" onClick={() => document.getElementById(`fileInput_${index}`).click()}>
                  Upload Photos
                </div>
                <input
                  id={`fileInput_${index}`}
                  type="file"
                  multiple
                  name="photos"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileSelect(e, rowName, selectedTabs)}
                />
              </div>

              {/* Submit button visible if any photos are uploaded */}
              {uploadedPhotos[rowName] && uploadedPhotos[rowName][selectedTabs[rowName]]?.length > 0 && (
                <button className="submit-button" onClick={() => handleSubmit(rowName)}>
                  Submit {uploadedPhotos[rowName][selectedTabs[rowName]].length} Photos
                </button>
              )}
            </div>
          )
        })
      }

      {/* Additional sections for Tracking Photos and Bid photos */}
      <div className="section tracking-photos">
        <h2>Tracking Photos</h2>
        <p>Total (0)</p>
      </div>

      <div className="section bid-photos">
        <h2>Bid photos</h2>
        <p>Total Category (0)</p>
      </div>
    </div>
  );
};

export default PhotosDocuments;