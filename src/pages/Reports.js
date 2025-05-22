import React, { useState } from 'react';
import mockReports from '../data/mockReports.json';
import MonthlyReturnsChart from '../components/MonthlyReturnsChart';
import AssetAllocationChart from '../components/AssetAllocationChart';
import ReportGeneratorChat from '../components/ReportGeneratorChat';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [isReportGeneratorOpen, setIsReportGeneratorOpen] = useState(false);
  
  const renderPerformanceTab = () => (
    <div className="space-y-6">
      {/* Monthly Returns Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Monthly Returns</h2>
        <MonthlyReturnsChart 
          data={mockReports.monthlyReturns.data} 
          labels={mockReports.monthlyReturns.labels} 
        />
      </div>
      
      {/* Asset Allocation History */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Asset Allocation History</h2>
        <AssetAllocationChart data={mockReports.assetAllocationHistory} />
      </div>
      
      {/* Performance Metrics */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Total Return</div>
            <div className={`text-xl font-bold ${mockReports.performanceMetrics.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {mockReports.performanceMetrics.totalReturn >= 0 ? '+' : ''}{mockReports.performanceMetrics.totalReturn}%
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Volatility</div>
            <div className="text-xl font-bold text-white">{mockReports.performanceMetrics.volatility}%</div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Sharpe Ratio</div>
            <div className="text-xl font-bold text-white">{mockReports.performanceMetrics.sharpeRatio}</div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Max Drawdown</div>
            <div className="text-xl font-bold text-red-400">-{mockReports.performanceMetrics.maxDrawdown}%</div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Beta</div>
            <div className="text-xl font-bold text-white">{mockReports.performanceMetrics.beta}</div>
          </div>
        </div>
      </div>
      
      {/* Benchmark Comparison */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Benchmark Comparison</h2>
          <div className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm">
            vs. ETH/BTC Index
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-gray-300">Your Portfolio</div>
            <div className="text-green-400 font-bold">+12.6%</div>
          </div>
          <div className="w-full bg-gray-600 h-2 mt-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full" style={{width: '65%'}}></div>
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mt-2">
          <div className="flex justify-between items-center">
            <div className="text-gray-300">ETH/BTC Index</div>
            <div className="text-green-400 font-bold">+9.3%</div>
          </div>
          <div className="w-full bg-gray-600 h-2 mt-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{width: '48%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderTaxTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Tax Events</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Proceeds</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Gain/Loss</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Holding Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-700">
              {mockReports.taxEvents.map((event, index) => (
                <tr key={index} className="hover:bg-gray-600">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{event.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'Sell' ? 'bg-blue-900/30 text-blue-400' : 
                      event.type === 'Reward' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {event.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{event.asset}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{event.amount}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">${event.proceedsUSD}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={event.gainLossUSD >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ${event.gainLossUSD} ({event.gainLossPercent}%)
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{event.holdingPeriod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Tax Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Total Realized Gains</div>
            <div className="text-xl font-bold text-green-400">$507.00</div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Long-term Gains</div>
            <div className="text-xl font-bold text-green-400">$300.00</div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Short-term/Income</div>
            <div className="text-xl font-bold text-green-400">$207.00</div>
          </div>
        </div>
        
        <div className="mt-4 bg-blue-900/30 text-blue-400 p-4 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">Tax Disclaimer</p>
              <p className="text-sm mt-1">This is not tax advice. Please consult with a tax professional. Reports can be exported for your accountant.</p>
            </div>
          </div>
          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            Export Tax Report
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Client Reports</h2>
          <button 
            onClick={() => setIsReportGeneratorOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Generate New Report
          </button>
        </div>
        
        <div className="space-y-3">
          {mockReports.clientReports.map(report => (
            <div key={report.id} className="bg-gray-700 p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center">
              <div className="mb-3 md:mb-0">
                <h3 className="font-medium text-white">{report.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{report.description}</p>
                <p className="text-xs text-gray-500 mt-1">Generated: {report.date}</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200">
                  View
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors duration-200">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Report Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Quarterly Reports</h3>
              <p className="text-sm text-gray-400">Automatically generate quarterly performance reports</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
              <input type="checkbox" className="sr-only" id="quarterly-toggle" defaultChecked />
              <span className="absolute inset-0 rounded-full transition-colors duration-200 bg-blue-600"></span>
              <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 transform translate-x-6"></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Tax Year Reports</h3>
              <p className="text-sm text-gray-400">Generate annual tax reports</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
              <input type="checkbox" className="sr-only" id="tax-toggle" defaultChecked />
              <span className="absolute inset-0 rounded-full transition-colors duration-200 bg-blue-600"></span>
              <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 transform translate-x-6"></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Email Notifications</h3>
              <p className="text-sm text-gray-400">Send email when new reports are generated</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
              <input type="checkbox" className="sr-only" id="email-toggle" defaultChecked />
              <span className="absolute inset-0 rounded-full transition-colors duration-200 bg-blue-600"></span>
              <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 transform translate-x-6"></span>
            </div>
          </div>
          
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsReportGeneratorOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Generate Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            Export Data
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
            Share
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'performance' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'tax' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('tax')}
        >
          Tax Reporting
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'documents' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'performance' && renderPerformanceTab()}
      {activeTab === 'tax' && renderTaxTab()}
      {activeTab === 'documents' && renderDocumentsTab()}
      
      {/* Report Generator Chat Modal */}
      <ReportGeneratorChat 
        isOpen={isReportGeneratorOpen} 
        onClose={() => setIsReportGeneratorOpen(false)} 
      />
    </div>
  );
};

export default Reports;