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
    console.log("allRows->", allRows);

  }, [workOrderDetails, uploadedPhotos, allRows]);

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
  
    setAllRows(prevState => 
      prevState.map(row => {
        if (row.rowName === rowName) {
          return {
            ...row,
            child_item: row.child_item.map(child => {
              if (child.item_Name === tab) {
                return {
                  ...child,
                  photos: [...child.photos, ...updatedPhotos]
                };
              }
              return child;
            })
          };
        }
        return row;
      })
    );
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

    setAllRows(prevState => 
      prevState.map(row => {
        if (row.rowName === rowName) {
          return {
            ...row,
            child_item: row.child_item.map(child => {
              if (child.item_Name === tab) {
                return {
                  ...child,
                  photos: [...child.photos, ...updatedPhotos]
                };
              }
              return child;
            })
          };
        }
        return row;
      })
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (rowName) => {
    const row = allRows.find(row => row.rowName === rowName);
    const tab = selectedTabs[rowName];
    const photosToSubmit = row?.child_item?.find(child => child.item_Name === tab)?.photos || [];
  
    if (photosToSubmit.length === 0) {
      alert("No images to submit.");
      return;
    }
  
    const formData = new FormData();
    photosToSubmit.forEach(photo => {
      formData.append('photos', photo.file); // Use 'photos' as the key for all files
    });
  
    formData.append('rowName', rowName);
    formData.append('tab', tab);  // Append the selected tab for this row
  
    try {
      const response = await fetch(`http://localhost:3001/upload-docs/${params.id}`, {
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
  
    setAllRows(prevState =>
      prevState.map(row => {
        if (row.rowName === rowName) {
          return {
            ...row,
            child_item: row.child_item.map(child => {
              if (child.item_Name === tab) {
                return {
                  ...child,
                  photos: child.photos.filter((_, i) => i !== index)
                };
              }
              return child;
            })
          };
        }
        return row;
      })
    );
  };

  return (
    <div className="photos-documents-container">
      <h1>Photos / Documents</h1>
  
      {/* Display total photo count from imgMetaData */}
      <div className="photo-count">
        Photos: {imgMetaData?.total_photos || 0}
      </div>
  
      {/* Iterate over all rows */}
      {allRows &&
        allRows.map((singleRow, rowIndex) => {
          const rowName = singleRow.rowName;
  
          return (
            <div key={rowIndex} className="row-section">
              {/* Display row name */}
              <div className="tab-header">
                <h2>{rowName}</h2>
              </div>
  
              {/* Display tabs for each row's child items */}
              <div className="tabs">
                {singleRow?.child_item && singleRow.child_item.length > 0 && 
                  singleRow.child_item.map((tab, tabIndex) => (
                    <div key={tabIndex}>
                      <button
                        className={selectedTabs[rowName] === tab.item_Name ? 'active' : ''}
                        onClick={() => handleTabClick(rowName, tab.item_Name)}
                      >
                        {tab.item_Name} ({tab.photos?.length || 0})
                      </button>
                    </div>
                  ))
                }
              </div>
  
              {/* Image Gallery for selected tab */}
              <div>
                {singleRow.child_item &&
                  singleRow.child_item
                    .filter((child) => child.item_Name === selectedTabs[rowName]) // Filter by selected tab
                    .map((child) => (
                      <div key={child.item_Name} className='photos-gallery'>
                        {child.photos && child.photos.length > 0 ? (
                          child.photos.map((photo, photoIndex) => (
                            <div key={photoIndex} className="image-wrapper">
                              <img src={photo.imgUrl || photo.url} alt={photo.altText || `Image ${photoIndex}`} />
                              <button className="remove-button" onClick={() => handleRemoveImage(rowName, photoIndex)}>
                                X
                              </button>
                            </div>
                          ))
                        ) : (
                          <p>No photos uploaded for this tab.</p>
                        )}
                      </div>
                    ))}
              </div>
  
              {/* Upload and Drag-and-Drop area */}
              <div
                className="upload-area"
                onDrop={(e) => handleDrop(e, rowName)}
                onDragOver={handleDragOver}
              >
                <div className="drag-drop-box">Drag And Drop</div>
                <div className="upload-button" onClick={() => document.getElementById(`fileInput_${rowIndex}`).click()}>
                  Upload Photos
                </div>
                <input
                  id={`fileInput_${rowIndex}`}
                  type="file"
                  multiple
                  name="photos"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileSelect(e, rowName, selectedTabs)}
                />
              </div>
  
              {/* Submit button for each row's selected tab */}
              {singleRow.child_item.some(
                (child) => child.item_Name === selectedTabs[rowName] && child.photos?.length > 0
              ) && (
                <button className="submit-button" onClick={() => handleSubmit(rowName)}>
                  Submit Photos
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
  
};

export default PhotosDocuments;