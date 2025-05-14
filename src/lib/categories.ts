import { CategoryInfo } from '@/types';

export const categories: CategoryInfo[] = [
  {
    id: 'store-of-value',
    name: 'Store of Value',
    description: 'Cryptocurrencies designed to maintain or increase in value over time',
    examples: ['Bitcoin', 'Litecoin']
  },
  {
    id: 'smart-contract',
    name: 'Smart Contract',
    description: 'Platforms that enable developers to build decentralized applications',
    examples: ['Ethereum', 'Solana', 'Cardano']
  },
  {
    id: 'stablecoin',
    name: 'Stablecoin',
    description: 'Cryptocurrencies designed to maintain a stable value relative to a specific asset',
    examples: ['Tether (USDT)', 'USD Coin (USDC)', 'Binance USD (BUSD)']
  },
  {
    id: 'defi',
    name: 'DeFi',
    description: 'Decentralized finance applications providing financial services without intermediaries',
    examples: ['Uniswap', 'Aave', 'Compound']
  },
  {
    id: 'value-transfer',
    name: 'Value Transfer',
    description: 'Cryptocurrencies optimized for fast and efficient value transfer',
    examples: ['Ripple (XRP)', 'Stellar (XLM)']
  },
  {
    id: 'gamefi',
    name: 'GameFi',
    description: 'Gaming platforms built on blockchain technology',
    examples: ['Axie Infinity', 'The Sandbox', 'Decentraland']
  },
  {
    id: 'meme',
    name: 'Meme Coins',
    description: 'Cryptocurrencies inspired by internet memes or jokes',
    examples: ['Dogecoin', 'Shiba Inu', 'Pepe']
  }
]; 