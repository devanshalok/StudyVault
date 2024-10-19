// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import UploadButton from './components/UploadButton';

const App = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <MainContent files={files} />
      </div>
      <UploadButton onUpload={handleUpload} />
    </div>
  );
};

export default App;
