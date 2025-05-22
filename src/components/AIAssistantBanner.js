import React, { useState } from 'react';

const AIAssistantBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg mb-6 shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">OB-1 Advisor Mode <span className="text-xs bg-blue-600 px-2 py-0.5 rounded-full ml-2">BETA</span></h3>
              <p className="text-blue-200 mt-1">
                Get personalized DeFi insights, portfolio analysis, and recommendations by chatting with your OB-1 Advisor.
              </p>
              
              {isExpanded && (
                <div className="mt-3 text-blue-100 space-y-2">
                  <p className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center mr-2 flex-shrink-0 text-xs">1</span>
                    <span>Click the chat icon in the bottom right corner to start a conversation.</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center mr-2 flex-shrink-0 text-xs">2</span>
                    <span>Ask questions like "How is my portfolio performing?" or "What's my risk level?"</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center mr-2 flex-shrink-0 text-xs">3</span>
                    <span>Request actions like "Optimize my portfolio" or "Show me tax-saving opportunities."</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-blue-200 hover:text-white transition-colors"
            >
              {isExpanded ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            <button 
              onClick={() => setIsVisible(false)} 
              className="text-blue-200 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200">
                Portfolio Analysis
              </button>
              <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200">
                Investment Ideas
              </button>
              <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200">
                Risk Assessment
              </button>
            </div>
            <button 
              onClick={() => {
                // Open chat
                const chatButton = document.querySelector('.floating-chat-button');
                if (chatButton) chatButton.click();
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded text-sm transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Chat with OB-1 Advisor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantBanner;