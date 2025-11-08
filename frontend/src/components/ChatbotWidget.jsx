import React, { useState } from 'react';
import { chatData } from '../data/mockData';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m the SCU Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');

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

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-secondary text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl z-40 flex flex-col border border-gray-200">
          <div className="bg-primary text-white p-4 rounded-t-xl flex items-center justify-between">
            <h3 className="font-semibold">SCU Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>

          <div className="p-4 flex flex-wrap gap-2 border-b">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickChip(chip)}
                className="text-xs px-3 py-1 bg-background rounded-full text-text-secondary hover:bg-gray-200 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.type === 'user'
                      ? 'bg-secondary text-white'
                      : 'bg-background text-text-primary'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors text-sm"
              >
                Send
              </button>
            </div>
            <button className="mt-2 text-xs text-secondary hover:underline w-full text-left">
              Contact Support
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

