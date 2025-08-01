import React, { useState } from 'react';
import { Bot, User, ThumbsUp, ThumbsDown, Copy, RotateCcw, Share, Edit3, Volume2, Pause, ChevronDown } from 'lucide-react';

interface Reference {
  id: string;
  title: string;
  type: 'document' | 'spreadsheet' | 'other';
}

interface ChatMessageProps {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  references?: Reference[];
  isLast?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  id, 
  type, 
  content, 
  timestamp, 
  references = [],
  isLast = false 
}) => {
  const [showAllReferences, setShowAllReferences] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const displayedReferences = showAllReferences ? references : references.slice(0, 2);
  const hasMoreReferences = references.length > 2;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (type === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-3xl">
          <div className="bg-[#2A2A2A] text-white rounded-2xl px-4 py-3 shadow-lg">
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
          {timestamp && (
            <p className="text-xs text-gray-500 mt-1 text-right">{timestamp}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        {/* Bot Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-[#F5CE00] to-[#DD3C27] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="text-black" size={16} />
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-white">NZ Bot</span>
            {timestamp && (
              <span className="text-xs text-gray-500">{timestamp}</span>
            )}
          </div>

          {/* Message Text */}
          <div className="text-gray-200 leading-relaxed mb-4">
            <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
          </div>

          {/* References */}
          {references.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <span>References from</span>
                {displayedReferences.map((ref, index) => (
                  <React.Fragment key={ref.id}>
                    <button className="bg-[#2A2A2A] hover:bg-[#3A3A3A] px-2 py-1 rounded text-xs transition-colors duration-200 flex items-center gap-1">
                      <span className="w-4 h-4 bg-[#F5CE00] text-black rounded text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      {ref.title}
                    </button>
                    {index < displayedReferences.length - 1 && <span>,</span>}
                  </React.Fragment>
                ))}
                {hasMoreReferences && (
                  <button
                    onClick={() => setShowAllReferences(!showAllReferences)}
                    className="text-[#F5CE00] hover:text-[#E6BA00] text-sm flex items-center gap-1 transition-colors duration-200"
                  >
                    and {references.length - 2} more
                    <ChevronDown 
                      size={14} 
                      className={`transform transition-transform duration-200 ${showAllReferences ? 'rotate-180' : ''}`} 
                    />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-all duration-200">
              <Edit3 size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-all duration-200">
              <Copy size={16} />
            </button>
            <button 
              onClick={handlePlayPause}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-all duration-200"
            >
              {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-all duration-200">
              <ThumbsUp size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-all duration-200">
              <ThumbsDown size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-all duration-200">
              <RotateCcw size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-all duration-200">
              <Share size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;