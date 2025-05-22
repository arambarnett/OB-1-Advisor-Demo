import React from 'react';

const PerformanceChart = ({ data }) => {
  // Calculate chart dimensions
  const chartHeight = 160;
  const chartWidth = '100%';
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  
  // Calculate the percentage change from previous to current day (last 24h)
  const dailyChange = ((data[data.length - 1] - data[data.length - 2]) / data[data.length - 2] * 100).toFixed(2);
  const isPositive = dailyChange >= 0;
  
  // Calculate the percentage change for the whole week (for display in chart)
  const weeklyChange = ((data[data.length - 1] - data[0]) / data[0] * 100).toFixed(2);
  const isWeeklyPositive = weeklyChange >= 0;
  
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
      <div className="flex flex-col mb-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-white">
            ${data[data.length - 1].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
          }`}>
            {isPositive ? '↑ +' : '↓ '}{dailyChange}% today
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm font-medium text-gray-400">Total Portfolio Value</div>
          <div className="text-sm text-gray-400">
            7-day: <span className={isWeeklyPositive ? 'text-green-400' : 'text-red-400'}>
              {isWeeklyPositive ? '+' : ''}{weeklyChange}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Gradient for the area under the line */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isWeeklyPositive ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"} />
              <stop offset="100%" stopColor={isWeeklyPositive ? "rgba(16, 185, 129, 0)" : "rgba(239, 68, 68, 0)"} />
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
            stroke={isWeeklyPositive ? "#10b981" : "#ef4444"}
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
                stroke={isWeeklyPositive ? "#10b981" : "#ef4444"}
                strokeWidth="2"
                className="transition-all duration-500 ease-in-out"
              />
            );
          })}
          
          {/* Connecting lines between data points (added) */}
          {data.length > 1 && data.map((value, index) => {
            // Don't create line for the first point
            if (index === 0) return null;
            
            const range = maxValue - minValue;
            const padding = range * 0.1;
            const effectiveHeight = chartHeight - 20;
            
            // Previous point
            const prevValue = data[index - 1];
            const prevY = effectiveHeight - ((prevValue - minValue + padding) / (range + padding * 2)) * effectiveHeight;
            const prevX = ((index - 1) / (data.length - 1)) * 100;
            
            // Current point
            const currY = effectiveHeight - ((value - minValue + padding) / (range + padding * 2)) * effectiveHeight;
            const currX = (index / (data.length - 1)) * 100;
            
            return (
              <line
                key={`line-${index}`}
                x1={`${prevX}%`}
                y1={prevY}
                x2={`${currX}%`}
                y2={currY}
                stroke={isWeeklyPositive ? "#10b981" : "#ef4444"}
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

export default PerformanceChart;