import React, { useState } from 'react';

const WalletSimulator = ({ onConnect }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    // Simulate connection delay
    setTimeout(() => {
      onConnect();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center h-96">
      <div className="bg-blue-500/20 p-4 rounded-full mb-6">
        <svg className="w-16 h-16 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Welcome to OB-1 Advisor</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Connect your wallet to see your portfolio, receive personalized recommendations, and optimize your DeFi strategy.
      </p>
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className={`
          flex items-center justify-center space-x-2
          bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          transition-colors duration-200 text-base
          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span>Connect Wallet</span>
          </>
        )}
      </button>
    </div>
  );
};

export default WalletSimulator;