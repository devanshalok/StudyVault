// Lightbox.js
import React from 'react';

const Lightbox = ({ file, onClose }) => {
  const fileType = file.type;
  const fileURL = URL.createObjectURL(file);

  const renderContent = () => {
    if (fileType.startsWith('image/')) {
      // Image
      return (
        <img
          src={fileURL}
          alt={file.name}
          className="max-w-full max-h-full object-contain"
        />
      );
    } else if (fileType === 'application/pdf') {
      // PDF
      return (
        <iframe
          src={fileURL}
          title={file.name}
          className="h-screen w-screen"
        />
      );
    } else if (fileType.startsWith('video/')) {
      // Video
      return (
        <video controls className="max-w-full max-h-full">
          <source src={fileURL} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      // Other types
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-white">No preview available</p>
        </div>
      );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-full max-h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-white text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Render the content */}
        <div className="max-w-screen max-h-screen overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
