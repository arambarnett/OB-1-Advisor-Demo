import React, { useState, useEffect, useRef } from 'react';

const ChatPanel = ({ portfolioData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [modalData, setModalData] = useState({ isOpen: false, title: '', description: '', action: null });
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What's my portfolio value?",
    "Check my Aave health factor",
    "Show me my rewards",
    "How can I optimize my portfolio?",
    "What's my risk level?"
  ]);

  // Predefined responses for the chat simulation
  const predefinedResponses = {
    'hello': 'Hello! I\'m OB-1, your personal DeFi advisor. How can I help you today?',
    'help': 'I can help you manage your DeFi portfolio, suggest optimization strategies, monitor your positions, and more. Try asking about your current positions or rewards.',
    'portfolio': `Your portfolio is worth $${portfolioData.netWorth[portfolioData.netWorth.length - 1]} across ${Object.keys(portfolioData.tokens).length} tokens and ${Object.keys(portfolioData.protocols).length} protocols. Your 7-day change is +8.3%, outperforming the market by 2.1%.`,
    'aave': `Your Aave position has a health factor of ${portfolioData.protocols.aave.healthFactor}. This is ${portfolioData.protocols.aave.healthFactor < 1.5 ? 'below the recommended 1.5. Consider adding more collateral to avoid liquidation risk.' : 'above the safe threshold of 1.5. Your position is currently in good standing.'}`,
    'rewards': `You've earned ${portfolioData.protocols.uniswap.rewards} UNI tokens from Uniswap. Current APY is ${portfolioData.protocols.uniswap.apy}%. I recommend claiming and staking these rewards for maximum yield. At current prices, that's worth approximately $${(portfolioData.protocols.uniswap.rewards * 8.76).toFixed(2)}.`,
    'optimize': 'Based on your portfolio, I recommend rebalancing to reduce risk. Consider moving some USDC to ETH and adding collateral to your Aave position to improve your health factor. This would increase your estimated APY from 3.2% to 5.7% while reducing your liquidation risk by 45%.',
    'risk': `Your current risk level is ${portfolioData.protocols.aave.healthFactor < 1.5 ? 'HIGH' : 'MODERATE'}. The main concern is your Aave health factor of ${portfolioData.protocols.aave.healthFactor}. Based on historical volatility, there's a ${portfolioData.protocols.aave.healthFactor < 1.5 ? '23%' : '8%'} chance of liquidation in the next 30 days if market conditions deteriorate.`,
    'eth': `You currently hold ${portfolioData.tokens.ETH} ETH worth approximately $${(portfolioData.tokens.ETH * 2345.67).toFixed(2)}. ETH is up 3.2% in the past 24 hours. Based on technical indicators, it's a good time to accumulate more ETH.`,
    'usdc': `You have ${portfolioData.tokens.USDC} USDC in your wallet. While stablecoins provide security, they're currently earning 0% APY. I recommend deploying at least 300 USDC to Aave for a 1.5% yield, or providing liquidity in the USDC/ETH pool for potentially higher returns.`,
    'uni': `You hold ${portfolioData.tokens.UNI} UNI tokens worth approximately $${(portfolioData.tokens.UNI * 8.76).toFixed(2)}. Additionally, you've earned ${portfolioData.protocols.uniswap.rewards} UNI tokens from liquidity providing that are ready to claim.`,
    'defi': `You're currently using ${Object.keys(portfolioData.protocols).length} DeFi protocols (Aave and Uniswap). Your Aave position has a health factor of ${portfolioData.protocols.aave.healthFactor} and your Uniswap position is earning ${portfolioData.protocols.uniswap.apy}% APY. There are 3 additional protocols I recommend exploring based on your risk profile.`,
    'gas': "Current gas prices are 42 Gwei, which is in the moderate range. If your transaction isn't urgent, consider waiting for off-peak hours when gas might drop to 30-35 Gwei, potentially saving you 15-20% on transaction fees."
  };

  // Initialization message
  useEffect(() => {
    setTimeout(() => {
      addMessage('bot', 'Hi there! I\'m OB-1, your personal DeFi advisor. I\'ve analyzed your portfolio and have some recommendations.');
    }, 1000);
    
    setTimeout(() => {
      addMessage('bot', `Your Aave position has a health factor of ${portfolioData.protocols.aave.healthFactor}, which is ${portfolioData.protocols.aave.healthFactor < 1.5 ? 'below the recommended threshold. Consider adding more collateral.' : 'good, but could be improved by adding more collateral.'}`, getActionForResponse('aave'));
    }, 2000);
    
    setTimeout(() => {
      addMessage('bot', `I've also noticed you have ${portfolioData.protocols.uniswap.rewards} UNI tokens available to claim. Based on current market prices, these rewards are worth approximately $${(portfolioData.protocols.uniswap.rewards * 8.76).toFixed(2)}.`, getActionForResponse('rewards'));
    }, 3500);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (sender, text, action = null) => {
    setMessages(prevMessages => [
      ...prevMessages, 
      { sender, text, action, timestamp: new Date() }
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    // Add user message
    addMessage('user', input);
    
    // Store the input for processing
    const userInput = input.trim();
    
    // Clear input and show bot typing indicator
    setInput('');
    setIsTyping(true);
    
    // Find best matching predefined response
    const lowerInput = userInput.toLowerCase();
    const matchedKey = Object.keys(predefinedResponses).find(key => 
      lowerInput.includes(key)
    ) || 'help';
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      setIsTyping(false);
      addMessage('bot', predefinedResponses[matchedKey], getActionForResponse(matchedKey));
      
      // Update suggested questions based on the current context
      updateSuggestedQuestions(matchedKey);
    }, 1500);
  };
  
  const updateSuggestedQuestions = (currentContext) => {
    // Dynamically update suggested questions based on the conversation context
    let newQuestions = [];
    
    switch(currentContext) {
      case 'aave':
        newQuestions = [
          "What's my liquidation risk?",
          "How can I improve my health factor?",
          "Should I repay some of my loan?",
          "What's the current borrow APY?"
        ];
        break;
      case 'rewards':
        newQuestions = [
          "What should I do with my UNI rewards?",
          "What's the current UNI price?",
          "Is it better to stake or sell my UNI?",
          "Show me other reward opportunities"
        ];
        break;
      case 'optimize':
        newQuestions = [
          "What's my optimal asset allocation?",
          "How can I reduce risk?",
          "What yields can I get with my portfolio?",
          "Should I diversify more?"
        ];
        break;
      case 'portfolio':
        newQuestions = [
          "How is my portfolio performing?",
          "What tokens should I buy?",
          "How can I improve my returns?",
          "What's my risk level?"
        ];
        break;
      case 'eth':
        newQuestions = [
          "What's the ETH price prediction?",
          "Should I stake my ETH?",
          "What's the best way to buy ETH?",
          "How can I use ETH in DeFi?"
        ];
        break;
      case 'risk':
        newQuestions = [
          "How can I reduce my risk?",
          "What's my liquidation threshold?",
          "Is my portfolio diversified enough?",
          "What's the safest yield opportunity?"
        ];
        break;
      default:
        newQuestions = [
          "Show me my portfolio",
          "Check my Aave health factor",
          "How can I optimize my positions?",
          "What opportunities do you recommend?"
        ];
    }
    
    setSuggestedQuestions(newQuestions);
  };

  const handleAddCollateral = () => {
    setModalData({
      isOpen: true,
      title: 'Add Collateral to Aave Position',
      description: 'Increasing your collateral will improve your health factor and reduce liquidation risk. This transaction will deposit ETH into your Aave position.',
      action: 'collateral'
    });
  };

  const handleClaimRewards = () => {
    setModalData({
      isOpen: true,
      title: 'Claim UNI Rewards',
      description: `You have ${portfolioData.protocols.uniswap.rewards} UNI tokens available to claim from your Uniswap liquidity position.`,
      action: 'rewards'
    });
  };

  const handleShowStrategy = () => {
    setModalData({
      isOpen: true,
      title: 'Optimization Strategy',
      description: 'Based on your portfolio analysis, I recommend: 1) Add 0.2 ETH as collateral to improve Aave health factor, 2) Claim and stake UNI rewards for 14.5% APY, 3) Convert 100 USDC to ETH to increase exposure to potential gains.',
      action: 'strategy'
    });
  };

  const getActionForResponse = (key) => {
    switch(key) {
      case 'aave':
        return {
          text: 'Add Collateral',
          handler: handleAddCollateral
        };
      case 'rewards':
        return {
          text: 'Claim Rewards',
          handler: handleClaimRewards
        };
      case 'optimize':
        return {
          text: 'Show Strategy',
          handler: handleShowStrategy
        };
      case 'eth':
        return {
          text: 'Buy ETH',
          handler: () => handleGenericAction('Buy ETH', 'Purchase ETH at current market rate to increase your position', 'swap')
        };
      case 'usdc':
        return {
          text: 'Deploy to Aave',
          handler: () => handleGenericAction('Deploy USDC to Aave', 'Deposit USDC to Aave to earn 1.5% APY on your stablecoins', 'deposit')
        };
      case 'uni':
        return {
          text: 'Stake UNI',
          handler: () => handleGenericAction('Stake UNI Tokens', 'Stake your UNI tokens to earn governance rewards and additional yield', 'stake')
        };
      case 'defi':
        return {
          text: 'Explore Protocols',
          handler: () => handleGenericAction('Explore New Protocols', 'View curated DeFi protocols that match your risk profile and investment goals', 'explore')
        };
      case 'risk':
        return {
          text: 'Reduce Risk',
          handler: () => handleGenericAction('Risk Reduction Strategy', 'Implement a comprehensive strategy to reduce your portfolio risk level', 'shield')
        };
      case 'portfolio':
        return {
          text: 'Optimize Portfolio',
          handler: handleShowStrategy
        };
      case 'gas':
        return {
          text: 'Set Gas Alert',
          handler: () => handleGenericAction('Set Gas Price Alert', 'Receive a notification when gas prices drop below 30 Gwei', 'alert')
        };
      default:
        return null;
    }
  };
  
  const handleGenericAction = (title, description, action) => {
    setModalData({
      isOpen: true,
      title,
      description,
      action
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg h-full flex flex-col">
      <div className="bg-blue-900 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          OB-1 Advisor
        </h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-700 text-gray-100 rounded-bl-none'
                }`}
              >
                <p>{message.text}</p>
                {message.action && (
                  <button 
                    onClick={message.action.handler}
                    className="mt-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm"
                  >
                    {message.action.text}
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-gray-700 p-4">
        {/* Suggested Questions */}
        {messages.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                    // Submit the form automatically after a short delay to allow the user to see what was selected
                    setTimeout(() => {
                      handleSendMessage({ preventDefault: () => {} });
                    }, 100);
                  }}
                  className="text-xs bg-gray-700 hover:bg-gray-600 text-blue-400 px-3 py-1.5 rounded-full transition-colors duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask OB-1 something..."
            className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
        <div className="mt-2 text-xs text-gray-400 text-center">
          Your personal DeFi advisor is ready to help with your portfolio
        </div>
      </div>

      {/* Action Modal */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-blue-900 text-white px-6 py-4">
              <h3 className="text-lg font-bold">{modalData.title}</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-300 mb-4">{modalData.description}</p>
                
                {/* Transaction Details */}
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="text-sm text-gray-400 mb-2">Transaction Details</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Network</span>
                      <span className="font-medium text-white">Ethereum Mainnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gas Fee (Est.)</span>
                      <span className="font-medium text-white">0.005 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Protocol</span>
                      <span className="font-medium text-white">{modalData.action === 'collateral' ? 'Aave v3' : modalData.action === 'rewards' ? 'Uniswap v3' : 'Multiple'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setModalData({ ...modalData, isOpen: false })}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Transaction simulated successfully!');
                    setModalData({ ...modalData, isOpen: false });
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;