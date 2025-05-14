import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClearSearch = () => {
    onSearch('');
    setSearchTerm('');
  };

  const handleConfirmSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="w-full relative">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crypto..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
          {/* <FaSearch className="absolute left-3 top-3.5 text-gray-400" /> */}
          {searchTerm && (
            <button 
              onClick={handleClearSearch}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <div className="flex items-center justify-center cursor-pointer"  onClick={handleConfirmSearch}>
          <FaSearch className=" text-gray-400" size={25} />
        </div>
        {/* <button
          onClick={handleConfirmSearch}
          className="px-3 py-3 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Search
        </button> */}
      </div>
    
    </div>
  );
} 