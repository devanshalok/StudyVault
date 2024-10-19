// Header.js
import React, { useState } from 'react';
import { FaBars, FaHome } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Header = ({ onSearch, onHomeClick, activeConversationId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (searchQuery.trim() === '') {
        toast.warn('You should enter a value.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        onSearch(searchQuery.trim());
        setSearchQuery('');
      }
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 h-16 flex-shrink-0">
      {/* Home Icon */}
      <div className="flex items-center">
        <button className="text-white text-2xl" onClick={onHomeClick}>
          <FaHome />
        </button>
      </div>

      {/* Search Bar */}
      <div className="mx-4 max-w-md w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Hamburger Icon */}
      <div className="flex items-center">
        <button className="text-white text-2xl">
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
