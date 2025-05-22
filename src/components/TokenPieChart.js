import React from 'react';

const TokenPieChart = ({ tokens }) => {
  // Calculate token values in USD (simplified for demo)
  const tokenValues = {
    ETH: tokens.ETH * 2000, // Assuming ETH price is $2000
    USDC: tokens.USDC, // USDC is a stablecoin, 1:1 with USD
    UNI: tokens.UNI * 10, // Assuming UNI price is $10
  };

  // Calculate total value and percentages
  const totalValue = Object.values(tokenValues).reduce((sum, value) => sum + value, 0);
  const tokenPercentages = Object.entries(tokenValues).map(([symbol, value]) => ({
    symbol,
    value,
    percentage: (value / totalValue) * 100,
  }));

  // Define colors for each token
  const tokenColors = {
    ETH: '#627EEA',
    USDC: '#2775CA',
    UNI: '#FF007A',
  };

  // Create pie chart segments
  let cumulativePercentage = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Pie segments */}
          {tokenPercentages.map((token) => {
            const startAngle = cumulativePercentage * 3.6; // 3.6 degrees per percentage point
            cumulativePercentage += token.percentage;
            const endAngle = cumulativePercentage * 3.6;
            
            // Calculate SVG arc path
            const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
            const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
            const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180));
            const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180));
            
            // Determine if arc should take the long path (> 180 degrees)
            const largeArcFlag = token.percentage > 50 ? 1 : 0;
            
            const pathData = [
              `M 50 50`,
              `L ${startX} ${startY}`,
              `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `Z`
            ].join(' ');
            
            return (
              <path
                key={token.symbol}
                d={pathData}
                fill={tokenColors[token.symbol]}
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
          {/* Inner circle for donut effect */}
          <circle cx="50" cy="50" r="20" fill="#1f2937" />
        </svg>
      </div>
      
      <div className="mt-6 md:mt-0 md:ml-8 flex-1">
        <h3 className="text-lg font-bold mb-3">Asset Breakdown</h3>
        <div className="space-y-3">
          {tokenPercentages.map((token) => (
            <div key={token.symbol} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: tokenColors[token.symbol] }}
                ></div>
                <span className="font-medium text-white">{token.symbol}</span>
              </div>
              <div className="flex items-center">
                <span className="text-white mr-2">${token.value.toFixed(2)}</span>
                <span className="text-gray-400 text-sm">{token.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">Total</span>
            <span className="font-bold text-white">${totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPieChart;