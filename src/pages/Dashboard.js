import React, { useState, useEffect, useContext } from 'react';
import mockPortfolio from '../data/mockPortfolio.json';
import mockWalletAssets from '../data/mockWalletAssets.json';
import { WalletContext } from '../App';
import { Link } from 'react-router-dom';

// Components
import PerformanceChart from '../components/PerformanceChart';
import TokenPieChart from '../components/TokenPieChart';
import WalletSimulator from '../components/WalletSimulator';
import ActionModal from '../components/ActionModal';
import AIAdvisorInsights from '../components/AIAdvisorInsights';
import DashboardAIChat from '../components/DashboardAIChat';

// Mock market data
const marketData = {
  ethPrice: 2345.67,
  ethChange: 3.2,
  btcPrice: 48234.56,
  btcChange: -1.4,
  usdcPrice: 1.00,
  usdcChange: 0.01,
  uniPrice: 8.76,
  uniChange: 5.6,
  gasPrice: 42, // Gwei
  totalMarketCap: 2.3, // Trillion
};

const Dashboard = () => {
  // Use the wallet context
  const { isConnected, connect, wallet } = useContext(WalletContext);
  const [portfolioData, setPortfolioData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  // Load portfolio data when wallet is connected
  useEffect(() => {
    if (isConnected && !portfolioData) {
      setPortfolioData(mockPortfolio);
    }
  }, [isConnected, portfolioData]);

  const openModal = (action, title, description) => {
    setModalAction(action);
    setModalTitle(title);
    setModalDescription(description);
    setModalOpen(true);
  };

  const handleAddCollateral = () => {
    openModal(
      'collateral',
      'Add Collateral to Aave Position',
      'Increasing your collateral will improve your health factor and reduce liquidation risk. This transaction will deposit ETH into your Aave position.'
    );
  };

  const handleClaimRewards = () => {
    openModal(
      'rewards',
      'Claim UNI Rewards',
      `You have ${portfolioData?.protocols.uniswap.rewards} UNI tokens available to claim from your Uniswap liquidity position.`
    );
  };
  
  const handleShowStrategy = () => {
    openModal(
      'strategy',
      'Portfolio Optimization Strategy',
      `Based on your current portfolio and market conditions, I recommend the following optimization strategy:

1. Add 0.2 ETH as collateral to improve your Aave health factor from 1.32 to 1.75

2. Claim and stake your 12 UNI tokens to earn 14.5% APY

3. Convert 200 USDC to ETH to increase exposure to potential gains

This strategy would increase your estimated APY from 3.2% to 5.7% while reducing your liquidation risk by 45%.`
    );
  };

  // Wallet not connected view
  if (!isConnected) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 max-w-lg text-center">
            <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Connect Wallet to Get Started</h2>
            <p className="text-gray-400 mb-6">
              Connect your crypto wallet to view your portfolio, get personalized insights, and access advanced features of the OB-1 Advisor platform.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={connect}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Connect Wallet
              </button>
              
              <p className="text-gray-500 text-sm">
                OB-1 supports MetaMask, WalletConnect, Coinbase Wallet, and more.
              </p>
            </div>
            
            {/* Key Features */}
            <div className="mt-8 text-left">
              <h3 className="text-lg font-medium mb-3 text-center">What You'll Get</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">Portfolio analytics with real-time performance tracking</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">AI-powered investment recommendations</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">DeFi protocol management and optimization</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">Automated task execution and portfolio rebalancing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Overview - Always visible */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-4">
          <h2 className="text-xl font-bold mb-4">Market Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* ETH */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">ETH</span>
                <span className={`text-xs px-2 py-1 rounded-full ${marketData.ethChange >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {marketData.ethChange >= 0 ? '+' : ''}{marketData.ethChange}%
                </span>
              </div>
              <p className="text-lg font-bold mt-1">${marketData.ethPrice.toLocaleString()}</p>
            </div>
            
            {/* BTC */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">BTC</span>
                <span className={`text-xs px-2 py-1 rounded-full ${marketData.btcChange >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {marketData.btcChange >= 0 ? '+' : ''}{marketData.btcChange}%
                </span>
              </div>
              <p className="text-lg font-bold mt-1">${marketData.btcPrice.toLocaleString()}</p>
            </div>
            
            {/* UNI */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">UNI</span>
                <span className={`text-xs px-2 py-1 rounded-full ${marketData.uniChange >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {marketData.uniChange >= 0 ? '+' : ''}{marketData.uniChange}%
                </span>
              </div>
              <p className="text-lg font-bold mt-1">${marketData.uniPrice.toLocaleString()}</p>
            </div>
            
            {/* Gas */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Gas</span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-400">
                  Network
                </span>
              </div>
              <p className="text-lg font-bold mt-1">{marketData.gasPrice} Gwei</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm pb-6">
          <p>Powered by OpenBlock Labs</p>
        </footer>
      </div>
    );
  }

  // Wallet connected view (original dashboard)
  return (
    <div>
      {/* AI Chat Module */}
      <DashboardAIChat portfolioData={portfolioData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Portfolio Data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Overview */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Market Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* ETH */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">ETH</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${marketData.ethChange >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {marketData.ethChange >= 0 ? '+' : ''}{marketData.ethChange}%
                  </span>
                </div>
                <p className="text-lg font-bold mt-1">${marketData.ethPrice.toLocaleString()}</p>
              </div>
              
              {/* BTC */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">BTC</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${marketData.btcChange >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {marketData.btcChange >= 0 ? '+' : ''}{marketData.btcChange}%
                  </span>
                </div>
                <p className="text-lg font-bold mt-1">${marketData.btcPrice.toLocaleString()}</p>
              </div>
              
              {/* UNI */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">UNI</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${marketData.uniChange >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {marketData.uniChange >= 0 ? '+' : ''}{marketData.uniChange}%
                  </span>
                </div>
                <p className="text-lg font-bold mt-1">${marketData.uniPrice.toLocaleString()}</p>
              </div>
              
              {/* Gas */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Gas</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-400">
                    Network
                  </span>
                </div>
                <p className="text-lg font-bold mt-1">{marketData.gasPrice} Gwei</p>
              </div>
            </div>
          </div>
        
          {/* Performance Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Portfolio Performance</h2>
              <div className="text-sm px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                Real-time Tracking
              </div>
            </div>
            {portfolioData && <PerformanceChart data={portfolioData.netWorth} />}
          </div>

          {/* Token Allocation */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Token Allocation</h2>
            {portfolioData && <TokenPieChart tokens={portfolioData.tokens} />}
          </div>

          {/* Wallet Assets */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Wallet Assets</h2>
              <Link to="/trading" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Trade Assets
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">24h</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {mockWalletAssets.assets.map(asset => (
                    <tr key={asset.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                            <span>{asset.icon}</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">{asset.symbol}</div>
                            <div className="text-xs text-gray-400">{asset.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {asset.balance} {asset.symbol}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        ${asset.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                        ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          asset.change24h >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                        }`}>
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Link to="/trading" className="text-blue-400 hover:text-blue-300">
                            Trade
                          </Link>
                          <span className="text-gray-500">|</span>
                          <button className="text-blue-400 hover:text-blue-300">
                            Send
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-700">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">Total</td>
                    <td className="px-4 py-3 whitespace-nowrap"></td>
                    <td className="px-4 py-3 whitespace-nowrap"></td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-white">
                      ${mockWalletAssets.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mockWalletAssets.change24h >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                      }`}>
                        {mockWalletAssets.change24h >= 0 ? '+' : ''}{mockWalletAssets.change24h}%
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Protocol Positions */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Protocol Positions</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Position
              </button>
            </div>
            
            {portfolioData && (
              <>
                {/* Aave Position */}
                <div className="mb-4 p-4 border border-gray-700 rounded-lg bg-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-900/30 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-400 font-bold">A</span>
                      </div>
                      <div className="font-medium">Aave</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      portfolioData.protocols.aave.healthFactor < 1.5 
                        ? 'bg-red-900/30 text-red-400' 
                        : 'bg-green-900/30 text-green-400'
                    }`}>
                      Health Factor: {portfolioData.protocols.aave.healthFactor}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Collateral</span>
                      <p className="font-medium">${portfolioData.protocols.aave.collateral}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Borrowed</span>
                      <p className="font-medium">${portfolioData.protocols.aave.borrowed}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button 
                      onClick={handleAddCollateral}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
                    >
                      Add Collateral
                    </button>
                    <button 
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
                    >
                      Repay
                    </button>
                  </div>
                </div>
                
                {/* Uniswap Position */}
                <div className="p-4 border border-gray-700 rounded-lg bg-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-pink-900/30 rounded-full flex items-center justify-center mr-2">
                        <span className="text-pink-400 font-bold">U</span>
                      </div>
                      <div className="font-medium">Uniswap</div>
                    </div>
                    <div className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs">
                      APY: {portfolioData.protocols.uniswap.apy}%
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Rewards</span>
                      <p className="font-medium">{portfolioData.protocols.uniswap.rewards} UNI</p>
                      <p className="text-xs text-gray-400">≈ ${(portfolioData.protocols.uniswap.rewards * marketData.uniPrice).toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Value Locked</span>
                      <p className="font-medium">$650.00</p>
                      <p className="text-xs text-green-400">+5.2% (7d)</p>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button 
                      onClick={handleClaimRewards}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
                    >
                      Claim Rewards
                    </button>
                    <button 
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
                    >
                      Add Liquidity
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Summary and Optimization */}
        <div className="lg:col-span-1 space-y-6">
          {/* Active Wallet */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Active Wallet</h2>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                <span className="text-orange-400 font-bold">M</span>
              </div>
              <div>
                <p className="font-medium text-white">{wallet?.name}</p>
                <p className="text-sm text-gray-400">{wallet?.address.slice(0, 6)}...{wallet?.address.slice(-4)}</p>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Balance</span>
                <span className="font-medium">{wallet?.balance}</span>
              </div>
            </div>
          </div>
          
          {/* AI Advisor Insights */}
          {portfolioData && (
            <AIAdvisorInsights 
              portfolioData={portfolioData} 
              onShowAction={(actionType) => {
                switch(actionType) {
                  case 'aave':
                    handleAddCollateral();
                    break;
                  case 'rewards':
                    handleClaimRewards();
                    break;
                  case 'optimize':
                    handleShowStrategy();
                    break;
                  default:
                    break;
                }
              }} 
            />
          )}
          
          {/* Portfolio Summary */}
          {portfolioData && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Portfolio Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Value</span>
                  <span className="font-bold">${portfolioData.netWorth[portfolioData.netWorth.length - 1]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Change (7d)</span>
                  <span className="font-bold text-green-400">+8.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Assets</span>
                  <span className="font-bold">{Object.keys(portfolioData.tokens).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Protocols</span>
                  <span className="font-bold">{Object.keys(portfolioData.protocols).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Risk Level</span>
                  <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">Moderate</span>
                </div>
              </div>
              <button
                onClick={handleShowStrategy}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200"
              >
                Optimize Portfolio
              </button>
            </div>
          )}
          
          {/* Chat with Advisor Button */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Have Questions?</h3>
                <p className="text-sm text-gray-400">Your personal DeFi advisor is ready to help</p>
              </div>
            </div>
            <button 
              onClick={() => {
                // Find the floating chat button and click it
                document.querySelector('.floating-chat-button')?.click();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Chat with OB-1 Advisor
            </button>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <ActionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        description={modalDescription}
        action={modalAction}
      />
      
      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm pb-6">
        <p>Powered by OpenBlock Labs</p>
      </footer>
    </div>
  );
};

export default Dashboard;