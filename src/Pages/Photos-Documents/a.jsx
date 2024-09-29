import React, { useState, useEffect } from 'react';
import './Photos-Documents.css';

const PhotosDocuments = () => {
    const [selectedTab, setSelectedTab] = useState('before');
    const [itemRows, setItemRows] = useState({})
    // const [uploadedPhotos, setUploadedPhotos] = useState({
    //   before: [],
    //   during: [],
    //   after: [],
    // });
    const [imgMetaData, setImgMetaData] = useState(null);


    const fetchItemRows = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/photo-items');
            if (!response.ok) {
                throw new Error('Failed to fetch Item Rows');
            }

            const data = await response.json();

            console.log("imgMetaData", data)

            // Assuming the API returns images separated by condition, e.g., { "All Conditions Photos": { before=[], during=[], after=[] } }
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
    const fetchImages = async (rowName, tab) => {
        try {

            // all photo geting for filling arrays
            const response = await fetch(`http://localhost:3002/fetch-docs/${rowName}/${tab}`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }

            const data = await response.json();

            console.log("imgMetaData", imgMetaData)

            // Assuming the API returns images separated by condition, e.g., {before: [], during: [], after: []}
            setUploadedPhotos(data); // Update the state with the fetched images
            setImgMetaData(imgMetaData); // Update the state with the fetched images
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    useEffect(() => {
        // Fetch images when the component loads
        fetchItemRows();
        fetchImageMetaData();
    }, []);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const updatedPhotos = files.map(file => ({
            imgUrl: URL.createObjectURL(file),
            altText: file.name,
            file: file // Keep original file for submission
        }));
        setUploadedPhotos((prevState) => ({
            ...prevState,
            [selectedTab]: [...prevState[selectedTab], ...updatedPhotos]
        }));
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const updatedPhotos = files.map(file => ({
            imgUrl: URL.createObjectURL(file),
            altText: file.name,
            file: file // Keep original file for submission
        }));
        setUploadedPhotos((prevState) => ({
            ...prevState,
            [selectedTab]: [...prevState[selectedTab], ...updatedPhotos]
        }));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (rowName) => {
        const photosToSubmit = uploadedPhotos[selectedTab].map(photo => photo.file);

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
        formData.append('tab', selectedTab); // Also append the selected tab value

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
    const handleRemoveImage = (index) => {
        setUploadedPhotos((prevState) => ({
            ...prevState,
            [selectedTab]: prevState[selectedTab].filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="photos-documents-container">
            <h1>Photos / Documents</h1>
            <div className="photo-count">
                Photos: {imgMetaData?.total_photos}
            </div>

            {
                itemRows &&
                Object.values(itemRows).map((rowName) => (
                    <div key={rowName.id}>
                        <div className="tab-header">
                            <h2>{rowName.id}</h2>
                        </div>

                        <div className="tabs">
                            {/* Assuming imgMetaData?.all_rows_infos[rowName.id] contains arrays for tabs */}
                            {imgMetaData?.all_rows_infos[rowName.id] &&
                                Object.keys(imgMetaData.all_rows_infos[rowName.id]).map((tabKey) => {
                                    const tabData = imgMetaData.all_rows_infos[rowName.id][tabKey];

                                    return (
                                        <div key={tabKey}>
                                            <button
                                                className={selectedTab === tabKey ? 'active' : ''}
                                                onClick={() => handleTabClick(tabKey)}
                                            >
                                                {tabKey} ({tabData.length})
                                            </button>

                                            {/* Image Gallery for each tab */}
                                            {/* <div className="photos-gallery">
                        {tabData.length > 0 && tabData.map((photo, index) => (
                          <div key={index} className="image-wrapper">
                            <img src={photo.url} alt={photo.altText || `Image ${index}`} />
                            <button className="remove-button" onClick={() => handleRemoveImage(index)}>X</button>
                          </div>
                        ))}
                      </div> */}
                                        </div>
                                    );
                                })
                            }
                        </div>

                        {/* Upload and Drag-and-Drop area */}
                        <div className="upload-area" onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div className="drag-drop-box">Drag And Drop</div>
                            <div className="upload-button" onClick={() => document.getElementById('fileInput').click()}>
                                Upload Photos
                            </div>
                            <input
                                id="fileInput"
                                type="file"
                                multiple
                                name="photos"
                                style={{ display: 'none' }}
                                onChange={handleFileSelect}
                            />
                        </div>

                        {/* Submit button visible if any photos are uploaded */}
                        {/* {uploadedPhotos[selectedTab]?.length > 0 && (
              <button className="submit-button" onClick={() => handleSubmit(selectedTab)}>
                Submit {uploadedPhotos[selectedTab].length} Photos
              </button>
            )} */}
                    </div>
                ))
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
