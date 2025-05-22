import React, { useState } from 'react';

const AIAdvisorInsights = ({ portfolioData, onShowAction }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Insights based on portfolio data
  const insights = [
    {
      title: "Aave Health Alert",
      description: `Your Aave health factor is ${portfolioData.protocols.aave.healthFactor}, which is ${portfolioData.protocols.aave.healthFactor < 1.5 ? 'below the recommended threshold' : 'good, but could be improved'}.`,
      action: "Add Collateral",
      actionType: "aave",
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      priority: portfolioData.protocols.aave.healthFactor < 1.5 ? "high" : "medium"
    },
    {
      title: "Unclaimed Rewards",
      description: `You have ${portfolioData.protocols.uniswap.rewards} UNI tokens available to claim, worth approximately $${(portfolioData.protocols.uniswap.rewards * 8.76).toFixed(2)}.`,
      action: "Claim Rewards",
      actionType: "rewards",
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      priority: "medium"
    },
    {
      title: "Portfolio Optimization",
      description: "Based on market conditions, rebalancing your portfolio could increase your estimated APY from 3.2% to 5.7%.",
      action: "Optimize Portfolio",
      actionType: "optimize",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      priority: "low"
    }
  ];

  // Sort insights by priority (high, medium, low)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedInsights = [...insights].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % sortedInsights.length);
  };

  const handlePrevious = () => {
    setActiveIndex((activeIndex - 1 + sortedInsights.length) % sortedInsights.length);
  };

  const currentInsight = sortedInsights[activeIndex];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          OB-1 Advisor Insights
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevious}
            className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
            {currentInsight.icon}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium text-white">{currentInsight.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                currentInsight.priority === 'high' 
                  ? 'bg-red-900/30 text-red-400' 
                  : currentInsight.priority === 'medium'
                    ? 'bg-yellow-900/30 text-yellow-400'
                    : 'bg-green-900/30 text-green-400'
              }`}>
                {currentInsight.priority.charAt(0).toUpperCase() + currentInsight.priority.slice(1)} Priority
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{currentInsight.description}</p>
            <button 
              onClick={() => onShowAction && onShowAction(currentInsight.actionType)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200"
            >
              {currentInsight.action}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-center">
        {sortedInsights.map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === activeIndex ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AIAdvisorInsights;