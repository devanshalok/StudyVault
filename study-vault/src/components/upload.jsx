import React, { useState, useRef } from 'react';

const FileUploader = () => {
    const [fileType, setFileType] = useState('');
    const fileInputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [transcription, setTranscription] = useState('');

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Reset file input if file type changes
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);

            // Send the file to the API route
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                setTranscription(result.transcription); // Assume the response contains transcription
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input
        }
    };

    return (
        <div>
            <h2>Upload a File</h2>
            <div>
                <button onClick={handleUploadClick}>
                    Select File Type: {fileType || 'Select'}
                </button>
                <select value={fileType} onChange={handleFileTypeChange}>
                    <option value="">Choose File Type</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                </select>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept={
                        fileType === 'video'
                            ? 'video/*'
                            : fileType === 'audio'
                                ? 'audio/*'
                                : '*/*'
                    }
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
            </div>

            {transcription && (
                <div>
                    <h3>Transcription:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
};

export default FileUploader;