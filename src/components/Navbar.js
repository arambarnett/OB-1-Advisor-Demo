import React, { useContext } from 'react';
import { WalletContext } from '../App';

const Navbar = ({ onToggleSidebar }) => {
  const { isConnected, connect, wallet } = useContext(WalletContext);
  
  // Generate Identicon-like color based on wallet address
  const getProfileColor = (address) => {
    if (!address) return '#3B82F6'; // Default blue
    
    // Take the first 6 characters of the address for a color
    const colorCode = address.slice(2, 8);
    return `#${colorCode}`;
  };
  
  // Get initials from wallet address
  const getInitials = (address) => {
    if (!address) return '';
    return address.slice(2, 4).toUpperCase();
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed top-0 left-0 right-0 z-50 flex items-center justify-between shadow-sm h-16">
      <div className="flex items-center">
        <button 
          onClick={onToggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="ml-4 text-xl font-semibold text-gray-800">OB-1 Advisor Mode <span className="text-sm bg-blue-600 text-white px-2 py-0.5 rounded-full ml-2">BETA</span></div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <svg className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Notifications - only show if wallet is connected */}
        {isConnected && (
          <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        )}
        
        {/* Profile dropdown - only show if wallet is connected */}
        {isConnected && wallet ? (
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              {/* Use a generated avatar based on wallet address */}
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: getProfileColor(wallet.address) }}
              >
                {getInitials(wallet.address)}
              </div>
              <span className="hidden md:block font-medium text-gray-700">
                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
              </span>
            </button>
          </div>
        ) : (
          <button 
            onClick={connect}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded transition-colors duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;