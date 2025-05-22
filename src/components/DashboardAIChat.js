import React, { useState, useRef, useEffect } from 'react';

const DashboardAIChat = ({ portfolioData }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      message: "Hi there! I'm your OB-1 Advisor. I can help you manage your portfolio, execute trades, and optimize your DeFi positions. What would you like to do today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom of chat container without affecting page position
  useEffect(() => {
    if (chatEndRef.current) {
      // Scroll only the chat container, not the entire page
      const chatContainer = chatEndRef.current.parentElement.parentElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  // Suggestions based on portfolio data
  const suggestions = [
    "How can I improve my portfolio's risk profile?",
    "Should I rebalance my assets?",
    "What's the best way to optimize my Aave position?",
    "How can I maximize my yield farming returns?",
    "What are the top opportunities in DeFi right now?"
  ];

  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Save current scroll position
    const scrollY = window.scrollY;
    
    // Add user message to chat
    setChatHistory([
      ...chatHistory,
      {
        sender: 'user',
        message: message,
        timestamp: new Date().toISOString()
      }
    ]);
    
    // Clear input and close suggestions
    setMessage('');
    setIsSuggestionsOpen(false);
    
    // Restore scroll position to prevent page jump
    window.scrollTo(0, scrollY);
    
    // Simulate AI processing
    setIsProcessing(true);
    setTimeout(() => {
      let response;
      const lowerMsg = message.toLowerCase();
      
      // Generate contextual responses based on user input
      if (lowerMsg.includes('risk') || lowerMsg.includes('profile')) {
        response = "Based on your current portfolio, your risk profile is moderate. I notice your Aave health factor is 1.32, which is a bit low. I recommend adding more collateral to reduce your liquidation risk. Would you like me to prepare this transaction for you?";
      } else if (lowerMsg.includes('rebalance') || lowerMsg.includes('balance')) {
        response = "Your portfolio is currently 45% ETH, 30% BTC, 15% stablecoins, and 10% altcoins. For better risk-adjusted returns, I'd recommend increasing your stablecoin allocation to 20% and reducing ETH to 40%. This would help hedge against current market volatility. Would you like me to prepare these trades?";
      } else if (lowerMsg.includes('aave') || lowerMsg.includes('health')) {
        response = "Your Aave position has a health factor of 1.32, which puts you at risk of liquidation if ETH price drops by more than 24%. I recommend adding at least 0.2 ETH as collateral to improve your health factor to 1.75. Would you like me to prepare this transaction?";
      } else if (lowerMsg.includes('yield') || lowerMsg.includes('farming')) {
        response = "For yield farming, your Uniswap position is currently earning 4.2% APY. I've identified an opportunity on Curve that could yield 6.8% APY with similar risk. Would you like to see a detailed comparison or prepare a migration of funds?";
      } else if (lowerMsg.includes('opportunities') || lowerMsg.includes('defi')) {
        response = "Based on your risk profile and current holdings, here are 3 DeFi opportunities:\n\n1. Curve ETH/stETH pool (6.8% APY, low risk)\n2. Aave USDC lending (3.5% APY, very low risk)\n3. Uniswap ETH/LINK pool (8.2% APY, moderate risk)\n\nWould you like me to help you allocate funds to any of these?";
      } else {
        response = "I understand you want to improve your portfolio. Based on my analysis, you could optimize in three ways:\n\n1. Increase your Aave health factor by adding collateral\n2. Diversify with some exposure to Layer 2 tokens like ARB or MATIC\n3. Allocate 5-10% to stablecoin yield opportunities\n\nWould you like me to help with any of these strategies?";
      }
      
      // Save current scroll position again
      const scrollYBeforeResponse = window.scrollY;
      
      // Add AI response to chat
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          message: response,
          timestamp: new Date().toISOString()
        }
      ]);
      
      // Restore scroll position after adding response
      window.scrollTo(0, scrollYBeforeResponse);
      
      setIsProcessing(false);
      
      // Show suggestions again after AI response
      setTimeout(() => {
        setIsSuggestionsOpen(true);
      }, 1000);
    }, 1500);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    setIsSuggestionsOpen(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-6">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-400 font-bold">AI</span>
          </div>
          <div>
            <h3 className="font-medium text-white">OB-1 Advisor</h3>
            <p className="text-xs text-gray-400">Your personal on-chain agent</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs mr-3">
            Ready to take action
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
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
        </div>
      </div>
      
      {/* Collapsible chat container */}
      <div className={`overflow-y-auto p-4 space-y-4 transition-all duration-300 ${
        isExpanded ? 'h-96 opacity-100' : 'h-0 opacity-0 p-0'
      }`}>
        <div className="flex flex-col space-y-4 min-h-full">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  chat.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-white'
                }`}
              >
                <p className="text-sm">{chat.message}</p>
                <p className={`text-xs mt-1 ${chat.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                  {formatTime(chat.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg p-3 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="ml-2 text-gray-400 text-sm">Analyzing your portfolio...</span>
              </div>
            </div>
          )}
          
          {/* Invisible div to scroll to */}
          <div ref={chatEndRef}></div>
        </div>
      </div>
      
      {/* Suggestions - only show when expanded */}
      {isExpanded && isSuggestionsOpen && !isProcessing && (
        <div className="px-4 pt-2 pb-3 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-full transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat Input - only show when expanded */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about your portfolio..."
              className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}
      
      {/* Quick expand button when collapsed */}
      {!isExpanded && (
        <div className="p-4 flex justify-center">
          <button 
            onClick={() => setIsExpanded(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Chat with OB-1 Advisor
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardAIChat;