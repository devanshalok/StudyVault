// Sidebar.js
import React from 'react';

const Sidebar = ({
  conversations,
  onConversationClick,
  activeConversationId,
}) => {
  return (
    <aside className="w-[20%] min-w-[200px] bg-blue-900 text-white h-full overflow-y-auto flex-shrink-0">
      <h2 className="text-xl font-bold p-4 border-b border-blue-700">
        Past Conversations
      </h2>
      <ul>
        {conversations.map((conv) => (
          <li
            key={conv.id}
            className={`p-4 hover:bg-blue-800 cursor-pointer transition-colors duration-200 ${
              conv.id === activeConversationId ? 'bg-blue-800' : ''
            }`}
            onClick={() => onConversationClick(conv.id)}
          >
            Conversation {conv.id}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
