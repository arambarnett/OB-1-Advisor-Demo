import React from 'react';

const Search = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">OB-1 Search</h1>
        <div className="text-sm text-gray-400">Powered by obl.dev</div>
      </div>
      
      <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
        <iframe 
          src="https://www.obl.dev" 
          className="w-full h-full min-h-[70vh]"
          title="OB-1 Search"
          allow="clipboard-write"
        />
      </div>
    </div>
  );
};

export default Search;