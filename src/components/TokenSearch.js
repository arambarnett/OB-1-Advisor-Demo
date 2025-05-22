import React, { useState, useEffect, useRef } from 'react';
import mockTokens from '../data/mockTokens.json';

const TokenSearch = ({ onTokenSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const wrapperRef = useRef(null);

  // Filter tokens based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTokens([]);
      return;
    }
    
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = mockTokens.tokens.filter(token => 
      token.name.toLowerCase().includes(lowercasedSearch) || 
      token.symbol.toLowerCase().includes(lowercasedSearch)
    );
    
    setFilteredTokens(filtered);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleTokenClick = (token) => {
    onTokenSelect(token);
    setSearchTerm('');
    setIsOpen(false);
  };

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex items-center bg-gray-700 rounded-lg">
        <div className="p-3 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for a token..."
          className="bg-transparent border-none w-full text-white p-3 focus:outline-none"
        />
      </div>
      
      {isOpen && filteredTokens.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {filteredTokens.map(token => (
            <div 
              key={token.id} 
              className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
              onClick={() => handleTokenClick(token)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    <span>{token.logo}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{token.symbol}</div>
                    <div className="text-xs text-gray-400">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">${token.price < 0.01 ? token.price.toFixed(8) : token.price.toFixed(2)}</div>
                  <div className={`text-xs ${token.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {token.price_change_24h >= 0 ? '+' : ''}{token.price_change_24h}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && searchTerm.trim() !== '' && filteredTokens.length === 0 && (
        <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 text-center">
          <p className="text-gray-400">No tokens found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default TokenSearch;