import React, { useState, useRef, useEffect } from 'react';

const ReportGeneratorChat = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      message: "I can help you generate custom reports based on your portfolio data. What type of report would you like to create? For example:\n\n• Performance report for a specific time period\n• Tax report for a particular year\n• Asset allocation analysis\n• DeFi protocol exposure report\n• Risk assessment report",
      timestamp: new Date().toISOString()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom of chat container
  useEffect(() => {
    if (chatEndRef.current) {
      const chatContainer = chatEndRef.current.parentElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  // Suggestions for report generation
  const suggestions = [
    "Generate a Q2 performance report",
    "Create a tax report for 2024",
    "Analyze my portfolio risk profile",
    "Create a DeFi yield comparison report",
    "Generate a report on my ETH staking rewards"
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
    
    // Clear input
    setMessage('');
    
    // Restore scroll position to prevent page jump
    window.scrollTo(0, scrollY);
    
    // Simulate AI processing
    setIsProcessing(true);
    setTimeout(() => {
      let response;
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('performance') || lowerMsg.includes('q2')) {
        response = "I'll create a Q2 performance report for you. This report will include:\n\n• Monthly returns for April-June\n• Comparison to market benchmarks\n• Best and worst performing assets\n• Key performance metrics (Sharpe ratio, volatility, etc.)\n\nWould you like me to include any additional information in this report?";
      } else if (lowerMsg.includes('tax') || lowerMsg.includes('2024')) {
        response = "I'll generate a tax report for 2024. This will include:\n\n• All taxable transactions\n• Categorized by short and long-term capital gains\n• Summary of total tax liability\n• Cost basis calculations for all sales\n\nWould you like this in a format ready for your accountant?";
      } else if (lowerMsg.includes('risk') || lowerMsg.includes('profile')) {
        response = "I'll prepare a risk profile analysis report. This will include:\n\n• Portfolio volatility metrics\n• Correlation analysis between assets\n• VaR (Value at Risk) calculations\n• Stress test scenarios\n• Recommendations for risk mitigation\n\nIs there a specific aspect of risk you'd like me to focus on?";
      } else if (lowerMsg.includes('defi') || lowerMsg.includes('yield')) {
        response = "I'll create a DeFi yield comparison report. This will include:\n\n• Current yield from all DeFi protocols\n• Historical yield trends\n• Risk-adjusted returns\n• Protocol risk assessment\n• Optimization recommendations\n\nWould you like to see specific protocols highlighted in this report?";
      } else if (lowerMsg.includes('eth') || lowerMsg.includes('staking')) {
        response = "I'll generate an ETH staking rewards report. This will include:\n\n• Total ETH staked\n• Cumulative rewards earned\n• APY over time\n• Comparison with other staking options\n• Tax implications of staking rewards\n\nWould you like me to include future projections based on current rates?";
      } else {
        response = "I'll create a custom report based on your request. To make sure I include everything you need, could you confirm what specific data points and time periods you'd like to see in this report?";
      }
      
      // Add AI response to chat
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          message: response,
          timestamp: new Date().toISOString()
        }
      ]);
      
      setIsProcessing(false);
      
      // If this seems like a final confirmation to generate a report
      if (lowerMsg.includes('yes') || lowerMsg.includes('generate') || lowerMsg.includes('create') || 
          lowerMsg.includes('please') || lowerMsg.includes('sure')) {
        setTimeout(() => {
          setIsGeneratingReport(true);
          
          // Simulate report generation
          setTimeout(() => {
            setChatHistory(prev => [
              ...prev,
              {
                sender: 'ai',
                message: "Your report has been generated successfully! You can view and download it from the Documents tab.",
                timestamp: new Date().toISOString()
              }
            ]);
            setIsGeneratingReport(false);
          }, 3000);
        }, 1000);
      }
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl overflow-hidden shadow-xl border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-400 font-bold">AI</span>
            </div>
            <div>
              <h3 className="font-medium text-white">Report Generator</h3>
              <p className="text-xs text-gray-400">Powered by OB-1 Advisor</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Chat Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
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
                <p className="text-sm whitespace-pre-line">{chat.message}</p>
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
                <span className="ml-2 text-gray-400 text-sm">Creating report specifications...</span>
              </div>
            </div>
          )}
          
          {isGeneratingReport && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <svg className="animate-spin h-5 w-5 text-blue-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-blue-400 font-medium">Generating your report...</span>
                </div>
                <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef}></div>
        </div>
        
        {/* Suggestions */}
        <div className="px-4 pt-2 pb-3 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Suggested reports:</p>
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
        
        {/* Chat Input */}
        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the report you'd like to generate..."
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
      </div>
    </div>
  );
};

export default ReportGeneratorChat;