import React, { useState, useEffect, useRef } from 'react';
import { chatData } from '../data/mockData';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m the SCU Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickChip = (question) => {
    const answer = chatData.find(item => item.question === question)?.answer || 
                   "I'm here to help! Try asking about perks, donations, or cashback.";
    
    setMessages(prev => [
      ...prev,
      { type: 'user', text: question },
      { type: 'bot', text: answer }
    ]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const answer = chatData.find(item => 
      inputValue.toLowerCase().includes(item.question.toLowerCase().split(' ')[0])
    )?.answer || 
    "I'm here to help! Try asking about perks, donations, or cashback. For more help, contact support.";

    setMessages(prev => [
      ...prev,
      { type: 'user', text: inputValue },
      { type: 'bot', text: answer }
    ]);
    setInputValue('');
  };

  const quickChips = [
    "What perks am I eligible for?",
    "How do I donate rewards?",
    "Why didn't cashback apply?"
  ];

  // Robot Icon SVG Component
  const RobotIcon = ({ size = 24, className = "" }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="9" y="11" width="2" height="2" fill="currentColor"/>
      <rect x="13" y="11" width="2" height="2" fill="currentColor"/>
      <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M6 10H4C3.44772 10 3 10.4477 3 11V13C3 13.5523 3.44772 14 4 14H6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M18 10H20C20.5523 10 21 10.4477 21 11V13C21 13.5523 20.5523 14 20 14H18" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="10" y="16" width="4" height="2" rx="1" fill="currentColor"/>
    </svg>
  );

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-secondary to-primary text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-110 active:scale-95 group"
          aria-label="Open chat"
        >
          <div className="relative">
            <RobotIcon size={28} className="text-white group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-apply rounded-full border-2 border-white animate-pulse"></span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col border border-gray-200 overflow-hidden transform transition-all duration-300 ease-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <RobotIcon size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">SCU Assistant</h3>
                <p className="text-xs text-white/80">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick Chips */}
          <div className="p-4 flex flex-wrap gap-2 border-b bg-gray-50">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickChip(chip)}
                className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-text-secondary hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                    <RobotIcon size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-br from-secondary to-primary text-white rounded-tr-sm'
                      : 'bg-white text-text-primary border border-gray-100 rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                {msg.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent-apply flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-semibold">A</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-secondary to-primary text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <button className="text-xs text-secondary hover:text-primary transition-colors w-full text-left flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Contact Support
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

