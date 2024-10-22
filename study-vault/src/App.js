import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import UploadButton from './UploadButton';
import { ToastContainer, toast } from 'react-toastify';
import { extractTextFromImage } from './imageUtils';
import axios from 'axios';

const App = () => {
  const [filesInProgress, setFilesInProgress] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  // Handle file uploads
const handleUpload = async (event) => {
  if (activeConversationId === null) {
    const uploadedFiles = Array.from(event.target.files);

    const filesWithData = await Promise.all(
      uploadedFiles.map(async (file) => {
        let extractedData = null;
        let preview = URL.createObjectURL(file);

        if (file.type.startsWith('image/')) {
          // Process images
          const text = await extractTextFromImage(file);
          console.log(text);
          extractedData = { text };
        } else if (file.type.startsWith('video/')) {
          // Upload video to server and get transcription
          const formData = new FormData();
          formData.append('video', file);

          try {
            const response = await axios.post(
              'http://localhost:4000/upload-video',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            extractedData = response.data;
          } catch (error) {
            console.error('Error processing video:', error);
          }
        }

        return {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          preview: preview,
          extractedData: extractedData,
        };
      })
    );

    setFilesInProgress([...filesInProgress, ...filesWithData]);
  }
};

const handleSearch = async (query) => {
  if (query.trim() === '') {
    toast.warn('You should enter a value.', {
      position: 'top-right',
      autoClose: 3000,
    });
    return;
  }

  // Search through files in progress or active conversation
  let filesToSearch = [];
  if (activeConversationId === null) {
    filesToSearch = filesInProgress;
  } else {
    const activeConv = conversations.find(
      (conv) => conv.id === activeConversationId
    );
    filesToSearch = activeConv.files;
  }

  const searchResults = [];

  for (const file of filesToSearch) {
    if (file.type.startsWith('image/') && file.extractedData?.text) {
      // Search in image text
      const sentences = file.extractedData.text.split('\n');
      const matchedSentences = sentences.filter((sentence) =>
        sentence.toLowerCase().includes(query.toLowerCase())
      );
      if (matchedSentences.length > 0) {
        searchResults.push({
          fileName: file.name,
          type: 'image',
          matches: matchedSentences,
        });
      }
    } else if (
      file.type.startsWith('video/') &&
      file.extractedData?.transcription
    ) {
      // Search in video transcription
      const words = file.extractedData.words;
      const matchedWords = words.filter((wordInfo) =>
        wordInfo.word.toLowerCase().includes(query.toLowerCase())
      );
      if (matchedWords.length > 0) {
        searchResults.push({
          fileName: file.name,
          type: 'video',
          matches: matchedWords,
        });
      }
    }
  }

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
