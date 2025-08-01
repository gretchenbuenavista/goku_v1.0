import React, { useState } from 'react';
import { Search, Plus, MessageSquare, Calculator, FileText, User, CreditCard, Building, Target, BookOpen, Plane, Bot } from 'lucide-react';

interface ChatItem {
  id: string;
  title: string;
  icon: string;
  category: 'today' | 'previous7days';
}

interface SidebarProps {
  onChatSelect?: () => void;
}

const chatHistory: ChatItem[] = [
  { id: '1', title: 'NZ Income Tax Rates', icon: '📊', category: 'today' },
  { id: '2', title: 'Existing Client Login', icon: '🔐', category: 'today' },
  { id: '3', title: 'NZ Junior Accountant Role', icon: '💼', category: 'previous7days' },
  { id: '4', title: 'Big Beautiful Bill Explained', icon: '💰', category: 'previous7days' },
  { id: '5', title: '2024-25 Individual Tax Rates', icon: '📋', category: 'previous7days' },
  { id: '6', title: 'California State Taxes Overview', icon: '🌟', category: 'previous7days' },
  { id: '7', title: 'HR-1 TEST', icon: '👥', category: 'previous7days' },
  { id: '8', title: 'Back Room Offshoring Location', icon: '🌍', category: 'previous7days' },
  { id: '9', title: 'Xero Features for Australia', icon: '🇦🇺', category: 'previous7days' },
  { id: '10', title: 'Overview of AU Taxation', icon: '📄', category: 'previous7days' },
  { id: '11', title: 'AI Model Architecture Overview', icon: '🤖', category: 'previous7days' },
  { id: '12', title: 'iHRis TEST', icon: '⚙️', category: 'previous7days' },
  { id: '13', title: '2 Week Japan Itinerary', icon: '✈️', category: 'previous7days' },
];

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const filteredChats = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayChats = filteredChats.filter(chat => chat.category === 'today');
  const previous7DaysChats = filteredChats.filter(chat => chat.category === 'previous7days');

  return (
    <div className="w-72 bg-[#34256B] h-screen flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#F5CE00] text-lg font-semibold">Workspace</h1>
          <button className="text-[#F5CE00] hover:text-white transition-colors duration-200">
            <Plus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2A1F5C] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5CE00] transition-all duration-200"
          />
        </div>
      </div>

      {/* Chats Section */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="text-[#F5CE00]" size={16} />
          <span className="text-[#F5CE00] font-medium">Chats</span>
        </div>

        {/* Today Section */}
        {todayChats.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Today</h3>
            <div className="space-y-1">
              {todayChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat.id);
                    onChatSelect?.();
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                    selectedChat === chat.id
                      ? 'bg-[#F5CE00] text-black'
                      : 'text-white hover:bg-[#2A1F5C] hover:text-[#F5CE00]'
                  }`}
                >
                  <span className="text-lg">{chat.icon}</span>
                  <span className="truncate text-sm font-medium">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Previous 7 Days Section */}
        {previous7DaysChats.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Previous 7 Days</h3>
            <div className="space-y-1">
              {previous7DaysChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat.id);
                    onChatSelect?.();
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 group ${
                    selectedChat === chat.id
                      ? 'bg-[#F5CE00] text-black'
                      : 'text-white hover:bg-[#2A1F5C] hover:text-[#F5CE00]'
                  }`}
                >
                  <span className="text-lg">{chat.icon}</span>
                  <span className="truncate text-sm font-medium">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-[#2A1F5C]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F59BB8] rounded-full flex items-center justify-center border-2 border-[#F59BB8]">
            <User className="text-white" size={16} />
          </div>
          <span className="text-white font-medium">Gretchen</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;