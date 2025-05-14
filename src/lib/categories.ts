import { CategoryInfo } from '@/types';

export const categories: CategoryInfo[] = [
  {
    id: 'store-of-value',
    name: 'Store of Value',
    description: 'Cryptocurrencies designed to maintain or increase in value over time',
    examples: ['Bitcoin', 'Bitcoin Cash', 'Monero', 'Kaspa']
  },
  {
    id: 'smart-contract',
    name: 'Smart Contract', 
    description: 'Platforms that enable developers to build decentralized applications',
    examples: ['Ethereum', 'Solana', 'Cardano', 'Avalanche', 'Polkadot']
  },
  {
    id: 'stablecoin',
    name: 'Stablecoin',
    description: 'Cryptocurrencies designed to maintain a stable value relative to a specific asset',
    examples: ['Tether (USDT)', 'USD Coin (USDC)', 'DAI', 'USDS']
  },
  {
    id: 'defi',
    name: 'DeFi',
    description: 'Decentralized finance applications providing financial services without intermediaries',
    examples: ['Uniswap', 'Aave', 'Chainlink', 'Maker', 'Raydium']
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
    examples: ['Axie Infinity', 'The Sandbox', 'Decentraland', 'Immutable X']
  },
  {
    id: 'meme',
    name: 'Meme Coins',
    description: 'Cryptocurrencies inspired by internet memes or jokes',
    examples: ['Dogecoin', 'Shiba Inu', 'Pepe', 'Bonk', 'Floki']
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Other cryptocurrencies that don\'t fit into the above categories',
    examples: ['Leo Token', 'Bitget Token', 'Render Token', 'Fetch.ai']
  }
];