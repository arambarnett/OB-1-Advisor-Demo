import React, { useState, useRef, useEffect } from 'react';
import ChatPanel from './ChatPanel';
import mockPortfolio from '../data/mockPortfolio.json';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const chatRef = useRef(null);

  // Show tooltip briefly on component mount
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Close the chat panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target) && !event.target.closest('.floating-chat-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 bg-blue-800 text-white p-3 rounded-lg shadow-lg z-50 max-w-xs animate-pulse">
          <div className="flex items-start">
            <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">Ask OB-1 for insights!</p>
              <p className="text-sm text-blue-200 mt-1">Click here to chat with your AI financial advisor</p>
            </div>
          </div>
          <div className="absolute bottom-0 right-6 transform translate-y-full">
            <div className="w-4 h-4 bg-blue-800 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <button
          className="floating-chat-button bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => !isOpen && setShowTooltip(true)}
          onMouseLeave={() => !isOpen && setShowTooltip(false)}
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="flex flex-col items-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-xs mt-1">OB-1 Advisor</span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] z-50 shadow-2xl rounded-lg overflow-hidden"
        >
          <ChatPanel portfolioData={mockPortfolio} />
        </div>
      )}
    </>
  );
};

export default FloatingChat;