import React from 'react';
import { Cryptocurrency } from '@/types';
import CryptoCard from './CryptoCard';
import { filterCryptocurrencies } from '@/lib/utils';
import { CryptoFilter } from '@/types';

interface SearchResultsProps {
  cryptocurrencies: Cryptocurrency[];
  filter: CryptoFilter;
}

export default function SearchResults({ cryptocurrencies, filter }: SearchResultsProps) {
  const filteredCryptos = filterCryptocurrencies(cryptocurrencies, filter);

  if (filteredCryptos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No cryptocurrencies found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCryptos.map((crypto) => (
        <CryptoCard key={crypto.id} crypto={crypto} />
      ))}
    </div>
  );
} 