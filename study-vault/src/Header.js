// Header.js
import React from 'react';
import { FaBars, FaHome } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 h-16 flex-shrink-0">
      {/* Home Icon */}
      <div className="flex items-center">
        <button className="text-white text-2xl">
          <FaHome size={35} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="mx-4 max-w-md w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md outline-none"
        />
      </div>

      {/* Hamburger Icon */}
      <div className="flex items-center">
        <button className="text-white text-2xl">
          <FaBars size={35}/>
        </button>
      </div>
    </header>
  );
};

export default Header;
