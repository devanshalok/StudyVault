// src/FileUpload.js
import React, { useState } from 'react';
import { ref, set } from "firebase/database";
import { database } from './firebase';
import UploadButton from './UploadButton';

const FileUpload = () => {
  const [setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      handleUpload(selectedFiles[0]);
    }
  };

  const handleUpload = (file) => {
    if (!file) return;

    const storageRef = ref(database, 'uploads/' + file.name);

    // Store file metadata in the database
    set(storageRef, {
      name: file.name,
      size: file.size,
      timestamp: Date.now(),
    })
    .then(() => {
      alert('File uploaded successfully!');
    })
    .catch((error) => {
      console.error('Error uploading file: ', error);
    });
  };

  return (
    <div>
      <UploadButton onUpload={handleFileChange} />
    </div>
  );
};

export default FileUpload;
