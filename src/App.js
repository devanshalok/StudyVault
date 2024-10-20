// App.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import UploadButton from './UploadButton';
import { ToastContainer } from 'react-toastify';

// firebaseService.js
import { ref, set } from "firebase/database";
import { database } from "./firebase"; // Adjust the path as necessary


const saveConversationToFirebase = async (conversation) => {
  try {
    const conversationRef = ref(database, 'conversations/' + conversation.id);
    await set(conversationRef, conversation);
    console.log('Conversation saved to Firebase:', conversation);
  } catch (error) {
    console.error('Error saving conversation to Firebase:', error);
  }
};

export { saveConversationToFirebase };


const App = () => {
  const [filesInProgress, setFilesInProgress] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  // Handle file uploads
  const handleUpload = (event) => {
    if (activeConversationId === null) {
      setFilesInProgress([...filesInProgress, ...Array.from(event.target.files)]);
    }
  };

  // Handle search submission
  const handleSearch = async (query) => {
    // Generate search results (replace with actual logic if needed)
    const newResults = [
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`,
      `Result 4 for "${query}"`,
      `Result 5 for "${query}"`,
    ];

    if (activeConversationId === null) {
      // Create a new conversation with associated files
      const newConversation = {
        id: conversations.length + 1,
        queries: [query],
        results: [newResults],
        files: filesInProgress,
      };

      // Update conversations and set the new conversation as active
      setConversations([newConversation, ...conversations]);
      setActiveConversationId(newConversation.id);

      //new
      await saveConversationToFirebase(newConversation);

      // Reset files in progress
      setFilesInProgress([]);
    } else {
      const updatedConversations = conversations.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              queries: [...conv.queries, query],
              results: [...conv.results, newResults],
            }
          : conv
      );

      setConversations(updatedConversations);

      await saveConversationToFirebase(updatedConversations.find(conv => conv.id === activeConversationId));
    }
  }


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
