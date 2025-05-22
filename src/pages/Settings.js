import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [language, setLanguage] = useState('english');
  const [currency, setCurrency] = useState('usd');
  const [activeWallet, setActiveWallet] = useState('wallet1');
  
  // Mock wallet data
  const wallets = [
    {
      id: 'wallet1',
      name: 'Main Wallet',
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      type: 'MetaMask',
      balance: '3.45 ETH'
    },
    {
      id: 'wallet2',
      name: 'DeFi Portfolio',
      address: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      type: 'WalletConnect',
      balance: '1.2 ETH'
    },
    {
      id: 'wallet3',
      name: 'Trading Account',
      address: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
      type: 'Coinbase Wallet',
      balance: '0.78 ETH'
    }
  ];
  
  // Function to truncate wallet address
  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  // Add a new wallet (mock function)
  const handleAddWallet = () => {
    alert('Connect wallet functionality would go here.');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="bg-gray-800 rounded-lg shadow border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="font-medium text-white">Settings Menu</h2>
            </div>
            <div className="divide-y divide-gray-700">
              <button 
                className={`w-full text-left px-4 py-3 transition-colors duration-200 ${activeTab === 'general' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700/50'}`}
                onClick={() => setActiveTab('general')}
              >
                General
              </button>
              <button 
                className={`w-full text-left px-4 py-3 transition-colors duration-200 ${activeTab === 'wallets' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700/50'}`}
                onClick={() => setActiveTab('wallets')}
              >
                Wallets
              </button>
              <button 
                className={`w-full text-left px-4 py-3 transition-colors duration-200 ${activeTab === 'security' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700/50'}`}
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
              <button 
                className={`w-full text-left px-4 py-3 transition-colors duration-200 ${activeTab === 'notifications' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700/50'}`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
              <button 
                className={`w-full text-left px-4 py-3 transition-colors duration-200 ${activeTab === 'advanced' ? 'bg-gray-700 text-blue-400' : 'text-gray-300 hover:bg-gray-700/50'}`}
                onClick={() => setActiveTab('advanced')}
              >
                Advanced
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-span-1 md:col-span-3">
          <div className="bg-gray-800 rounded-lg shadow border border-gray-700 p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div>
                <h2 className="text-xl font-bold mb-4">General Settings</h2>
                
                <div className="space-y-6">
                  {/* Dark Mode */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Dark Mode</h3>
                      <p className="text-sm text-gray-400">Use dark theme across the application</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="dark-mode-toggle" 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <span className={`absolute inset-0 rounded-full transition-colors duration-200 ${darkMode ? 'bg-blue-600' : 'bg-gray-600'}`}></span>
                      <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></span>
                    </div>
                  </div>
                  
                  {/* Language */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Language</h3>
                    <select 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                    </select>
                  </div>
                  
                  {/* Currency */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Display Currency</h3>
                    <select 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                      <option value="jpy">JPY (¥)</option>
                      <option value="eth">ETH (Ξ)</option>
                      <option value="btc">BTC (₿)</option>
                    </select>
                  </div>
                  
                  {/* Save Button */}
                  <div className="pt-4 border-t border-gray-700">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Wallets Settings */}
            {activeTab === 'wallets' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Manage Wallets</h2>
                
                <div className="space-y-6">
                  {/* Connected Wallets */}
                  <div>
                    <h3 className="font-medium text-white mb-3">Connected Wallets</h3>
                    <div className="space-y-3">
                      {wallets.map(wallet => (
                        <div 
                          key={wallet.id} 
                          className={`p-4 rounded-lg border ${activeWallet === wallet.id ? 'bg-blue-900/20 border-blue-500' : 'bg-gray-700 border-gray-600'}`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                                {wallet.type === 'MetaMask' && (
                                  <span className="text-orange-400 font-bold">M</span>
                                )}
                                {wallet.type === 'WalletConnect' && (
                                  <span className="text-blue-400 font-bold">W</span>
                                )}
                                {wallet.type === 'Coinbase Wallet' && (
                                  <span className="text-blue-400 font-bold">C</span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{wallet.name}</h4>
                                <p className="text-sm text-gray-400">{truncateAddress(wallet.address)}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <span className="text-sm text-gray-400">{wallet.type}</span>
                                <p className="font-medium text-white">{wallet.balance}</p>
                              </div>
                              <div>
                                <input 
                                  type="radio" 
                                  name="active-wallet" 
                                  id={wallet.id} 
                                  checked={activeWallet === wallet.id}
                                  onChange={() => setActiveWallet(wallet.id)}
                                  className="sr-only"
                                />
                                <label 
                                  htmlFor={wallet.id}
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                    activeWallet === wallet.id 
                                      ? 'border-blue-500 bg-blue-500' 
                                      : 'border-gray-500'
                                  }`}
                                >
                                  {activeWallet === wallet.id && (
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Add Wallet Button */}
                  <button 
                    onClick={handleAddWallet}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md text-sm transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Connect New Wallet
                  </button>
                  
                  <div className="bg-blue-900/20 text-blue-400 p-4 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium">Multi-wallet Support</p>
                        <p className="text-sm mt-1">OB-1 supports multiple wallets across different chains. Your active wallet will be used for transactions and portfolio analysis.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                
                <div className="space-y-6">
                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors duration-200">
                      Enable
                    </button>
                  </div>
                  
                  {/* Transaction Confirmation */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Transaction Confirmation</h3>
                      <p className="text-sm text-gray-400">Require confirmation for all transactions</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
                      <input type="checkbox" className="sr-only" id="tx-toggle" defaultChecked />
                      <span className="absolute inset-0 rounded-full transition-colors duration-200 bg-blue-600"></span>
                      <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 transform translate-x-6"></span>
                    </div>
                  </div>
                  
                  {/* Session Timeout */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Session Timeout</h3>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="240">4 hours</option>
                      <option value="720">12 hours</option>
                    </select>
                  </div>
                  
                  {/* Trusted Devices */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Trusted Devices</h3>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white">Current Device (Chrome on macOS)</p>
                          <p className="text-xs text-gray-400">Last active: Just now</p>
                        </div>
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs">Current</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="pt-4 border-t border-gray-700">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                
                <div className="space-y-6">
                  {/* In-App Notifications */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">In-App Notifications</h3>
                      <p className="text-sm text-gray-400">Receive notifications within the application</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="app-notifications-toggle" 
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                      />
                      <span className={`absolute inset-0 rounded-full transition-colors duration-200 ${notifications ? 'bg-blue-600' : 'bg-gray-600'}`}></span>
                      <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></span>
                    </div>
                  </div>
                  
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Email Notifications</h3>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="email-notifications-toggle" 
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                      />
                      <span className={`absolute inset-0 rounded-full transition-colors duration-200 ${emailNotifications ? 'bg-blue-600' : 'bg-gray-600'}`}></span>
                      <span className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0'}`}></span>
                    </div>
                  </div>
                  
                  {/* Notification Types */}
                  <div>
                    <h3 className="font-medium text-white mb-3">Notification Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input type="checkbox" id="tx-notifications" className="rounded bg-gray-700 border-gray-600 text-blue-600" defaultChecked />
                        <label htmlFor="tx-notifications" className="ml-2 text-white">Transaction alerts</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price-notifications" className="rounded bg-gray-700 border-gray-600 text-blue-600" defaultChecked />
                        <label htmlFor="price-notifications" className="ml-2 text-white">Price alerts</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="news-notifications" className="rounded bg-gray-700 border-gray-600 text-blue-600" defaultChecked />
                        <label htmlFor="news-notifications" className="ml-2 text-white">News and updates</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="security-notifications" className="rounded bg-gray-700 border-gray-600 text-blue-600" defaultChecked />
                        <label htmlFor="security-notifications" className="ml-2 text-white">Security alerts</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="marketing-notifications" className="rounded bg-gray-700 border-gray-600 text-blue-600" />
                        <label htmlFor="marketing-notifications" className="ml-2 text-white">Marketing communications</label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="pt-4 border-t border-gray-700">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Advanced Settings */}
            {activeTab === 'advanced' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Advanced Settings</h2>
                
                <div className="space-y-6">
                  {/* Gas Price Settings */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Default Gas Price Strategy</h3>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="normal">Normal (Market Rate)</option>
                      <option value="fast">Fast (20% Above Market)</option>
                      <option value="fastest">Fastest (50% Above Market)</option>
                      <option value="eco">Economic (20% Below Market)</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  
                  {/* Network Selection */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Default Network</h3>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="ethereum">Ethereum Mainnet</option>
                      <option value="arbitrum">Arbitrum</option>
                      <option value="optimism">Optimism</option>
                      <option value="polygon">Polygon</option>
                      <option value="bsc">BNB Chain</option>
                    </select>
                  </div>
                  
                  {/* RPC Endpoints */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Custom RPC Endpoints</h3>
                    <div className="bg-gray-700 border border-gray-600 rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white">Ethereum Mainnet</span>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                      </div>
                      <input 
                        type="text" 
                        className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                        defaultValue="https://mainnet.infura.io/v3/your-api-key"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  {/* Developer Mode */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Developer Mode</h3>
                      <p className="text-sm text-gray-400">Enable advanced features and debugging tools</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
                      <input type="checkbox" className="sr-only" id="dev-toggle" />
                      <span className="absolute inset-0 rounded-full transition-colors duration-200 bg-gray-600"></span>
                      <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 transform"></span>
                    </div>
                  </div>
                  
                  {/* Account Data */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Account Data</h3>
                    <div className="flex space-x-3">
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                        Export Data
                      </button>
                      <button className="bg-red-600/30 hover:bg-red-700/30 text-red-400 px-4 py-2 rounded-md text-sm transition-colors duration-200">
                        Delete Account
                      </button>
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="pt-4 border-t border-gray-700">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;