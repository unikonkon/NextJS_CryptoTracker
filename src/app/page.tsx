"use client";

import React, { useState, useEffect } from 'react';
import { getCryptocurrencies } from '@/lib/api';
import { Cryptocurrency, CryptoFilter } from '@/types';
import { categories } from '@/lib/categories';
import { useDebounce } from '@/lib/hooks';
import Image from 'next/image';

// Components
import Header from '@/components/Header';
import CategorySection from '@/components/CategorySection';
import FilterBar from '@/components/FilterBar';
import SearchResults from '@/components/SearchResults';
import SearchResultsPage from '@/components/SearchResultsPage';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Footer from '@/components/Footer';

export default function Home() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<CryptoFilter>({
    search: '',
    sortBy: 'market_cap',
    sortDirection: 'desc',
    category: 'all',
  });

  // Use debounced search for filtering
  const debouncedSearch = useDebounce(search, 100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCryptocurrencies();
        setCryptocurrencies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update filter when debounced search changes
  useEffect(() => {
    setFilter(prev => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  // Determine if we should show search results or categories
  const showSearchResults = debouncedSearch.length >= 1;

  // Get top 5 gainers and losers by 24h price change
  const getTopGainersAndLosers = () => {
    if (!cryptocurrencies.length) return { gainers: [], losers: [] };

    const sorted = [...cryptocurrencies].sort((a, b) =>
      b.price_change_percentage_24h - a.price_change_percentage_24h
    );

    const gainers = sorted.filter(crypto => crypto.price_change_percentage_24h > 0).slice(0, 5);
    const losers = sorted.filter(crypto => crypto.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 5);

    return { gainers, losers };
  };

  const { gainers, losers } = getTopGainersAndLosers();

  return (
    <div className="min-h-screen bg-gray-900 text-white bg-gradient-to-br from-gray-900 to-gray-800">
      <Header search={search} setSearch={setSearch} />

      <main className="container mx-auto px-4 py-12">
        {!showSearchResults && (
          <section className="mb-16">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Track Cryptocurrencies
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Cryptocurrency prices and market information updated Top Gainers and Top Losers
              </p>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Top 5 Gainers</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-right">Price</th>
                          <th className="px-4 py-2 text-right">24h Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gainers.map((crypto) => (
                          <tr key={crypto.id} className="border-b border-gray-700">
                            <td className="px-4 py-3 flex items-center">
                              <Image src={crypto.image} alt={crypto.name} width={24} height={24} />
                              <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                            </td>
                            <td className="px-4 py-3 text-right">${crypto.current_price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right text-green-400">
                              +{crypto.price_change_percentage_24h.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-red-400">Top 5 Losers</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-right">Price</th>
                          <th className="px-4 py-2 text-right">24h Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {losers.map((crypto) => (
                          <tr key={crypto.id} className="border-b border-gray-700">
                            <td className="px-4 py-3 flex items-center">
                              <Image src={crypto.image} alt={crypto.name} width={24} height={24} />
                              <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                            </td>
                            <td className="px-4 py-3 text-right">${crypto.current_price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right text-red-400">
                              {crypto.price_change_percentage_24h.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {showSearchResults ? (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Search Results</h2>
            <SearchResultsPage
              searchTerm={debouncedSearch}
              cryptocurrencies={cryptocurrencies}
              loading={loading}
              error={error}
            />
          </section>
        ) : (
          <>
            <section id="categories" className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Cryptocurrency Categories</h2>

              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} />
              ) : (
                <>
                  {categories.map((category) => (
                    <CategorySection
                      key={category.id}
                      category={category}
                      cryptocurrencies={cryptocurrencies}
                    />
                  ))}
                </>
              )}
            </section>

            <section id="all-cryptocurrencies" className="mb-16">
              <h2 className="text-3xl font-bold mb-8">All Cryptocurrencies</h2>

              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} />
              ) : (
                <>
                  <FilterBar filter={filter} setFilter={setFilter} />
                  <SearchResults cryptocurrencies={cryptocurrencies} filter={filter} />
                </>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
