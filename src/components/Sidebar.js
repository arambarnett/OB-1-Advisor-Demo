import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletContext } from '../App';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const { isConnected, wallet } = useContext(WalletContext);
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Trading', path: '/trading', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { name: 'News', path: '/news', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { name: 'Recommendations', path: '/recommendations', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Risk Assessment', path: '/risk-assessment', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Reports', path: '/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Tasks', path: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Search', path: '/search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  ];
  
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
    <aside className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out fixed inset-y-0 z-40 flex flex-col`}>
      <div className="flex items-center justify-center p-4 border-b border-gray-700">
        {isOpen ? (
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <h1 className="text-xl font-bold">OB-1 Advisor Mode</h1>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span className="text-xs mt-1">OB-1</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <svg 
                  className={`mr-3 h-6 w-6 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {isOpen && item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <Link 
          to="/settings" 
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            location.pathname === '/settings'
              ? 'bg-gray-900 text-white' 
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <svg 
            className={`mr-3 h-6 w-6 ${location.pathname === '/settings' ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {isOpen && "Settings"}
        </Link>
        
        {/* Only show profile when wallet is connected */}
        {isConnected && wallet ? (
          <div className="mt-4 flex items-center">
            {/* Use a generated avatar based on the wallet address instead of a user photo */}
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: getProfileColor(wallet.address) }}
            >
              {getInitials(wallet.address)}
            </div>
            {isOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </p>
                <p className="text-xs font-medium text-gray-300">
                  {wallet.balance}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;