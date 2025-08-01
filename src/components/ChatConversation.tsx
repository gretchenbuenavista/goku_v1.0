import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  references?: Array<{
    id: string;
    title: string;
    type: 'document' | 'spreadsheet' | 'other';
  }>;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: `• Prioritizes time management and attention to detail to meet deadlines efficiently.
• <strong>Works under the guidance of Senior Accountants to ensure accurate and timely delivery of accounting services.</strong>
• <strong>Supports clients such as independent contractors, sole traders, consultants, and small limited companies.</strong>

This role bridges foundational accounting tasks and more complex responsibilities, contributing significantly to client service and firm operations.`,
    timestamp: '2:34 PM',
    references: [
      { id: '1', title: 'Income Tax - Notes.docx', type: 'document' },
      { id: '2', title: 'Income Tax - Questions.xlsx', type: 'spreadsheet' },
      { id: '3', title: 'Tax Guidelines 2024.pdf', type: 'document' },
      { id: '4', title: 'Client Services Manual.docx', type: 'document' },
      { id: '5', title: 'Accounting Standards.xlsx', type: 'spreadsheet' },
      { id: '6', title: 'Compliance Checklist.pdf', type: 'document' },
      { id: '7', title: 'Professional Development.docx', type: 'document' },
      { id: '8', title: 'Quality Assurance.xlsx', type: 'spreadsheet' },
      { id: '9', title: 'Best Practices Guide.pdf', type: 'document' }
    ]
  },
  {
    id: '2',
    type: 'user',
    content: 'what is the ird in new zealand',
    timestamp: '2:35 PM'
  },
  {
    id: '3',
    type: 'assistant',
    content: `In New Zealand, the IRD (Inland Revenue Department) is the government agency responsible for the administration and collection of taxes. It oversees the taxation system, including income tax, GST (Goods and Services Tax), PAYE (Pay As You Earn), provisional tax, and other tax obligations. The IRD ensures compliance with tax laws, processes tax returns, collects payments, and provides guidance to taxpayers. It plays a central role in New Zealand's revenue system and in supporting government funding for public services.`,
    timestamp: '2:35 PM',
    references: [
      { id: '1', title: 'Income Tax - Notes.docx', type: 'document' },
      { id: '2', title: 'Prov Tax - Notes.docx', type: 'document' },
      { id: '3', title: 'GST Guidelines.pdf', type: 'document' },
      { id: '4', title: 'PAYE Information.xlsx', type: 'spreadsheet' },
      { id: '5', title: 'Tax Compliance Manual.docx', type: 'document' },
      { id: '6', title: 'IRD Procedures.pdf', type: 'document' },
      { id: '7', title: 'Revenue Collection.xlsx', type: 'spreadsheet' }
    ]
  }
];

const ChatConversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Thank you for your question about "${content}". I'm here to help you with information about New Zealand taxation, accounting practices, and related topics. Let me provide you with a comprehensive response based on the available resources.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        references: [
          { id: '1', title: 'Tax Reference Guide.pdf', type: 'document' },
          { id: '2', title: 'NZ Tax Code.docx', type: 'document' }
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#000000]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
              references={message.references}
              isLast={index === messages.length - 1}
            />
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-4 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-[#F5CE00] to-[#DD3C27] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-white bold_h1">NZ Bot</span>
                  <span className="text-xs text-gray-500">typing...</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatConversation;