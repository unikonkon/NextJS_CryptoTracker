import React from 'react';
import { FaChartLine, FaSearch, FaLayerGroup } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Track Cryptocurrencies in Real-Time
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore the world of cryptocurrencies across different categories, 
            with real-time prices and market data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500 p-3 rounded-full">
                  <FaChartLine className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-Time Data</h3>
              <p className="text-gray-400">
                Get the latest cryptocurrency prices and market data updated in real-time.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <FaLayerGroup className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Categorized</h3>
              <p className="text-gray-400">
                Browse cryptocurrencies by category to better understand the market.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-500 p-3 rounded-full">
                  <FaSearch className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Search & Filter</h3>
              <p className="text-gray-400">
                Easily find and filter cryptocurrencies based on your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 