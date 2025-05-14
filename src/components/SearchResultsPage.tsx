import React from 'react';
import { Cryptocurrency } from '@/types';
import CryptoCard from './CryptoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface SearchResultsPageProps {
  searchTerm: string;
  cryptocurrencies: Cryptocurrency[];
  loading: boolean;
  error: string | null;
}

export default function SearchResultsPage({ 
  searchTerm, 
  cryptocurrencies, 
  loading, 
  error 
}: SearchResultsPageProps) {
  // Filter cryptocurrencies based on search term
  const filteredCryptos = cryptocurrencies.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (searchTerm && filteredCryptos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No cryptocurrencies found matching &quot;{searchTerm}&quot;</p>
      </div>
    );
  }

  return (
    <div>
      {searchTerm && (
        <div className="mb-6">
          <h3 className="text-xl text-gray-300">
            Search results for: <span className="text-white font-semibold">&quot;{searchTerm}&quot;</span>
          </h3>
          <p className="text-gray-400 mt-1">Found {filteredCryptos.length} cryptocurrencies</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCryptos.map(crypto => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}