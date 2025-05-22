import React from 'react';

const MonthlyReturnsChart = ({ data, labels }) => {
  // Calculate chart dimensions
  const chartHeight = 160;
  const chartWidth = '100%';
  const maxValue = Math.max(...data, 0);
  const minValue = Math.min(...data, 0);
  
  // Generate bar chart elements
  const generateBars = () => {
    if (!data || data.length === 0) return [];
    
    const range = maxValue - minValue;
    const barWidth = 100 / data.length;
    const effectiveHeight = chartHeight - 20; // Account for padding
    const zeroY = effectiveHeight * (maxValue / range);
    
    return data.map((value, index) => {
      const barHeight = Math.abs(value / range) * effectiveHeight;
      const isPositive = value >= 0;
      const y = isPositive ? zeroY - barHeight : zeroY;
      
      return {
        x: index * barWidth + barWidth * 0.1,
        y,
        width: barWidth * 0.8,
        height: barHeight,
        value,
        isPositive
      };
    });
  };

  const bars = generateBars();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-gray-400">Monthly returns</div>
        <div className="text-xl font-bold text-white">
          {data[data.length - 1] >= 0 ? '+' : ''}{data[data.length - 1]}%
        </div>
      </div>
      
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Zero line */}
          {bars.length > 0 && (
            <line
              x1="0"
              y1={bars[0].isPositive ? bars[0].y + bars[0].height : bars[0].y}
              x2="100%"
              y2={bars[0].isPositive ? bars[0].y + bars[0].height : bars[0].y}
              stroke="#4B5563"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          )}
          
          {/* Bars */}
          {bars.map((bar, index) => (
            <rect
              key={index}
              x={`${bar.x}%`}
              y={bar.y}
              width={`${bar.width}%`}
              height={bar.height}
              fill={bar.isPositive ? '#10B981' : '#EF4444'}
              rx="2"
              className="transition-all duration-300 hover:opacity-80"
            />
          ))}
        </svg>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2">
        {labels.map((label, index) => (
          <div key={index} className="text-xs text-gray-400">{label}</div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyReturnsChart;