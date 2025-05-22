import React, { useState } from 'react';
import mockTasks from '../data/mockTasks.json';
import mockPortfolio from '../data/mockPortfolio.json';

const Tasks = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  
  // Simulate wallet connection
  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  // Format date string to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate time remaining
  const getTimeRemaining = (endTimeString) => {
    if (!endTimeString) return 'Pending';
    
    const endTime = new Date(endTimeString);
    const now = new Date();
    const diffMs = endTime - now;
    
    if (diffMs <= 0) return 'Completing...';
    
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Less than a minute';
    if (diffMins === 1) return '1 minute';
    return `${diffMins} minutes`;
  };

  // Wallet not connected view
  if (!isWalletConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 max-w-md text-center">
          <div className="w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">
            Connect your wallet to view and manage AI tasks. OB-1 uses your portfolio data to provide personalized insights and automation.
          </p>
          <button 
            onClick={handleConnectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full"
          >
            Connect Wallet
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Your data is encrypted and secure. OB-1 never stores your private keys.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Tasks</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New AI Task
        </button>
      </div>

      {/* Task Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-5 rounded-lg shadow border border-gray-700">
          <div className="flex items-center mb-1">
            <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-medium text-white">Active Tasks</span>
          </div>
          <div className="text-2xl font-bold">{mockTasks.activeTasks.length}</div>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg shadow border border-gray-700">
          <div className="flex items-center mb-1">
            <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center mr-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-medium text-white">Completed</span>
          </div>
          <div className="text-2xl font-bold">{mockTasks.completedTasks.length}</div>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg shadow border border-gray-700">
          <div className="flex items-center mb-1">
            <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-2">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium text-white">Average Time</span>
          </div>
          <div className="text-2xl font-bold">8.5 min</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'active' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Tasks
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'completed' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'scheduled' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('scheduled')}
        >
          Scheduled
        </button>
      </div>

      {/* Active Tasks */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {mockTasks.activeTasks.map(task => (
            <div key={task.id} className="bg-gray-800 rounded-lg shadow border border-gray-700 overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-400 mt-1">{task.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    task.status === 'in_progress' 
                      ? 'bg-blue-900/30 text-blue-400' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {task.status === 'in_progress' ? 'In Progress' : 'Queued'}
                  </div>
                </div>
                
                {task.status === 'in_progress' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <div>
                        <span className="text-gray-400">Started:</span>
                        <span className="ml-1 text-gray-300">{formatDate(task.startedAt)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Time remaining:</span>
                        <span className="ml-1 text-gray-300">{getTimeRemaining(task.estimatedCompletion)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex mt-4 pt-4 border-t border-gray-700">
                  {task.status === 'in_progress' ? (
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                      Cancel Task
                    </button>
                  ) : (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                      Start Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {mockTasks.completedTasks.map(task => (
            <div key={task.id} className="bg-gray-800 rounded-lg shadow border border-gray-700 overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-400 mt-1">{task.description}</p>
                  </div>
                  <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm">
                    Completed
                  </div>
                </div>
                
                <div className="mt-4 bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="text-white font-medium">Result</span>
                      <p className="text-gray-300 mt-1">{task.result}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700 text-sm">
                  <div>
                    <span className="text-gray-400">Completed:</span>
                    <span className="ml-1 text-gray-300">{formatDate(task.completedAt)}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs transition-colors duration-200">
                      View Report
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-xs transition-colors duration-200">
                      Run Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Tasks */}
      {activeTab === 'scheduled' && (
        <div className="bg-gray-800 rounded-lg shadow border border-gray-700 p-6 text-center">
          <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No Scheduled Tasks</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            You don't have any scheduled tasks yet. Use the OB-1 AI to set up recurring tasks like portfolio rebalancing, DeFi harvesting, or market analysis.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Schedule a Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;