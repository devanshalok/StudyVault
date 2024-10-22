// MainContent.js

import React, { useState, useEffect } from 'react';
import Lightbox from './Lightbox';

const MainContent = ({ files, conversation }) => {
  const [lightboxFile, setLightboxFile] = useState(null);

  // Revoke object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (lightboxFile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [lightboxFile]);

  const renderFile = (file) => {
    const fileType = file.type;
    const fileURL = file.preview;

    if (fileType && fileType.startsWith('image/')) {
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
    } else if (fileType === 'application/pdf') {
      // PDF
      return (
        <>
          <div
            className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
            onClick={() => {
              // Open PDF in new tab
              window.open(file.preview, '_blank');
            }}
          >
            <p className="text-gray-700">PDF File</p>
          </div>
          <p className="mt-2 text-center font-semibold">{file.name}</p>
        </>
      );
    } else if (fileType && fileType.startsWith('video/')) {
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
              {resultSet.length === 0 ? (
                <p className="text-gray-600">No matches found.</p>
              ) : (
                <ul className="list-disc list-inside space-y-2">
                  {resultSet.map((result, idx) => (
                    <li key={idx} className="text-gray-700">
                      <strong>{result.fileName} ({result.type}):</strong>
                      {result.type === 'image' && (
                        <ul className="list-disc list-inside ml-6 space-y-1">
                          {result.matches.map((sentence, sentenceIdx) => (
                            <li key={sentenceIdx} className="text-gray-600">
                              {sentence}
                            </li>
                          ))}
                        </ul>
                      )}
                      {result.type === 'video' && (
                        <ul className="list-disc list-inside ml-6 space-y-1">
                          {result.matches.map((wordInfo, wordIdx) => (
                            <li key={wordIdx} className="text-gray-600">
                              <span className="font-semibold">
                                Timestamp {wordInfo.startTime.seconds +
                                  '.' +
                                  wordInfo.startTime.nanos / 1e9}{' '}
                                s:
                              </span>{' '}
                              {wordInfo.word}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
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
