import React from 'react';

const ActionModal = ({ isOpen, onClose, title, description, action }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="bg-blue-900 text-white px-6 py-4">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-300 mb-4">{description}</p>
            
            {/* Transaction Details */}
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="text-sm text-gray-400 mb-2">Transaction Details</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="font-medium text-white">Ethereum Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gas Fee (Est.)</span>
                  <span className="font-medium text-white">0.005 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Protocol</span>
                  <span className="font-medium text-white">{action === 'collateral' ? 'Aave v3' : 'Uniswap v3'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Transaction simulated successfully!');
                onClose();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;