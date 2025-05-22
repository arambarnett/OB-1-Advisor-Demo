import React from 'react';

const AssetAllocationChart = ({ data }) => {
  // Extract dates and asset types
  const dates = data.map(entry => entry.date);
  const assetTypes = Object.keys(data[0]).filter(key => key !== 'date');
  
  // Define colors for each asset type
  const assetColors = {
    ETH: '#627EEA',
    BTC: '#F7931A',
    USDC: '#2775CA',
    Other: '#6B7280'
  };

  // Calculate chart dimensions
  const chartHeight = 200;
  const chartWidth = '100%';
  
  // Generate stacked area chart
  const generatePaths = () => {
    const totalPoints = dates.length;
    const paths = [];
    
    // For each asset, calculate the cumulative percentage
    for (let i = 0; i < assetTypes.length; i++) {
      const assetType = assetTypes[i];
      const pathPoints = [];
      
      // Calculate bottom line (sum of previous assets)
      for (let j = 0; j < totalPoints; j++) {
        let bottomSum = 0;
        for (let k = 0; k < i; k++) {
          bottomSum += data[j][assetTypes[k]];
        }
        
        const x = (j / (totalPoints - 1)) * 100;
        const y = 100 - bottomSum;
        
        pathPoints.push({ x, y });
      }
      
      // Calculate top line (sum of previous assets + current asset)
      const topPoints = [];
      for (let j = totalPoints - 1; j >= 0; j--) {
        let topSum = 0;
        for (let k = 0; k <= i; k++) {
          topSum += data[j][assetTypes[k]];
        }
        
        const x = (j / (totalPoints - 1)) * 100;
        const y = 100 - topSum;
        
        topPoints.push({ x, y });
      }
      
      // Combine paths for complete area
      let path = '';
      
      // Start with bottom line
      pathPoints.forEach((point, index) => {
        if (index === 0) {
          path += `M ${point.x} ${point.y}`;
        } else {
          path += ` L ${point.x} ${point.y}`;
        }
      });
      
      // Add top line in reverse
      topPoints.forEach(point => {
        path += ` L ${point.x} ${point.y}`;
      });
      
      // Close path
      path += ' Z';
      
      paths.push({
        path,
        color: assetColors[assetType],
        asset: assetType
      });
    }
    
    return paths;
  };

  const paths = generatePaths();
  
  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Calculate the most recent asset allocation
  const currentAllocation = {};
  if (data.length > 0) {
    const latestData = data[data.length - 1];
    assetTypes.forEach(asset => {
      currentAllocation[asset] = latestData[asset];
    });
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Asset Allocation Over Time</div>
      </div>
      
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map(percent => (
            <line
              key={percent}
              x1="0"
              y1={chartHeight * (percent / 100)}
              x2="100%"
              y2={chartHeight * (percent / 100)}
              stroke="#4B5563"
              strokeWidth="1"
              strokeOpacity={percent === 0 || percent === 100 ? "1" : "0.3"}
              strokeDasharray={percent === 0 || percent === 100 ? "" : "4 4"}
            />
          ))}
          
          {/* Area paths */}
          {paths.map((pathData, index) => (
            <path
              key={index}
              d={pathData.path}
              fill={pathData.color}
              fillOpacity="0.7"
              className="transition-all duration-300 hover:fill-opacity-90"
            />
          ))}
        </svg>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 mb-6">
        {dates.map((date, index) => (
          <div key={index} className="text-xs text-gray-400">{formatDate(date)}</div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        {assetTypes.map(asset => (
          <div key={asset} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: assetColors[asset] }}
            ></div>
            <span className="text-sm text-gray-300">
              {asset} ({currentAllocation[asset]}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetAllocationChart;