import React from 'react';
import { Plus, Settings, Menu } from 'lucide-react';

interface TopNavigationProps {
  onNewChat: () => void;
  onToggleSidebar: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onNewChat, onToggleSidebar }) => {
  return (
    <div className="bg-[#121212] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-400 hover:text-white transition-colors duration-200"
        >
          <Menu size={20} />
        </button>
        
        <button
          onClick={onNewChat}
          className="bg-[#DD3C27] hover:bg-[#B8321F] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Center Section */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-white font-semibold text-lg">NZ Bot</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopNavigation;