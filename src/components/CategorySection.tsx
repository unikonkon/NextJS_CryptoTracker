import React from 'react';
import { CategoryInfo, Cryptocurrency } from '@/types';
import CryptoCard from './CryptoCard';

interface CategorySectionProps {
  category: CategoryInfo;
  cryptocurrencies: Cryptocurrency[];
}

export default function CategorySection({ category, cryptocurrencies }: CategorySectionProps) {
  // Filter cryptocurrencies by category
  const categoryCryptos = cryptocurrencies.filter(
    (crypto) => crypto.category === category.id
  ).slice(0, 4); // Show max 4 cryptos per category

  if (categoryCryptos.length === 0) {
    return null;
  }

  return (
    <section id={category.id} className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">{category.name}</h2>
          <p className="text-gray-400 mt-1">{category.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {category.examples.map((example) => (
              <span 
                key={example} 
                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
              >
                {example}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryCryptos.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>
    </section>
  );
} 