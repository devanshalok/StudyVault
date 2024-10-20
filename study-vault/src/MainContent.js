// MainContent.js
import React, { useState } from 'react';
import Lightbox from './Lightbox';

const MainContent = ({ files, conversation }) => {
  const [lightboxFile, setLightboxFile] = useState(null);

  const renderFile = (file) => {
    const fileType = file.type;
    const fileURL = URL.createObjectURL(file);

    if (fileType.startsWith('image/')) {
      // Image
      return (
        <>
          <div
            className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
            onClick={() => setLightboxFile(file)}
          >
            <img
              src={fileURL}
              alt={file.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <p className="mt-2 text-center font-semibold">{file.name}</p>
        </>
      );
    } else if (fileType === 'pdf') {
      // PDF
      return (
        <>
          <div
            className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
            onClick={() => setLightboxFile(file)}
          >
            <embed
              src={fileURL}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
          <p className="mt-2 text-center font-semibold">{file.name}</p>
        </>
      );
    } else if (fileType.startsWith('video/')) {
      // Video
      return (
        <>
          <div
            className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
            onClick={() => setLightboxFile(file)}
          >
            <video
              className="max-w-full max-h-full"
              muted
              loop
              src={fileURL}
            />
          </div>
          <p className="mt-2 text-center font-semibold">{file.name}</p>
        </>
      );
    } else {
      // Other types
      return (
        <>
          <div
            className="w-full h-48 flex items-center justify-center bg-gray-200 cursor-pointer"
            onClick={() => setLightboxFile(file)}
          >
            <p className="text-gray-500">No preview available</p>
          </div>
          <p className="mt-2 text-center font-semibold">{file.name}</p>
        </>
      );
    }
  };

  return (
    <main className="flex-grow h-full overflow-y-auto p-4">
      {/* Display files */}
      {files.length === 0 ? (
        <p className="text-center text-gray-600">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 flex flex-col items-center"
            >
              {renderFile(file)}
            </div>
          ))}
        </div>
      )}

      {/* Display all search results in the conversation */}
      {conversation && conversation.results.length > 0 && (
        <div className="mt-8">
          {conversation.results.map((resultSet, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl font-bold mb-2">
                Search Results for "{conversation.queries[index]}":
              </h2>
              <ul className="list-disc list-inside">
                {resultSet.map((result, idx) => (
                  <li key={idx} className="text-gray-700">
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxFile && (
        <Lightbox file={lightboxFile} onClose={() => setLightboxFile(null)} />
      )}
    </main>
  );
};

export default MainContent;
