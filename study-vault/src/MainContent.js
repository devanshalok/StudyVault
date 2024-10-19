// MainContent.js
import React from 'react';
import { FaFilePdf, FaFileImage, FaFileVideo } from 'react-icons/fa';

const MainContent = ({ files }) => {
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    if (type.includes('image')) return <FaFileImage className="text-green-500" />;
    if (type.includes('video')) return <FaFileVideo className="text-purple-500" />;
    return <FaFilePdf className="text-gray-500" />;
  };

  return (
    <main className="flex-grow h-full overflow-y-auto p-4">
      {files.length === 0 ? (
        <p className="text-center text-gray-600">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-200"
            >
              <div className="text-4xl">
                {getFileIcon(file.type)}
              </div>
              <div>
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MainContent;
