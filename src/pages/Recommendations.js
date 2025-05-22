import React, { useState } from 'react';

// Mock recommendation data
const mockRecommendations = [
  {
    id: 'rec001',
    title: 'Rebalance ETH/USDC Position',
    description: 'Current portfolio is overexposed to ETH price volatility. Consider rebalancing to 60/40 ETH/USDC ratio to reduce risk while maintaining upside potential.',
    impact: 'High',
    category: 'Risk Management',
    clientCount: 12,
    aiConfidence: 92,
    createdAt: '2 days ago'
  },
  {
    id: 'rec002',
    title: 'Claim UNI Rewards and Stake',
    description: 'Multiple clients have unclaimed UNI rewards. Claiming and staking these rewards can generate an additional 14.5% APY.',
    impact: 'Medium',
    category: 'Yield Optimization',
    clientCount: 8,
    aiConfidence: 98,
    createdAt: '1 day ago'
  },
  {
    id: 'rec003',
    title: 'Add Collateral to Aave Positions',
    description: 'Several clients have Aave positions with health factors below 1.5, increasing liquidation risk. Adding ETH collateral will improve these health factors.',
    impact: 'High',
    category: 'Risk Management',
    clientCount: 5,
    aiConfidence: 95,
    createdAt: '3 hours ago'
  },
  {
    id: 'rec004',
    title: 'Diversify Into Layer 2 Protocols',
    description: 'Current portfolios are heavily concentrated on Ethereum mainnet. Consider diversifying into Layer 2 solutions like Arbitrum and Optimism to reduce gas costs and increase exposure to growing ecosystems.',
    impact: 'Medium',
    category: 'Diversification',
    clientCount: 15,
    aiConfidence: 88,
    createdAt: '5 days ago'
  },
  {
    id: 'rec005',
    title: 'Reduce Exposure to DEX Governance Tokens',
    description: 'Market analysis suggests potential regulatory headwinds for DEX governance tokens. Consider reducing exposure to mitigate regulatory risk.',
    impact: 'Medium',
    category: 'Risk Management',
    clientCount: 7,
    aiConfidence: 84,
    createdAt: '12 hours ago'
  },
  {
    id: 'rec006',
    title: 'Leverage ETH Staking Opportunities',
    description: 'With Ethereum fully transitioned to PoS, staking opportunities now offer stable 4-5% APY with minimal risk. Recommend allocating a portion of idle ETH to staking services.',
    impact: 'Low',
    category: 'Yield Optimization',
    clientCount: 18,
    aiConfidence: 96,
    createdAt: '3 days ago'
  }
];

const Recommendations = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  
  // Filter recommendations by category
  const filteredRecommendations = activeCategory === 'all' 
    ? mockRecommendations 
    : mockRecommendations.filter(rec => rec.category === activeCategory);
  
  // Get impact color based on impact level
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-red-900/30 text-red-400';
      case 'Medium': return 'bg-yellow-900/30 text-yellow-400';
      case 'Low': return 'bg-green-900/30 text-green-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI-Powered Recommendations</h1>
          <p className="text-gray-400 mt-1">Smart insights to optimize client portfolios</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Generate New Insights
        </button>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button 
          className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          onClick={() => setActiveCategory('all')}
        >
          All Recommendations
        </button>
        <button 
          className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'Risk Management' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          onClick={() => setActiveCategory('Risk Management')}
        >
          Risk Management
        </button>
        <button 
          className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'Yield Optimization' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          onClick={() => setActiveCategory('Yield Optimization')}
        >
          Yield Optimization
        </button>
        <button 
          className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'Diversification' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          onClick={() => setActiveCategory('Diversification')}
        >
          Diversification
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecommendations.map(recommendation => (
            <div 
              key={recommendation.id} 
              className={`bg-gray-800 rounded-lg border border-gray-700 p-4 cursor-pointer transition-all hover:border-blue-500 ${selectedRecommendation?.id === recommendation.id ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
              onClick={() => setSelectedRecommendation(recommendation)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{recommendation.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(recommendation.impact)}`}>
                  {recommendation.impact} Impact
                </span>
              </div>
              <p className="text-gray-400 mb-3 line-clamp-2">{recommendation.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{recommendation.createdAt}</span>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">AI Confidence:</span>
                  <span className="text-blue-400 font-medium">{recommendation.aiConfidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recommendation Details */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-max sticky top-6">
          {selectedRecommendation ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{selectedRecommendation.title}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(selectedRecommendation.impact)}`}>
                  {selectedRecommendation.impact} Impact
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-300">{selectedRecommendation.description}</p>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Affected Clients</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">{selectedRecommendation.clientCount} clients</span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">View List</button>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${selectedRecommendation.aiConfidence}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-blue-400">{selectedRecommendation.aiConfidence}%</span>
                  </div>
                  <p className="text-gray-400 text-sm">Based on market trends, client portfolio analysis, and historical performance data.</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Apply to All Clients
                </button>
                <button className="flex-1 border border-blue-600 text-blue-400 hover:bg-blue-900/20 py-2 px-4 rounded-lg transition-colors">
                  Review Individually
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-300">Select a recommendation</h3>
              <p className="mt-1 text-sm text-gray-500">Click on a recommendation card to view details</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-lg font-bold mb-4">About AI-Powered Recommendations</h2>
        <p className="text-gray-300 mb-4">
          OB-1's recommendation engine analyzes client portfolios, market trends, and risk factors to generate actionable insights:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
          <li>Proactively identifies opportunities to optimize yields across DeFi protocols</li>
          <li>Monitors risk factors and suggests rebalancing strategies to maintain target risk levels</li>
          <li>Identifies diversification opportunities to reduce concentration risk</li>
          <li>Provides batch actions to efficiently implement recommendations across multiple client portfolios</li>
          <li>Continuously learns from market conditions and past recommendation performance</li>
        </ul>
        <div className="mt-6 bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start">
          <svg className="w-6 h-6 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-200">
            Recommendations are generated using AI analysis of on-chain data, market trends, and protocol metrics. Always review recommendations before implementation. OB-1's suggestions are meant to assist, not replace, professional financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;