import React, { useState, useContext } from 'react';
import { WalletContext } from '../App';
import mockNews from '../data/mockNews.json';
import mockWalletAssets from '../data/mockWalletAssets.json';

const News = () => {
  const { isConnected, connect } = useContext(WalletContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('news');

  // Filter news based on user's portfolio or selected filter
  const getFilteredNews = () => {
    if (activeFilter === 'all') {
      return mockNews.news;
    }
    
    // Filter by tag/asset
    return mockNews.news.filter(item => 
      item.tags.some(tag => tag.toLowerCase() === activeFilter.toLowerCase()) ||
      item.relevance.toLowerCase().includes(activeFilter.toLowerCase())
    );
  };

  // Get user's assets as filters
  const getAssetFilters = () => {
    if (!isConnected) return [];
    return mockWalletAssets.assets.map(asset => asset.symbol);
  };

  // Format date for relative time
  const formatDate = (dateStr) => {
    return dateStr; // Already formatted in the mock data
  };

  // Sentiment indicator
  const SentimentIndicator = ({ score }) => {
    let bgColor = 'bg-gray-600';
    let textColor = 'text-gray-300';
    
    if (score >= 80) {
      bgColor = 'bg-green-900/30';
      textColor = 'text-green-400';
    } else if (score >= 60) {
      bgColor = 'bg-blue-900/30';
      textColor = 'text-blue-400';
    } else if (score >= 40) {
      bgColor = 'bg-yellow-900/30';
      textColor = 'text-yellow-400';
    } else if (score < 40) {
      bgColor = 'bg-red-900/30';
      textColor = 'text-red-400';
    }
    
    return (
      <div className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor}`}>
        Sentiment: {score}/100
      </div>
    );
  };

  // Portfolio Impact badge
  const ImpactBadge = ({ impact }) => {
    let bgColor = 'bg-gray-600';
    let textColor = 'text-gray-300';
    
    if (impact === 'high') {
      bgColor = 'bg-purple-900/30';
      textColor = 'text-purple-400';
    } else if (impact === 'medium') {
      bgColor = 'bg-blue-900/30';
      textColor = 'text-blue-400';
    } else if (impact === 'low') {
      bgColor = 'bg-gray-700';
      textColor = 'text-gray-400';
    }
    
    return (
      <div className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor} capitalize`}>
        {impact} impact
      </div>
    );
  };

  // Wallet not connected view
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 max-w-md text-center">
          <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Wallet for Personalized News</h2>
          <p className="text-gray-400 mb-6">
            Connect your wallet to get news and insights personalized to your portfolio holdings, helping you stay informed about the assets you care about.
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portfolio News & Insights</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            Set News Alerts
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'news' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('news')}
        >
          News Feed
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'social' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('social')}
        >
          Social Insights
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'analysis' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('analysis')}
        >
          Market Analysis
        </button>
      </div>

      {/* News Feed Tab */}
      {activeTab === 'news' && (
        <>
          {/* Filter Pills */}
          <div className="flex items-center space-x-3 mb-6 overflow-x-auto pb-2">
            <span className="text-gray-400 text-sm whitespace-nowrap">Filter by:</span>
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                activeFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All News
            </button>
            <button 
              onClick={() => setActiveFilter('high')}
              className={`px-3 py-1 rounded-full text-sm ${
                activeFilter === 'high' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              High Impact
            </button>
            {getAssetFilters().map((asset, index) => (
              <button 
                key={index}
                onClick={() => setActiveFilter(asset)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === asset 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {asset}
              </button>
            ))}
          </div>

          {/* Featured News */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="mb-2 flex items-center space-x-2">
                  <span className="bg-blue-900/50 text-blue-400 px-2 py-1 rounded-full text-xs">Featured</span>
                  <span className="text-gray-300 text-sm">{mockNews.featured.source} • {formatDate(mockNews.featured.date)}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{mockNews.featured.title}</h2>
                <p className="text-gray-300 mb-3">{mockNews.featured.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs">
                    {mockNews.featured.relevance}
                  </div>
                  <SentimentIndicator score={mockNews.featured.sentimentScore} />
                </div>
              </div>
              {/* Featured image is a placeholder */}
              <div className="w-full h-80 bg-gray-700"></div>
            </div>
          </div>

          {/* News Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getFilteredNews().map((news) => (
              <div key={news.id} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{news.title}</h3>
                    <ImpactBadge impact={news.portfolioImpact} />
                  </div>
                  <div className="text-sm text-gray-400 mb-3">{news.source} • {formatDate(news.date)}</div>
                  <p className="text-gray-300 mb-4">{news.summary}</p>
                  <div className="flex justify-between items-center">
                    <div className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs">
                      {news.relevance}
                    </div>
                    <SentimentIndicator score={news.sentimentScore} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {news.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Social Insights Tab */}
      {activeTab === 'social' && (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Community Insights</h2>
            <p className="text-gray-400 mb-3">Curated insights from crypto communities relevant to your portfolio</p>

            <div className="space-y-4 mt-6">
              {mockNews.socialInsights.map((insight) => (
                <div key={insight.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                        insight.platform === 'Discord' ? 'bg-indigo-900/30 text-indigo-400' :
                        insight.platform === 'Twitter' ? 'bg-blue-900/30 text-blue-400' :
                        'bg-green-900/30 text-green-400'
                      }`}>
                        {insight.platform === 'Discord' ? 'D' :
                         insight.platform === 'Twitter' ? 'T' : 'TG'}
                      </div>
                      <div>
                        <div className="font-medium text-white">{insight.community}</div>
                        <div className="text-xs text-gray-400">{insight.platform} • {insight.date}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      insight.sentiment === 'positive' ? 'bg-green-900/30 text-green-400' :
                      insight.sentiment === 'negative' ? 'bg-red-900/30 text-red-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {insight.sentiment.charAt(0).toUpperCase() + insight.sentiment.slice(1)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2">"{insight.highlight}"</p>
                  <div className="text-xs text-blue-400">{insight.relevance}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h2 className="text-lg font-bold mb-4">Popular Discussion Topics</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">ETH Layer 2 Scaling</span>
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">DeFi Yield Optimization</span>
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Aave V3 Features</span>
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Chainlink Data Feeds</span>
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Bitcoin ETF Flows</span>
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h2 className="text-lg font-bold mb-4">Trending Governance Proposals</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Uniswap Fee Switch Activation</span>
                    <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs">Passed</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Enable 0.05% protocol fee on selected pools</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Aave Risk Parameter Update</span>
                    <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs">Voting</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Adjust ETH and BTC risk parameters</p>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Compound Treasury Allocation</span>
                    <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded-full text-xs">Discussion</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Allocate $10M for ecosystem development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-3">{mockNews.marketAnalysis.title}</h2>
            <p className="text-gray-300 mb-6">{mockNews.marketAnalysis.summary}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-white">Key Market Insights</h3>
                <ul className="space-y-2">
                  {mockNews.marketAnalysis.insights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-gray-300">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-white">Portfolio Recommendations</h3>
                <ul className="space-y-2">
                  {mockNews.marketAnalysis.portfolioRecommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-3 text-white">DeFi Sector Performance</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Lending</span>
                    <span className="text-green-400">+12.4%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">DEXes</span>
                    <span className="text-green-400">+8.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Derivatives</span>
                    <span className="text-green-400">+6.7%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Yield Aggregators</span>
                    <span className="text-red-400">-2.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-3 text-white">Layer 1 vs Layer 2</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Ethereum</span>
                    <span className="text-green-400">+5.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Arbitrum</span>
                    <span className="text-green-400">+18.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Optimism</span>
                    <span className="text-green-400">+15.1%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Solana</span>
                    <span className="text-green-400">+9.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium mb-3 text-white">Yield Opportunities</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Curve stETH/ETH</span>
                    <span className="text-green-400">6.8% APY</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Low risk, stable yield</p>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Aave USDC</span>
                    <span className="text-green-400">3.5% APY</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Very low risk, stablecoin yield</p>
                </div>
                <div className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Uniswap ETH/LINK</span>
                    <span className="text-green-400">8.2% APY</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Moderate risk, LP position</p>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Arb ETH Staking</span>
                    <span className="text-green-400">5.2% APY</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Low risk, Layer 2 staking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Insight Footer */}
      <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 mt-8">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-200">OB-1 Advisor Insight</p>
            <p className="text-xs text-gray-400 mt-1">
              Based on the news affecting your portfolio, consider exploring the new Curve stablecoin pool with enhanced yields for your USDC holdings. Also, monitor the Aave risk parameter updates closely as they directly impact your current position.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;