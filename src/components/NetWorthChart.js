import React from 'react';

const NetWorthChart = ({ data }) => {
  // Calculate chart dimensions
  const chartHeight = 160;
  const chartWidth = '100%';
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  
  // Generate path for the line
  const generatePath = () => {
    if (!data || data.length === 0) return '';
    
    const range = maxValue - minValue;
    const padding = range * 0.1; // Add 10% padding
    const effectiveHeight = chartHeight - 20; // Account for dots size
    
    return data.map((value, index) => {
      // Calculate normalized Y value (inverted because SVG coords)
      const normalizedY = effectiveHeight - ((value - minValue + padding) / (range + padding * 2)) * effectiveHeight;
      // X coordinate based on index and width
      const x = (index / (data.length - 1)) * 100;
      
      return `${index === 0 ? 'M' : 'L'} ${x}% ${normalizedY}`;
    }).join(' ');
  };

  // Generate days for X-axis
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-gray-400">Last 7 days</div>
        <div className="text-xl font-bold text-white">${data[data.length - 1]}</div>
      </div>
      
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Gradient for the area under the line */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          
          {/* Area under the line */}
          <path
            d={`${generatePath()} L 100% ${chartHeight} L 0% ${chartHeight} Z`}
            fill="url(#areaGradient)"
            className="transition-all duration-500 ease-in-out"
          />
          
          {/* Main line */}
          <path
            d={generatePath()}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 ease-in-out"
          />
          
          {/* Data points */}
          {data.map((value, index) => {
            const range = maxValue - minValue;
            const padding = range * 0.1;
            const effectiveHeight = chartHeight - 20;
            const normalizedY = effectiveHeight - ((value - minValue + padding) / (range + padding * 2)) * effectiveHeight;
            const x = (index / (data.length - 1)) * 100;
            
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={normalizedY}
                r="4"
                fill="#1f2937" // Dark background color
                stroke="#3b82f6"
                strokeWidth="2"
                className="transition-all duration-500 ease-in-out"
              />
            );
          })}
        </svg>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2">
        {days.map((day, index) => (
          <div key={index} className="text-xs text-gray-400">{day}</div>
        ))}
      </div>
    </div>
  );
};

export default NetWorthChart;