import React, { useState, useEffect } from 'react';
import './Photos-Documents.css';
import { useParams } from 'react-router-dom';

const PhotosDocuments = () => {
  const params = useParams();
  const [allRows, setAllRows] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState({});
  // State to track the currently visible row
  const [visibleRowIndex, setVisibleRowIndex] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canceledImages, setCanceledImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode
  const [userType, setUserType] = useState('');

  // Get userType from localStorage (or from your auth system)
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);



  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/work-orders/${params.id}`);
      const data = await response.json();
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

  const handleTabClick = (rowName, tab) => {
    setSelectedTabs((prevTabs) => ({
      ...prevTabs,
      [rowName]: tab,  // Set the selected tab for the specific row
    }));
  };

  const handleFileSelect = (event, rowName, allActiveTab) => {
    const tab = allActiveTab[rowName]; // Get the selected tab for the specific row

    if (!rowName || !tab) {
      return;
    }

    const files = Array.from(event.target.files);

    // Filter files to only allow images (e.g., JPEG, PNG, GIF, WebP)
    const validImageFiles = files.filter(file => file.type.startsWith('image/'));

    if (validImageFiles.length === 0) {
      alert('Please upload only image files (JPEG, PNG, GIF, WebP).');
      return;
    }

    const updatedPhotos = validImageFiles.map(file => ({
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

    // Filter files to only allow images
    const validImageFiles = files.filter(file => file.type.startsWith('image/'));

    if (validImageFiles.length === 0) {
      alert('Please upload only image files (JPEG, PNG, GIF, WebP).');
      return;
    }

    const updatedPhotos = validImageFiles.map(file => ({
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

    // Filter canceled images for the current row and tab
    const canceledImagesForRowAndTab = canceledImages.filter(img => img.rowName === rowName && img.tab === tab);

    if (photosToSubmit.length === 0 && canceledImagesForRowAndTab.length === 0) {
      alert("No images to submit or remove.");
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    const formData = new FormData();
    photosToSubmit.forEach(photo => {
      formData.append('photos', photo.file); // Use 'photos' as the key for all files
    });

    formData.append('rowName', rowName);
    formData.append('tab', tab);  // Append the selected tab for this row

    // Append only the filtered canceled images for removal
    canceledImagesForRowAndTab.forEach(canceledImage => {
      formData.append('canceledImages', canceledImage.imgUrl); // Use 'canceledImages' as the key
    });

    try {
      const response = await fetch(`http://localhost:3001/upload-docs/${params.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Images submitted successfully!');

        // Clear only the canceled images for this row and tab after successful submission
        setCanceledImages(prev => prev.filter(img => img.rowName !== rowName || img.tab !== tab));
      } else {
        alert('Failed to submit images.');
      }
    } catch (error) {
      console.error('Error submitting images:', error);
      alert('Error submitting images.');
    } finally {
      setIsSubmitting(false); // Reset submitting state to false after submission
    }
  };

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
                const canceledImage = child.photos[index];

                // Add the canceled image URL with rowName and tabName to canceledImages
                setCanceledImages(prev => [
                  ...prev,
                  { imgUrl: canceledImage.imgUrl || canceledImage.url, rowName, tab }
                ]);

                // Filter out the removed image
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

  // Function to handle row toggle
  const handleRowClick = (index) => {
    // Toggle visibility: if the same row is clicked again, hide it
    if (visibleRowIndex === index) {
      setVisibleRowIndex(null); // Hide the row
    } else {
      setVisibleRowIndex(index); // Show the row
    }
  };

  const handleImageClick = (photo) => {
    setModalImage(photo.imgUrl || photo.url);
    setIsModalOpen(true);
  };

  // Function to calculate total number of photos
  const getTotalPhotosCount = () => {
    if (!allRows || allRows.length === 0) return 0;

    return allRows.reduce((total, row) => {
      const rowPhotoCount = row.child_item.reduce((rowTotal, child) => {
        return rowTotal + (child.photos ? child.photos.length : 0);
      }, 0);
      return total + rowPhotoCount;
    }, 0);
  };


  return (
    <div className="photos-documents-container">
      <h1>Photos / Documents</h1>

      <div>
        <div>
          {userType != 'Client' && (
            <button onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? 'Stop Editing' : 'Start Editing'}
            </button>
          )}
        </div>

        {/* Display total photo count */}
        <div className="photo-count">
          Photos: {getTotalPhotosCount() || 0} {/* Total photo count */}
        </div>
      </div>

      {/* Iterate over all rows */}
      {allRows &&
        allRows.map((singleRow, rowIndex) => {
          const rowName = singleRow.rowName;
          const isRowVisible = visibleRowIndex === rowIndex; // Check if this row is visible

          return (
            <div key={rowIndex} className="row-section">
              {/* Display row name with click to toggle visibility */}
              <div className="tab-header" onClick={() => handleRowClick(rowIndex)}>
                <h2>{rowName}</h2>
              </div>

              {/* Conditionally render "tab section under row" based on visibility */}
              {isRowVisible && (
                <div className='tab-section-under-row'>
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
                  <div className='Img-Gallery'>
                    {singleRow.child_item &&
                      singleRow.child_item
                        .filter((child) => child.item_Name === selectedTabs[rowName]) // Filter by selected tab
                        .map((child) => (
                          <div key={child.item_Name} className='photos-gallery'>
                            {child.photos && child.photos.length > 0 ? (
                              child.photos.map((photo, photoIndex) => (
                                <div key={photoIndex} className="image-wrapper">
                                  <img
                                    src={photo.imgUrl || photo.url}
                                    alt={photo.altText || `Image ${photoIndex}`}
                                    onClick={() => handleImageClick(photo)}
                                  />

                                  {isEditing && (
                                    <button className="remove-button" onClick={() => handleRemoveImage(rowName, photoIndex)}>
                                      X
                                    </button>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p>No photos uploaded for this tab.</p>
                            )}
                          </div>
                        ))}
                  </div>

                  {/* Submit button for each row's selected tab */}
                  {isEditing && (
                    <div>
                      {singleRow.child_item.some(
                        (child) => child.item_Name === selectedTabs[rowName] && (child.photos?.length > 0 || (canceledImages.filter(img => img.rowName === rowName && img.tab === selectedTabs[rowName]).length > 0))
                      ) && (
                          <button
                            className="submit-button"
                            onClick={() => handleSubmit(rowName)}
                            disabled={isSubmitting} // Disable the button when submitting
                          >
                            {(canceledImages.filter(img => img.rowName === rowName && img.tab === selectedTabs[rowName]).length > 0)
                              ? "Yes, delete it"
                              : (isSubmitting ? "Submitting..." : "Submit Photos")}
                          </button>
                        )}
                      {(canceledImages.filter(img => img.rowName === rowName && img.tab === selectedTabs[rowName]).length > 0)
                        && <button onClick={() => (location.reload())}> No, Keep it </button>}
                    </div>
                  )}

                  {/* Upload and Drag-and-Drop area */}
                  {isEditing && (
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
                        disabled={isSubmitting} // Disable file input when submitting
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <span className="close">&times;</span>
          <img className="modal-content" src={modalImage} alt="Modal View" />
        </div>
      )}
    </div>
  );

};

export default PhotosDocuments;