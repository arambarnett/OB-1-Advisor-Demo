import React, { useState, useEffect } from 'react';

const TradeModal = ({ isOpen, onClose, token, tradeType }) => {
  const [amount, setAmount] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [slippage, setSlippage] = useState(0.5);
  const [gasOption, setGasOption] = useState('medium');

  // Reset form when modal opens with new token
  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setTotalValue(0);
    }
  }, [isOpen, token]);

  // Calculate total value when amount changes
  useEffect(() => {
    if (!amount || !token) return;
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setTotalValue(0);
      return;
    }
    
    setTotalValue(numAmount * token.price);
  }, [amount, token]);

  if (!isOpen || !token) return null;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSlippageChange = (value) => {
    setSlippage(value);
  };

  const handleGasChange = (option) => {
    setGasOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate trade execution
    setTimeout(() => {
      alert(`${tradeType === 'buy' ? 'Bought' : 'Sold'} ${amount} ${token.symbol} for $${totalValue.toFixed(2)}`);
      onClose();
    }, 1000);
  };

  const gasOptions = {
    low: { price: '30 Gwei', time: '~5 min', cost: '$2.50' },
    medium: { price: '42 Gwei', time: '~2 min', cost: '$3.75' },
    high: { price: '55 Gwei', time: '~30 sec', cost: '$4.90' }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full overflow-hidden shadow-xl border border-gray-700">
        <div className="flex justify-between items-center bg-gray-900 p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="block text-gray-400 text-sm">Amount</label>
              <span className="text-sm text-gray-400">
                Price: ${token.price < 0.01 ? token.price.toFixed(8) : token.price.toFixed(2)} per {token.symbol}
              </span>
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="flex-1 bg-transparent border-none p-3 text-white focus:outline-none"
                min="0"
                step="0.000001"
                required
              />
              <div className="px-4 py-3 bg-gray-600 text-white flex items-center">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-2">
                  <span>{token.logo}</span>
                </div>
                <span>{token.symbol}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="block text-gray-400 text-sm">Total Value</label>
              <span className="text-sm text-blue-400">
                {tradeType === 'buy' ? 'You Pay' : 'You Receive'}
              </span>
            </div>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <div className="flex-1 p-3 text-white">
                ${totalValue.toFixed(2)}
              </div>
              <div className="px-4 py-3 bg-gray-600 text-white">
                USDC
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Slippage Tolerance</label>
            <div className="flex space-x-2">
              {[0.5, 1.0, 2.0].map(value => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleSlippageChange(value)}
                  className={`flex-1 py-2 rounded ${
                    slippage === value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Gas Fee (Network Fee)</label>
            <div className="flex space-x-2">
              {Object.keys(gasOptions).map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleGasChange(option)}
                  className={`flex-1 p-2 rounded text-sm ${
                    gasOption === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium capitalize">{option}</div>
                  <div className="text-xs mt-1">{gasOptions[option].price}</div>
                  <div className="text-xs">{gasOptions[option].time}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6 p-3 bg-gray-700 rounded-lg">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Gas Fee</span>
              <span className="text-white">{gasOptions[gasOption].cost}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Route</span>
              <span className="text-white">
                {tradeType === 'buy' 
                  ? `USDC → ${token.symbol} (via Uniswap V3)`
                  : `${token.symbol} → USDC (via Uniswap V3)`
                }
              </span>
            </div>
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
              tradeType === 'buy'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeModal;