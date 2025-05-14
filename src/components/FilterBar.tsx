import React from 'react';
import { CryptoFilter, CryptoCategory } from '@/types';
import { categories } from '@/lib/categories';

interface FilterBarProps {
  filter: CryptoFilter;
  setFilter: (filter: CryptoFilter) => void;
}

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      sortBy: e.target.value as CryptoFilter['sortBy'],
    });
  };

  const handleSortDirectionChange = () => {
    setFilter({
      ...filter,
      sortDirection: filter.sortDirection === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      category: e.target.value as CryptoCategory | 'all',
    });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-auto">
          <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">
            Category
          </label>
          <select
            id="category"
            className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
            value={filter.category}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-400 mb-1">
            Sort By
          </label>
          <div className="flex">
            <select
              id="sort"
              className="bg-gray-700 text-white rounded-l-md px-3 py-2 w-full"
              value={filter.sortBy}
              onChange={handleSortChange}
            >
              <option value="market_cap">Market Cap</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="24h_change">24h Change</option>
            </select>
            <button
              className="bg-gray-700 text-white px-3 rounded-r-md border-l border-gray-600"
              onClick={handleSortDirectionChange}
            >
              {filter.sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 