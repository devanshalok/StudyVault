import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import UploadButton from './UploadButton';
import { ToastContainer, toast } from 'react-toastify';
import { extractTextFromPDF, searchPDFs } from './pdfUtils';

const App = () => {
  const [filesInProgress, setFilesInProgress] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  // Handle file uploads
  const handleUpload = async (event) => {
    if (activeConversationId === null) {
      const uploadedFiles = Array.from(event.target.files);

      // Extract text from PDFs and add to the file object
      const filesWithText = await Promise.all(
        uploadedFiles.map(async (file) => {
          let extractedText = null;
          if (file.type === 'application/pdf') {
            extractedText = await extractTextFromPDF(file);
          }
          // Create an object URL for the file
          const preview = URL.createObjectURL(file);

          // Create a new object with necessary properties
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            preview: preview,
            extractedText: extractedText,
          };
        })
      );

      setFilesInProgress([...filesInProgress, ...filesWithText]);
    }
  };



  // Handle search submission
  const handleSearch = async (query) => {
    if (query.trim() === '') {
      // Display a toast notification if the query is empty
      toast.warn('You should enter a value.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Search through PDFs in the active conversation or files in progress
    let filesToSearch = [];
    if (activeConversationId === null) {
      filesToSearch = filesInProgress;
    } else {
      const activeConv = conversations.find(
        (conv) => conv.id === activeConversationId
      );
      filesToSearch = activeConv.files;
    }

    // Perform the search
    const searchResults = await searchPDFs(filesToSearch, query);

    if (activeConversationId === null) {
      // Create a new conversation
      const newConversation = {
        id: conversations.length + 1,
        queries: [query],
        results: [searchResults],
        files: filesInProgress,
      };
      setConversations([newConversation, ...conversations]);
      setActiveConversationId(newConversation.id);
      setFilesInProgress([]);
    } else {
      // Append to the existing conversation
      setConversations(
        conversations.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                queries: [...conv.queries, query],
                results: [...conv.results, searchResults],
              }
            : conv
        )
      );
    }
  };

  // Handle conversation selection
  const handleConversationClick = (id) => {
    setActiveConversationId(id);
  };

  // Handle home button click
  const handleHomeClick = () => {
    setActiveConversationId(null);
    setFilesInProgress([]);
  };

  // Get the active conversation
  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  return (
    <div className="flex flex-col h-screen">
      <Header
        onSearch={handleSearch}
        onHomeClick={handleHomeClick}
        activeConversationId={activeConversationId}
      />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          conversations={conversations}
          onConversationClick={handleConversationClick}
          activeConversationId={activeConversationId}
        />
        <MainContent
          files={activeConversation ? activeConversation.files : filesInProgress}
          conversation={activeConversation}
        />
      </div>
      {activeConversationId === null && <UploadButton onUpload={handleUpload} />}
      <ToastContainer />
    </div>
  );
};

export default App;
