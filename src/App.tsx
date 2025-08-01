import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import MainChatArea from './components/MainChatArea';
import ChatConversation from './components/ChatConversation';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'chat'>('home');

  const handleNewChat = () => {
    setCurrentView('home');
  };

  const handleOpenChat = () => {
    setCurrentView('chat');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#000000]">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative z-50 md:z-auto`}>
        <Sidebar onChatSelect={handleOpenChat} />
      </div>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavigation onNewChat={handleNewChat} onToggleSidebar={toggleSidebar} />
        {currentView === 'home' ? <MainChatArea /> : <ChatConversation />}
      </div>
    </div>
  );
}

export default App;