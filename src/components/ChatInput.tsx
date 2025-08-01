import React, { useState } from 'react';
import { Send, Plus, Globe, Code, Mic, Headphones } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
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
    <div className="border-t border-gray-800 bg-[#000000] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Input Container */}
        <div className="bg-[#121212] rounded-2xl border border-gray-700 shadow-2xl">
          <div className="p-4">
            <div className="flex items-end gap-4">
              {/* Add Button */}
              <button className="p-3 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-xl transition-all duration-200 flex-shrink-0">
                <Plus size={20} />
              </button>

              {/* Text Input */}
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Send a Message"
                  disabled={disabled}
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[24px] max-h-[200px] disabled:opacity-50"
                  rows={1}
                  style={{ 
                    height: 'auto',
                    minHeight: '24px'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || disabled}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    message.trim() && !disabled
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
  );
};

export default ChatInput;