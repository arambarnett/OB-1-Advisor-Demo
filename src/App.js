import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FloatingChat from './components/FloatingChat';
import AIAssistantBanner from './components/AIAssistantBanner';

// Pages
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientDetail from './pages/ClientDetail';
import Recommendations from './pages/Recommendations';
import RiskAssessment from './pages/RiskAssessment';
import Reports from './pages/Reports';
import Tasks from './pages/Tasks';
import Trading from './pages/Trading';
import News from './pages/News';
import Search from './pages/Search';
import Settings from './pages/Settings';

// Context
import { useState as useWalletState, createContext } from 'react';

// Create wallet context
export const WalletContext = createContext({
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
  wallet: null
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(null);
  
  // Wallet connection handler with specific address
  const connectWallet = () => {
    setIsWalletConnected(true);
    setCurrentWallet({
      name: 'My Wallet',
      address: '0x3328f7f4a1d1c57c35df56bbf0c9dcafca309c49',
      type: 'MetaMask',
      balance: '3.45 ETH'
    });
  };
  
  // Wallet disconnection handler
  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setCurrentWallet(null);
  };
  
  // Wallet context value
  const walletContextValue = {
    isConnected: isWalletConnected,
    connect: connectWallet,
    disconnect: disconnectWallet,
    wallet: currentWallet
  };
  
  return (
    <WalletContext.Provider value={walletContextValue}>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto pt-16"> {/* Adjusted padding to account for fixed navbar */}
            <div className="container mx-auto px-4 pb-20"> {/* Added container and bottom padding for floating chat */}
              <AIAssistantBanner />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/:id" element={<ClientDetail />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/risk-assessment" element={<RiskAssessment />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/trading" element={<Trading />} />
                <Route path="/news" element={<News />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-900 border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
            <p>Powered by <span className="font-medium text-blue-400">OpenBlock Labs</span></p>
          </footer>
        </div>
        
        {/* Floating Chat Button */}
        <FloatingChat />
      </div>
    </WalletContext.Provider>
  );
}

export default App;