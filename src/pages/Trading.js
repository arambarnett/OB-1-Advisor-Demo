import React, { useState, useContext, useEffect, useRef } from 'react';
import { WalletContext } from '../App';
import mockTrading from '../data/mockTrading.json';
import mockDefi from '../data/mockDefi.json';
import TokenSearch from '../components/TokenSearch';
import TokenDetails from '../components/TokenDetails';
import TradeModal from '../components/TradeModal';

const Trading = () => {
  const { isConnected, connect } = useContext(WalletContext);
  const [activeTab, setActiveTab] = useState('trade');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      message: "Hi, I'm your OB-1 Trading Assistant. I can help you execute trades, create strategies, and optimize your portfolio. What would you like to do today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef(null);
  
  // Token search and trading state
  const [selectedToken, setSelectedToken] = useState(null);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState('buy');

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

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
    
    // Simulate AI processing
    setIsProcessing(true);
    setTimeout(() => {
      let response;
      const lowerMsg = message.toLowerCase();
      
      // Generate contextual responses based on user input
      if (lowerMsg.includes('swap') || lowerMsg.includes('exchange') || lowerMsg.includes('trade')) {
        response = "I can help you swap tokens at the best rates. I'll check Uniswap, Curve, and other DEXes to find the optimal route. Based on current market conditions, the best route for your trade would be through Uniswap V3. Would you like me to prepare this transaction for you?";
      } else if (lowerMsg.includes('strategy') || lowerMsg.includes('dca')) {
        response = "Creating a DCA (Dollar Cost Average) strategy is a great way to build your portfolio steadily. I can set up automated purchases on your specified schedule. Would you like to specify the token, amount, and frequency for your DCA strategy?";
      } else if (lowerMsg.includes('rebalance') || lowerMsg.includes('portfolio')) {
        response = "I can help rebalance your portfolio to your target allocations. Based on your current holdings, I'd need to swap approximately 0.2 ETH to BTC to achieve your desired ratio. Would you like me to prepare these transactions?";
      } else if (lowerMsg.includes('tax') || lowerMsg.includes('harvest')) {
        response = "I've analyzed your portfolio and found potential tax-loss harvesting opportunities. You could sell your UNI position at a small loss and immediately purchase a similar asset to maintain market exposure while capturing the tax benefit. Would you like me to explain more?";
      } else {
        response = "I understand you want to explore trading options. Could you specify which tokens you're interested in trading, or if you'd like me to suggest a strategy based on your portfolio?";
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
    }, 2000);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handle token selection from search
  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    
    // Add AI message about the selected token
    setChatHistory(prev => [
      ...prev,
      {
        sender: 'ai',
        message: `I've found ${token.name} (${token.symbol}) for you. The current price is $${token.price < 0.01 ? token.price.toFixed(8) : token.price.toFixed(2)} with a 24h change of ${token.price_change_24h >= 0 ? '+' : ''}${token.price_change_24h}%. Would you like to trade this token?`,
        timestamp: new Date().toISOString()
      }
    ]);
  };
  
  // Handle trade initiation
  const handleTrade = (type, token) => {
    setTradeType(type);
    setTradeModalOpen(true);
  };

  // Wallet not connected view
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 max-w-md text-center">
          <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Wallet to Start Trading</h2>
          <p className="text-gray-400 mb-6">
            Connect your wallet to access advanced trading features, execute transactions, and manage your portfolio with the help of OB-1's AI assistant.
          </p>
          <button 
            onClick={connect}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trading Assistant</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            View Order History
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'trade' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('trade')}
        >
          AI Trading Assistant
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'search' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('search')}
        >
          Token Search
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'orders' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Open Orders
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'strategies' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('strategies')}
        >
          Strategies
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'defi' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('defi')}
        >
          DeFi
        </button>
      </div>
      
      {/* Trading Assistant Tab */}
      {activeTab === 'trade' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chat Interface */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex items-center">
              <div className="w-8 h-8 bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-400 font-bold">AI</span>
              </div>
              <div>
                <h3 className="font-medium text-white">OB-1 Trading Assistant</h3>
                <p className="text-xs text-gray-400">Ask me to execute trades or create strategies</p>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    <p>{chat.message}</p>
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
                    <span className="ml-2 text-gray-400 text-sm">Processing your request...</span>
                  </div>
                </div>
              )}
              
              {/* Invisible div to scroll to */}
              <div ref={chatEndRef}></div>
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-700">
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what trades you want to make..."
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
              <div className="mt-2 text-xs text-gray-400">
                Powered by OB-1 AI Trading Assistant. All trades require your explicit approval.
              </div>
            </div>
          </div>
          
          {/* Right Column - Quick Commands and Market Data */}
          <div className="space-y-6">
            {/* Quick Commands */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
              <h3 className="text-lg font-bold mb-3">Quick Commands</h3>
              <div className="space-y-2">
                {mockTrading.aiTradeAssistants.map(assistant => (
                  <button 
                    key={assistant.id}
                    onClick={() => {
                      setMessage(assistant.command);
                    }}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-left p-3 rounded-md transition-colors duration-200 text-sm"
                  >
                    <div className="font-medium text-white">{assistant.name}</div>
                    <p className="text-gray-400 text-xs mt-1">{assistant.description}</p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Market Overview */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
              <h3 className="text-lg font-bold mb-3">Market Overview</h3>
              <div className="space-y-2">
                {mockTrading.tradingPairs.slice(0, 4).map(pair => (
                  <div key={pair.id} className="flex justify-between items-center">
                    <span className="font-medium">{pair.name}</span>
                    <div className="flex items-center">
                      <span className="text-white font-medium mr-2">${pair.price.toLocaleString()}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${pair.change >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                        {pair.change >= 0 ? '+' : ''}{pair.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 border border-gray-600 text-gray-300 hover:bg-gray-700 py-2 rounded-md text-sm transition-colors duration-200">
                View All Markets
              </button>
            </div>
            
            {/* Connected Exchanges */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
              <h3 className="text-lg font-bold mb-3">Connected Exchanges</h3>
              <div className="space-y-2">
                {mockTrading.exchangeInfo.map(exchange => (
                  <div key={exchange.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-white">{exchange.name}</span>
                      <p className="text-xs text-gray-400">{exchange.type}</p>
                    </div>
                    <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs">
                      Connected
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Open Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Open Orders</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pair</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {mockTrading.openOrders.length > 0 ? (
                    mockTrading.openOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{order.pair}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.type.includes('buy') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                          }`}>
                            {order.type.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{order.amount}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{order.price}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{order.total}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {new Date(order.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                        No open orders at this time
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Recent Trade History</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pair</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {mockTrading.recentTrades.map((trade) => (
                    <tr key={trade.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{trade.pair}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trade.type === 'buy' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{trade.amount}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{trade.price}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{trade.total}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {new Date(trade.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs">
                          {trade.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Strategies Tab */}
      {activeTab === 'strategies' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Active Trading Strategies</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Strategy
              </button>
            </div>
            
            <div className="space-y-4">
              {mockTrading.tradingStrategies.map((strategy) => (
                <div key={strategy.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white">{strategy.name}</h3>
                    <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{strategy.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <span className="text-gray-400 text-xs">Frequency</span>
                      <p className="text-white capitalize">{strategy.frequency}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Last Run</span>
                      <p className="text-white">
                        {strategy.lastExecution ? new Date(strategy.lastExecution).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Next Run</span>
                      <p className="text-white">
                        {strategy.nextExecution ? new Date(strategy.nextExecution).toLocaleDateString() : 'On Trigger'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Performance</span>
                      <p className={strategy.performance !== 'N/A' && parseFloat(strategy.performance) >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {strategy.performance}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                      Edit
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                      Run Now
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                      View History
                    </button>
                    <button className="bg-red-600/40 hover:bg-red-600/60 text-red-400 px-3 py-1.5 rounded text-xs transition-colors duration-200">
                      Pause
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
            <h2 className="text-xl font-bold mb-4">Strategy Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-white">Dollar-Cost Averaging</h3>
                <p className="text-gray-400 text-sm mt-1">Automatically buy a fixed amount of crypto at regular intervals.</p>
                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-xs transition-colors duration-200">
                  Use Template
                </button>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-white">Portfolio Rebalancing</h3>
                <p className="text-gray-400 text-sm mt-1">Maintain target asset allocations by automatically rebalancing.</p>
                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-xs transition-colors duration-200">
                  Use Template
                </button>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-white">Stop Loss / Take Profit</h3>
                <p className="text-gray-400 text-sm mt-1">Automatically sell when price reaches target or falls below threshold.</p>
                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-xs transition-colors duration-200">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Token Search Tab */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-6">Search for Tokens</h2>
            <TokenSearch onTokenSelect={handleTokenSelect} />
          </div>
          
          {selectedToken && (
            <TokenDetails token={selectedToken} onTrade={handleTrade} />
          )}
          
          {/* Trade Modal */}
          <TradeModal 
            isOpen={tradeModalOpen}
            onClose={() => setTradeModalOpen(false)}
            token={selectedToken}
            tradeType={tradeType}
          />
        </div>
      )}
      
      {/* DeFi Tab */}
      {activeTab === 'defi' && (
        <div className="space-y-6">
          {/* Active DeFi Positions */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your DeFi Positions</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Position
              </button>
            </div>
            
            <div className="space-y-6">
              {mockDefi.protocols.map(protocol => (
                <div key={protocol.id} className="bg-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-600">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xl">{protocol.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{protocol.name}</h3>
                          <p className="text-xs text-gray-400">{protocol.type}</p>
                        </div>
                      </div>
                      
                      {protocol.id === 'aave' && (
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          protocol.metrics.healthFactor < 1.5 
                            ? 'bg-red-900/30 text-red-400' 
                            : 'bg-green-900/30 text-green-400'
                        }`}>
                          Health Factor: {protocol.metrics.healthFactor}
                        </div>
                      )}
                      
                      {protocol.id === 'uniswap' && (
                        <div className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs">
                          APY: {protocol.positions[0].apy}%
                        </div>
                      )}
                      
                      {protocol.id === 'curve' && (
                        <div className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs">
                          APY: {protocol.positions[0].apy}%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {protocol.id === 'aave' && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {protocol.positions.map((position, idx) => (
                            <div key={idx}>
                              <span className="text-gray-400 text-xs capitalize">{position.type}</span>
                              <p className="font-medium text-white">{position.amount} {position.asset}</p>
                              <p className="text-xs text-gray-400">${position.value.toLocaleString()}</p>
                            </div>
                          ))}
                          <div>
                            <span className="text-gray-400 text-xs">Borrow Limit</span>
                            <div className="mt-1 h-2 w-full bg-gray-600 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${protocol.metrics.borrowUsed / protocol.metrics.borrowLimit > 0.8 ? 'bg-red-500' : 'bg-blue-500'}`}
                                style={{ width: `${(protocol.metrics.borrowUsed / protocol.metrics.borrowLimit) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              ${protocol.metrics.borrowUsed.toLocaleString()} / ${protocol.metrics.borrowLimit.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Supply
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Borrow
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Repay
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Withdraw
                          </button>
                        </div>
                      </>
                    )}
                    
                    {protocol.id === 'uniswap' && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-gray-400 text-xs">Pair</span>
                            <p className="font-medium text-white">{protocol.positions[0].pairName}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Liquidity</span>
                            <p className="font-medium text-white">${protocol.positions[0].liquidity.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Range</span>
                            <p className="font-medium text-white">{protocol.positions[0].range}</p>
                            <p className="text-xs text-green-400">In Range</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Rewards</span>
                            <p className="font-medium text-white">{protocol.metrics.rewards} UNI</p>
                            <p className="text-xs text-gray-400">≈ $105.12</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Increase Liquidity
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Collect Fees
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Remove
                          </button>
                        </div>
                      </>
                    )}
                    
                    {protocol.id === 'curve' && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-gray-400 text-xs">Pool</span>
                            <p className="font-medium text-white">{protocol.positions[0].poolName}</p>
                            <p className="text-xs text-gray-400">{protocol.positions[0].composition}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Liquidity</span>
                            <p className="font-medium text-white">${protocol.positions[0].liquidity.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Fees Earned</span>
                            <p className="font-medium text-white">${protocol.positions[0].feesEarned.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Rewards</span>
                            <p className="font-medium text-white">{protocol.metrics.rewards} CRV</p>
                            <p className="text-xs text-gray-400">≈ $7.42</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Add Liquidity
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Claim Rewards
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200">
                            Withdraw
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* DeFi Opportunities */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-4">Top DeFi Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockDefi.opportunities.map(opportunity => (
                <div key={opportunity.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-white">{opportunity.name}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      opportunity.risk === 'low' 
                        ? 'bg-green-900/30 text-green-400' 
                        : opportunity.risk === 'medium'
                          ? 'bg-yellow-900/30 text-yellow-400'
                          : 'bg-red-900/30 text-red-400'
                    }`}>
                      {opportunity.risk.charAt(0).toUpperCase() + opportunity.risk.slice(1)} Risk
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{opportunity.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-xs">Protocol</span>
                    <span className="font-medium text-white">{opportunity.protocol}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-xs">APY</span>
                    <span className="font-medium text-green-400">{opportunity.apy}%</span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-xs transition-colors duration-200">
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Best Yield Comparison */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-4">Best Yields by Category</h2>
            
            <div className="space-y-6">
              {/* Lending Rates */}
              <div>
                <h3 className="text-lg font-medium mb-3">Lending & Borrowing</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Protocol</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Supply APY</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Borrow APY</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                      {mockDefi.yields.lending.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{item.protocol}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.asset}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">{item.supplyApy}%</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-red-400">{item.borrowApy}%</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200">
                              Deposit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Staking Rates */}
              <div>
                <h3 className="text-lg font-medium mb-3">Staking</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Protocol</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">APY</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                      {mockDefi.yields.staking.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{item.protocol}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.asset}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">{item.apy}%</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200">
                              Stake
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Liquidity Rates */}
              <div>
                <h3 className="text-lg font-medium mb-3">Liquidity Providing</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Protocol</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pair</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">APY</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                      {mockDefi.yields.liquidity.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{item.protocol}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.pair}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">{item.apy}%</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200">
                              Add Liquidity
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trading;