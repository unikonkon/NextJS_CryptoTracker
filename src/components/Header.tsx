import React from 'react';
import { FaCoins } from 'react-icons/fa';
import SearchBar from './SearchBar';

interface HeaderProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function Header({ setSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <FaCoins className="text-yellow-400 text-2xl mr-2" />
          <h1 className="text-xl font-bold">CryptoTracker</h1>
        </div>
        
        <nav className="flex space-x-6">
          <a href="#" className="hover:text-yellow-400 transition-colors">Home</a>
          <a href="#categories" className="hover:text-yellow-400 transition-colors">Categories</a>
          <a href="#all-cryptocurrencies" className="hover:text-yellow-400 transition-colors">All Cryptocurrencies</a>
        </nav>
        
        <div className="mt-4 sm:mt-0 w-full sm:w-64">
          <SearchBar onSearch={setSearch} />
        </div>
      </div>
    </header>
  );
} 