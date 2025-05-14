"use client";

import React, { useState, useEffect } from 'react';
import { getCryptocurrencies } from '@/lib/api';
import { Cryptocurrency, CryptoFilter } from '@/types';
import { categories } from '@/lib/categories';
import { useDebounce } from '@/lib/hooks';

// Components
import Header from '@/components/Header';
import Hero from '@/components/Hero';
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
  const debouncedSearch = useDebounce(search, 300);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header search={search} setSearch={setSearch} />
      
      {!showSearchResults && <Hero />}
      
      <main className="container mx-auto px-4 py-12">
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
