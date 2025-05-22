import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock client data
const mockClients = [
  { 
    id: '001', 
    name: 'Alex Thompson', 
    portfolioValue: 125000, 
    riskScore: 'Moderate',
    lastActivity: '2 hours ago',
    change: 3.2
  },
  { 
    id: '002', 
    name: 'Morgan Wilson', 
    portfolioValue: 340000, 
    riskScore: 'High',
    lastActivity: '1 day ago',
    change: -1.5
  },
  { 
    id: '003', 
    name: 'Jordan Lee', 
    portfolioValue: 78000, 
    riskScore: 'Low',
    lastActivity: '5 days ago',
    change: 1.8
  },
  { 
    id: '004', 
    name: 'Casey Smith', 
    portfolioValue: 215000, 
    riskScore: 'Moderate',
    lastActivity: '3 hours ago',
    change: 4.7
  },
  { 
    id: '005', 
    name: 'Taylor Roberts', 
    portfolioValue: 560000, 
    riskScore: 'High',
    lastActivity: '12 hours ago',
    change: 0.8
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  
  // Filter clients based on search term and filter
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'high-risk') return matchesSearch && client.riskScore === 'High';
    if (filterBy === 'needs-attention') return matchesSearch && client.change < 0;
    
    return matchesSearch;
  });
  
  // Get risk color based on risk score
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-900/30 text-green-400';
      case 'Moderate': return 'bg-yellow-900/30 text-yellow-400';
      case 'High': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Client Management</h1>
          <p className="text-gray-400 mt-1">Monitor and manage your clients' portfolios</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Client
        </button>
      </div>
      
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -mt-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${filterBy === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setFilterBy('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${filterBy === 'high-risk' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setFilterBy('high-risk')}
          >
            High Risk
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${filterBy === 'needs-attention' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setFilterBy('needs-attention')}
          >
            Needs Attention
          </button>
        </div>
      </div>
      
      {/* Client list */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Portfolio Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/clients/${client.id}`} className="text-blue-400 hover:text-blue-300 font-medium">
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ${client.portfolioValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={client.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {client.change >= 0 ? '+' : ''}{client.change}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(client.riskScore)}`}>
                      {client.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                    {client.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors" title="View Portfolio">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors" title="Send Message">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors" title="OB-1 Analysis">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Empty state */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-300">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-lg font-bold mb-4">About Client Management</h2>
        <p className="text-gray-300 mb-4">
          The Clients page allows financial advisors to manage their client portfolios in one place. Key features include:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
          <li>View all clients and their portfolio performance at a glance</li>
          <li>Filter clients by risk level or those needing immediate attention</li>
          <li>Quickly access client details, portfolio composition, and transaction history</li>
          <li>Generate AI-powered recommendations for each client's specific financial situation</li>
          <li>Track client interactions and manage communication history</li>
        </ul>
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            View Client Onboarding Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clients;