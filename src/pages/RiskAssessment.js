import React, { useState } from 'react';

// Mock risk factors data
const mockRiskFactors = [
  {
    id: 'risk001',
    name: 'Health Factor Alert',
    description: 'Clients with Aave positions have health factors approaching unsafe levels',
    category: 'Liquidation Risk',
    severity: 'High',
    clientCount: 5,
    trend: 'increasing',
    lastUpdated: '3 hours ago'
  },
  {
    id: 'risk002',
    name: 'Stablecoin Depegging Risk',
    description: 'Exposure to algorithmic stablecoins showing signs of volatility',
    category: 'Market Risk',
    severity: 'Medium',
    clientCount: 8,
    trend: 'stable',
    lastUpdated: '1 day ago'
  },
  {
    id: 'risk003',
    name: 'Protocol Concentration',
    description: 'Multiple client portfolios have >40% allocation in a single protocol',
    category: 'Concentration Risk',
    severity: 'Medium',
    clientCount: 12,
    trend: 'decreasing',
    lastUpdated: '5 hours ago'
  },
  {
    id: 'risk004',
    name: 'Smart Contract Vulnerability',
    description: 'Recent audit of XYZ protocol revealed potential security issues',
    category: 'Security Risk',
    severity: 'High',
    clientCount: 7,
    trend: 'stable',
    lastUpdated: '2 days ago'
  },
  {
    id: 'risk005',
    name: 'Gas Price Volatility',
    description: 'Rising gas costs affecting profitability of smaller positions',
    category: 'Transaction Risk',
    severity: 'Low',
    clientCount: 15,
    trend: 'increasing',
    lastUpdated: '12 hours ago'
  },
  {
    id: 'risk006',
    name: 'Regulatory Concerns',
    description: 'Increased regulatory scrutiny of certain DeFi activities in key jurisdictions',
    category: 'Regulatory Risk',
    severity: 'Medium',
    clientCount: 21,
    trend: 'increasing',
    lastUpdated: '4 days ago'
  }
];

// Mock protocol risk scores
const mockProtocolRiskScores = [
  { protocol: 'Aave', score: 82, category: 'Lending', riskLevel: 'Low' },
  { protocol: 'Uniswap', score: 78, category: 'DEX', riskLevel: 'Low' },
  { protocol: 'Compound', score: 80, category: 'Lending', riskLevel: 'Low' },
  { protocol: 'Curve', score: 75, category: 'DEX', riskLevel: 'Low' },
  { protocol: 'Synthetix', score: 68, category: 'Derivatives', riskLevel: 'Medium' },
  { protocol: 'dYdX', score: 65, category: 'Derivatives', riskLevel: 'Medium' },
  { protocol: 'Yearn', score: 72, category: 'Yield', riskLevel: 'Medium' },
  { protocol: 'Balancer', score: 76, category: 'DEX', riskLevel: 'Low' },
  { protocol: 'MakerDAO', score: 83, category: 'Lending', riskLevel: 'Low' },
  { protocol: 'Optimism', score: 70, category: 'L2', riskLevel: 'Medium' }
];

const RiskAssessment = () => {
  const [activeTab, setActiveTab] = useState('factors');
  const [selectedRisk, setSelectedRisk] = useState(null);
  
  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-900/30 text-red-400';
      case 'Medium': return 'bg-yellow-900/30 text-yellow-400';
      case 'Low': return 'bg-green-900/30 text-green-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };
  
  // Get trend icon and color
  const getTrendIndicator = (trend) => {
    switch (trend) {
      case 'increasing':
        return {
          icon: (
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ),
          color: 'text-red-400'
        };
      case 'decreasing':
        return {
          icon: (
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>
          ),
          color: 'text-green-400'
        };
      default:
        return {
          icon: (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          ),
          color: 'text-gray-400'
        };
    }
  };
  
  // Get risk level color for protocol scores
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-900/30 text-green-400';
    if (score >= 70) return 'bg-yellow-900/30 text-yellow-400';
    return 'bg-red-900/30 text-red-400';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Risk Assessment</h1>
          <p className="text-gray-400 mt-1">Monitor and mitigate portfolio risks</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Report
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Set Alert
          </button>
        </div>
      </div>
      
      {/* Overall Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">Monitored Clients</div>
          <div className="text-2xl font-bold">24</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">Active Risk Factors</div>
          <div className="text-2xl font-bold">6</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">High Severity Risks</div>
          <div className="text-2xl font-bold text-red-400">2</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">Average Risk Score</div>
          <div className="text-2xl font-bold">72/100</div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex space-x-8">
          <button
            className={`py-2 px-1 -mb-px ${activeTab === 'factors' ? 'text-blue-400 border-b-2 border-blue-400 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('factors')}
          >
            Risk Factors
          </button>
          <button
            className={`py-2 px-1 -mb-px ${activeTab === 'protocols' ? 'text-blue-400 border-b-2 border-blue-400 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('protocols')}
          >
            Protocol Risk Scores
          </button>
          <button
            className={`py-2 px-1 -mb-px ${activeTab === 'settings' ? 'text-blue-400 border-b-2 border-blue-400 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('settings')}
          >
            Risk Settings
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'factors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Risk Factors List */}
          <div className="space-y-4">
            {mockRiskFactors.map(risk => {
              const trendIndicator = getTrendIndicator(risk.trend);
              
              return (
                <div 
                  key={risk.id} 
                  className={`bg-gray-800 rounded-lg border border-gray-700 p-4 cursor-pointer transition-all hover:border-blue-500 ${selectedRisk?.id === risk.id ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
                  onClick={() => setSelectedRisk(risk)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{risk.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(risk.severity)}`}>
                      {risk.severity} Severity
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3 line-clamp-2">{risk.description}</p>
                  <div className="flex justify-between text-sm">
                    <div className="text-gray-500">
                      <span className="mr-2">{risk.category}</span>
                      <span>· {risk.clientCount} clients affected</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-1">Trend:</span>
                      <span className={`flex items-center ${trendIndicator.color}`}>
                        {trendIndicator.icon}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Risk Details */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-max sticky top-6">
            {selectedRisk ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">{selectedRisk.name}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedRisk.severity)}`}>
                    {selectedRisk.severity} Severity
                  </span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-gray-300">{selectedRisk.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Category</h3>
                      <div className="text-gray-300">{selectedRisk.category}</div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Last Updated</h3>
                      <div className="text-gray-300">{selectedRisk.lastUpdated}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Affected Clients</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{selectedRisk.clientCount} clients affected</span>
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View List</button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Trend Analysis</h3>
                    <div className="flex items-center">
                      <span className="text-gray-300 mr-2">Risk is</span>
                      <span className={getTrendIndicator(selectedRisk.trend).color}>
                        {selectedRisk.trend === 'increasing' && 'increasing'}
                        {selectedRisk.trend === 'decreasing' && 'decreasing'}
                        {selectedRisk.trend === 'stable' && 'stable'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Based on historical data and current market conditions.</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                    Mitigate Risk
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-400 hover:bg-blue-900/20 py-2 px-4 rounded-lg transition-colors">
                    Set Alert
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-300">Select a risk factor</h3>
                <p className="mt-1 text-sm text-gray-500">Click on a risk factor to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'protocols' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Protocol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockProtocolRiskScores.map((protocol, index) => (
                  <tr key={index} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {protocol.protocol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {protocol.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-600 rounded-full h-2.5 mr-2 max-w-[100px]">
                          <div 
                            className={`h-2.5 rounded-full ${
                              protocol.score >= 80 ? 'bg-green-500' : 
                              protocol.score >= 70 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${protocol.score}%` }}
                          ></div>
                        </div>
                        <span>{protocol.score}/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getScoreColor(protocol.score)}`}>
                        {protocol.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-lg font-bold mb-6">Risk Assessment Settings</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-semibold mb-3">Risk Thresholds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-gray-400 text-sm">Health Factor Alert Threshold</label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="1.1" 
                      max="2.0" 
                      step="0.1" 
                      defaultValue="1.5"
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 font-medium">1.5</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-400 text-sm">Protocol Concentration Threshold</label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="20" 
                      max="60" 
                      step="5" 
                      defaultValue="40"
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 font-medium">40%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-400 text-sm">Protocol Risk Score Minimum</label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="50" 
                      max="90" 
                      step="5" 
                      defaultValue="70"
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 font-medium">70</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-400 text-sm">Gas Price Alert Threshold</label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="30" 
                      max="150" 
                      step="10" 
                      defaultValue="80"
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 font-medium">80 Gwei</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-semibold mb-3">Notification Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">High Severity Risk Alerts</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-gray-400">Email</span>
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 ml-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-gray-400">In-App</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Medium Severity Risk Alerts</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-gray-400">Email</span>
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 ml-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-gray-400">In-App</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">Low Severity Risk Alerts</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-gray-400">Email</span>
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 ml-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-gray-400">In-App</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-gray-300">New Protocol Risk Score Updates</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-gray-400">Email</span>
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 ml-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-gray-400">In-App</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
              Reset to Defaults
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Save Settings
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-lg font-bold mb-4">About Risk Assessment</h2>
        <p className="text-gray-300 mb-4">
          The Risk Assessment tool provides a comprehensive view of potential risks across client portfolios and DeFi protocols:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
          <li>Monitor key risk factors that could impact client positions</li>
          <li>Track protocol risk scores based on security audits, TVL, and historical performance</li>
          <li>Receive real-time alerts for high-severity risks requiring immediate attention</li>
          <li>Customize risk thresholds and notification preferences to match your risk management strategy</li>
          <li>Generate detailed risk reports for client communications and compliance purposes</li>
        </ul>
        <div className="mt-6 bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start">
          <svg className="w-6 h-6 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-200">
            Risk scores are calculated using a combination of on-chain data, security audits, TVL, protocol age, and other relevant factors. These scores are updated daily and should be used as one component of a comprehensive risk management strategy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;