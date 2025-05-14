import React, { useState } from 'react';
import Image from 'next/image';
import { Cryptocurrency } from '@/types';
import { formatPrice, formatPercentage, formatMarketCap } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { getCoinDetails } from '@/lib/api';
import { FaExternalLinkAlt, FaTimes, FaInfoCircle } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

interface CryptoCardProps {
  crypto: Cryptocurrency;
}

interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  description: { en: string };
  links: {
    homepage: string[];
    blockchain_site: string[];
  };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
    total_volume: { usd: number };
    circulating_supply: number;
    max_supply: number | null;
    ath: { usd: number };
    ath_date: { usd: string };
  };
  image: { large: string };
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [coinDetails, setCoinDetails] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const priceChangeColor = crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500';
  
  // Prepare data for the sparkline chart
  const chartData = crypto.sparkline_in_7d?.price.map((price) => ({
    value: price,
  })) || [];
  // Determine stroke color based on price trend
  const strokeColor = 
    crypto.price_change_percentage_7d_in_currency && 
    crypto.price_change_percentage_7d_in_currency >= 0 
      ? '#10B981' // green-500
      : '#EF4444'; // red-500

  const handleViewDetails = async () => {
    if (showDetails && coinDetails) {
      // If details are already shown, just hide them
      setShowDetails(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const details = await getCoinDetails(crypto.id);
      setCoinDetails(details);
      setShowDetails(true);
    } catch (err) {
      setError('Failed to load coin details. Please try again later.');
      console.error('Error loading coin details:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatSupply = (supply: number): string => {
    if (supply >= 1_000_000_000) {
      return `${(supply / 1_000_000_000).toFixed(2)}B`;
    } else if (supply >= 1_000_000) {
      return `${(supply / 1_000_000).toFixed(2)}M`;
    } else if (supply >= 1_000) {
      return `${(supply / 1_000).toFixed(2)}K`;
    }
    return supply.toString();
  };

  const truncateDescription = (description: string, maxLength = 300): string => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  // Function to strip HTML tags from description
  const stripHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <>
      <div 
        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
        onClick={handleViewDetails}
      >
        <div className="p-5 flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="relative w-10 h-10 mr-3">
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  fill
                  className="rounded-full"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <h3 className="font-bold text-white">{crypto.name}</h3>
                <p className="text-gray-400 text-sm uppercase">{crypto.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">{formatPrice(crypto.current_price)}</p>
              <p className={`${priceChangeColor} text-sm`}>
                {formatPercentage(crypto.price_change_percentage_24h)}
              </p>
            </div>
          </div>
          
          {chartData.length > 0 && (
            <div className="h-20 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={strokeColor}
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        
        <div className="bg-gray-700 px-5 py-3 text-sm flex justify-between items-center">
          <p className="text-gray-300">
            Market Cap: <span className="text-white font-medium">
              ${(crypto.market_cap / 1000000000).toFixed(2)}B
            </span>
          </p>
          <button 
            className="text-yellow-400 hover:text-yellow-300"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            <FaInfoCircle size={16} />
          </button>
        </div>
      </div>

      {/* Detailed Coin Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {loading ? (
              <div className="p-8 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="p-8 text-red-400 text-center">
                <p>{error}</p>
                <button 
                  className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </button>
              </div>
            ) : coinDetails && (
              <>
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                  <div className="flex items-center">
                    <Image 
                      src={coinDetails.image.large} 
                      alt={coinDetails.name} 
                      width={60}
                      height={60}
                      className="rounded-full"
                      style={{ objectFit: 'contain' }}
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {coinDetails.name} <span className="text-gray-400 text-lg uppercase">({coinDetails.symbol})</span>
                      </h2>
                    </div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-white"
                    onClick={() => setShowDetails(false)}
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Market Information</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400">Current Price</p>
                        <p className="text-white text-xl font-bold">
                          ${coinDetails.market_data.current_price.usd.toLocaleString()}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">24h Change</p>
                        <p className={`text-lg font-semibold ${
                          coinDetails.market_data.price_change_percentage_24h >= 0 
                            ? 'text-green-500' 
                            : 'text-red-500'
                        }`}>
                          {coinDetails.market_data.price_change_percentage_24h.toFixed(2)}%
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">Market Cap</p>
                        <p className="text-white">
                          ${formatMarketCap(coinDetails.market_data.market_cap.usd)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">Trading Volume (24h)</p>
                        <p className="text-white">
                          ${formatMarketCap(coinDetails.market_data.total_volume.usd)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">Circulating Supply</p>
                        <p className="text-white">
                          {formatSupply(coinDetails.market_data.circulating_supply)} {coinDetails.symbol.toUpperCase()}
                        </p>
                      </div>
                      
                      {coinDetails.market_data.max_supply && (
                        <div>
                          <p className="text-gray-400">Max Supply</p>
                          <p className="text-white">
                            {formatSupply(coinDetails.market_data.max_supply)} {coinDetails.symbol.toUpperCase()}
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-gray-400">All Time High</p>
                        <p className="text-white">
                          ${coinDetails.market_data.ath.usd.toLocaleString()} 
                          <span className="text-gray-400 text-sm ml-2">
                            ({new Date(coinDetails.market_data.ath_date.usd).toLocaleDateString()})
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">About {coinDetails.name}</h3>
                    
                    {coinDetails.description.en ? (
                      <div className="text-gray-300 text-sm mb-6 overflow-auto max-h-[200px]">
                        <p>{truncateDescription(stripHtml(coinDetails.description.en))}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No description available.</p>
                    )}
                    
                    <div className="mt-6">
                      <h4 className="text-white font-medium mb-2">Links</h4>
                      
                      {coinDetails.links.homepage[0] && (
                        <a 
                          href={coinDetails.links.homepage[0]} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-yellow-400 hover:text-yellow-300 mb-2"
                        >
                          <FaExternalLinkAlt className="mr-2" size={14} />
                          Official Website
                        </a>
                      )}
                      
                      <a 
                        href={`https://www.coingecko.com/en/coins/${coinDetails.id}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-yellow-400 hover:text-yellow-300"
                      >
                        <FaExternalLinkAlt className="mr-2" size={14} />
                        View on CoinGecko
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
} 