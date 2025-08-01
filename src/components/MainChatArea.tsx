import React, { useState } from 'react';
import { Mic, Headphones, Send, Sparkles } from 'lucide-react';

const suggestedPrompts = [
  {
    title: 'Grammar check',
    subtitle: 'rewrite it for better readability',
    color: 'bg-[#F5CE00] text-black hover:bg-[#E6BA00]'
  },
  {
    title: 'Overcome procrastination',
    subtitle: 'give me tips',
    color: 'bg-[#F59BB8] text-white hover:bg-[#F285A8]'
  },
  {
    title: 'Explain options trading',
    subtitle: 'if I\'m familiar with buying and selling stocks',
    color: 'bg-[#DD3C27] text-white hover:bg-[#C63424]'
  }
];

const MainChatArea: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="flex-1 bg-[#000000] flex flex-col h-screen">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F5CE00] to-[#DD3C27] rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-black" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-white">
              NZ <span className="text-[#F5CE00]">Bot</span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg">How can I help you today?</p>
        </div>

        {/* Suggested Prompts */}
        <div className="w-full max-w-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                className={`${prompt.color} p-4 rounded-xl text-left transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`}
                onClick={() => setMessage(prompt.title)}
              >
                <div className="font-semibold mb-1">{prompt.title}</div>
                <div className="text-sm opacity-80">{prompt.subtitle}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="w-full max-w-4xl">
          <div className="bg-[#121212] rounded-2xl border border-gray-700 shadow-2xl">
            <div className="p-4">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message NZ Bot..."
                    className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[60px] max-h-[200px]"
                    rows={1}
                  />
                </div>
                
                {/* Input Controls */}
                <div className="flex items-center gap-2">
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      message.trim()
                        ? 'bg-[#DD3C27] hover:bg-[#C63424] text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Text */}
          <p className="text-center text-gray-500 text-sm mt-4">
            NZ Bot can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainChatArea;