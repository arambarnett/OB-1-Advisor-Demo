import React from 'react';

const TokenDetails = ({ token, onTrade }) => {
  if (!token) return null;

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl">{token.logo}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{token.name}</h2>
            <p className="text-gray-400">{token.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            ${token.price < 0.01 ? token.price.toFixed(8) : token.price.toFixed(2)}
          </div>
          <div className={`inline-block px-2 py-1 rounded-full text-sm ${
            token.price_change_24h >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
          }`}>
            {token.price_change_24h >= 0 ? '+' : ''}{token.price_change_24h}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <p className="text-gray-400 text-sm mb-1">Market Cap</p>
          <p className="font-medium text-white">${formatNumber(token.market_cap)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">24h Volume</p>
          <p className="font-medium text-white">${formatNumber(token.volume_24h)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">24h High</p>
          <p className="font-medium text-white">${token.high_24h < 0.01 ? token.high_24h.toFixed(8) : token.high_24h.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">24h Low</p>
          <p className="font-medium text-white">${token.low_24h < 0.01 ? token.low_24h.toFixed(8) : token.low_24h.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onTrade('buy', token)}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Buy {token.symbol}
        </button>
        <button
          onClick={() => onTrade('sell', token)}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          Sell {token.symbol}
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-200">OB-1 Advisor Insight</p>
            <p className="text-xs text-gray-400 mt-1">
              {token.price_change_24h >= 5 
                ? `${token.symbol} has seen strong momentum with a ${token.price_change_24h}% increase in the last 24 hours. Consider taking partial profits if you're in a profitable position.`
                : token.price_change_24h <= -5
                ? `${token.symbol} has declined ${Math.abs(token.price_change_24h)}% in the last 24 hours. This could present a buying opportunity if you believe in its long-term potential.`
                : `${token.symbol} is showing relatively stable price action. This might be a good time to DCA (Dollar-Cost Average) if you're building a position.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;