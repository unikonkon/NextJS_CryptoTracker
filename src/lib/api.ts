import axios from 'axios';
import { Cryptocurrency } from '@/types';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// Map of cryptocurrency IDs to their categories
const cryptoCategories: Record<string, string> = {
  bitcoin: 'store-of-value',
  ethereum: 'smart-contract',
  solana: 'smart-contract',
  cardano: 'smart-contract',
  tether: 'stablecoin',
  'usd-coin': 'stablecoin',
  'binance-usd': 'stablecoin',
  'uniswap': 'defi',
  'aave': 'defi',
  'compound': 'defi',
  'ripple': 'value-transfer',
  'stellar': 'value-transfer',
  'axie-infinity': 'gamefi',
  'the-sandbox': 'gamefi',
  'decentraland': 'gamefi',
  'dogecoin': 'meme',
  'shiba-inu': 'meme',
  'pepe': 'meme',
};

export async function getCryptocurrencies(): Promise<Cryptocurrency[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h,7d',
      },
    });

    // Add category to each cryptocurrency
    return response.data.map((crypto: Cryptocurrency) => ({
      ...crypto,
      category: cryptoCategories[crypto.id] || 'other',
    }));
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    return [];
  }
}

export async function searchCryptocurrencies(query: string): Promise<Cryptocurrency[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        query,
      },
    });

    // We need to fetch full details for the search results
    const coinIds = response.data.coins
      .slice(0, 10) // Limit to top 10 results
      .map((coin: { id: string }) => coin.id)
      .join(',');

    if (!coinIds) return [];

    const detailsResponse = await axios.get(`${API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: coinIds,
        order: 'market_cap_desc',
        sparkline: true,
        price_change_percentage: '24h,7d',
      },
    });

    // Add category to each cryptocurrency
    return detailsResponse.data.map((crypto: Cryptocurrency) => ({
      ...crypto,
      category: cryptoCategories[crypto.id] || 'other',
    }));
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    return [];
  }
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

export async function getCoinDetails(coinId: string): Promise<CoinDetails> {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for coin ${coinId}:`, error);
    throw error;
  }
} 