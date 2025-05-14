import axios from 'axios';
import { Cryptocurrency } from '@/types';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// Map of cryptocurrency IDs to their categories
const cryptoCategories: Record<string, string> = {
  // Existing coins
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
  
  // New coins
  'tron': 'smart-contract',
  'staked-ether': 'smart-contract',
  'wrapped-bitcoin': 'store-of-value',
  'sui': 'smart-contract',
  'chainlink': 'defi',
  'wrapped-steth': 'smart-contract',
  'avalanche-2': 'smart-contract',
  'hedera-hashgraph': 'smart-contract',
  'hyperliquid': 'defi',
  'leo-token': 'other',
  'the-open-network': 'smart-contract',
  'bitcoin-cash': 'store-of-value',
  'pi-network': 'other',
  'polkadot': 'smart-contract',
  'weth': 'smart-contract',
  'usds': 'stablecoin',
  'monero': 'store-of-value',
  'wrapped-eeth': 'smart-contract',
  'bitget-token': 'other',
  'binance-bridged-usdt-bnb-smart-chain': 'stablecoin',
  'ethena-usde': 'stablecoin',
  'coinbase-wrapped-btc': 'store-of-value',
  'whitebit': 'other',
  'bittensor': 'other',
  'near': 'smart-contract',
  'aptos': 'smart-contract',
  'dai': 'stablecoin',
  'okb': 'other',
  'ondo-finance': 'defi',
  'kaspa': 'store-of-value',
  'jito-staked-sol': 'smart-contract',
  'internet-computer': 'smart-contract',
  'ethereum-classic': 'smart-contract',
  'blackrock-usd-institutional-digital-liquidity-fund': 'stablecoin',
  'tokenize-xchange': 'other',
  'crypto-com-chain': 'other',
  'gatechain-token': 'other',
  'mantle': 'smart-contract',
  'render-token': 'other',
  'official-trump': 'meme',
  'vechain': 'smart-contract',
  'susds': 'stablecoin',
  'ethena': 'defi',
  'cosmos': 'smart-contract',
  'polygon-ecosystem-token': 'smart-contract',
  'fetch-ai': 'other',
  'ethena-staked-usde': 'stablecoin',
  'usd1-wlfi': 'stablecoin',
  'lombard-staked-btc': 'store-of-value',
  'filecoin': 'other',
  'algorand': 'smart-contract',
  'arbitrum': 'smart-contract',
  'celestia': 'smart-contract',
  'fasttoken': 'other',
  'sonic-3': 'meme',
  'worldcoin-wld': 'other',
  'bonk': 'meme',
  'jupiter-perpetuals-liquidity-provider-token': 'defi',
  'jupiter-exchange-solana': 'defi',
  'binance-peg-weth': 'smart-contract',
  'maker': 'defi',
  'first-digital-usd': 'stablecoin',
  'binance-staked-sol': 'smart-contract',
  'kelp-dao-restaked-eth': 'smart-contract',
  'blockstack': 'smart-contract',
  'kucoin-shares': 'other',
  'quant-network': 'other',
  'optimism': 'smart-contract',
  'fartcoin': 'meme',
  'story-2': 'other',
  'immutable-x': 'gamefi',
  'injective-protocol': 'defi',
  'flare-networks': 'smart-contract',
  'sei-network': 'smart-contract',
  'nexo': 'defi',
  'virtual-protocol': 'other',
  'eos': 'smart-contract',
  'rocket-pool-eth': 'smart-contract',
  'xdce-crowd-sale': 'other',
  'the-graph': 'defi',
  'usdt0': 'stablecoin',
  'solv-btc': 'store-of-value',
  'dogwifcoin': 'meme',
  'floki': 'meme',
  'raydium': 'defi'
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