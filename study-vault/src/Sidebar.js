// Sidebar.js
import React from 'react';

const Sidebar = () => {
  const conversations = [];
  for (let i = 1; i <=10; i++) {
  conversations.push(`Conversation: ${i}`); 
};

  return (
    <aside className="w-[20%] min-w-[200px] bg-blue-900 text-white h-full overflow-y-auto flex-shrink-0">
      <h2 className="text-xl font-bold p-4 border-b border-blue-700">
        Past Conversations
      </h2>
      <ul>
        {conversations.map((conv, index) => (
          <li
            key={index}
            className="p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-200"
          >
            {conv}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
