export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  sparkline_in_7d?: {
    price: number[];
  };
  category?: string;
}

export type CryptoCategory = 
  | 'store-of-value'
  | 'smart-contract'
  | 'stablecoin'
  | 'defi'
  | 'value-transfer'
  | 'gamefi'
  | 'meme';

export interface CategoryInfo {
  id: CryptoCategory;
  name: string;
  description: string;
  examples: string[];
}

export interface CryptoFilter {
  search: string;
  sortBy: 'price' | 'market_cap' | 'name' | '24h_change';
  sortDirection: 'asc' | 'desc';
  category: CryptoCategory | 'all';
} 