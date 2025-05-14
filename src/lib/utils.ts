import { Cryptocurrency, CryptoFilter } from '@/types';

export function formatPrice(price: number): string {
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    // For very small prices (like $0.00001234), use more decimal places
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(price);
  }
}

export function formatPercentage(percentage: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero',
  }).format(percentage / 100);
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1_000_000_000) {
    return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
  } else if (marketCap >= 1_000_000) {
    return `$${(marketCap / 1_000_000).toFixed(2)}M`;
  } else {
    return `$${(marketCap / 1_000).toFixed(2)}K`;
  }
}

export function filterCryptocurrencies(
  cryptocurrencies: Cryptocurrency[],
  filter: CryptoFilter
): Cryptocurrency[] {
  return cryptocurrencies
    .filter((crypto) => {
      // Filter by search term
      if (
        filter.search &&
        !crypto.name.toLowerCase().includes(filter.search.toLowerCase()) &&
        !crypto.symbol.toLowerCase().includes(filter.search.toLowerCase())
      ) {
        return false;
      }

      // Filter by category
      if (filter.category !== 'all' && crypto.category !== filter.category) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      let comparison = 0;
      
      switch (filter.sortBy) {
        case 'price':
          comparison = a.current_price - b.current_price;
          break;
        case 'market_cap':
          comparison = a.market_cap - b.market_cap;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case '24h_change':
          comparison = a.price_change_percentage_24h - b.price_change_percentage_24h;
          break;
      }

      // Apply sort direction
      return filter.sortDirection === 'asc' ? comparison : -comparison;
    });
} 