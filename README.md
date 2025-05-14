# CryptoTracker

A modern cryptocurrency tracking website built with Next.js 15 and Tailwind CSS. This application allows users to view and track cryptocurrency prices and information across different categories.

## Features

- **Real-time Cryptocurrency Data**: Fetches and displays current cryptocurrency prices and market data from the CoinGecko API.
- **Categorized View**: Browse cryptocurrencies by categories like Store of Value, Smart Contract, Stablecoin, DeFi, Value Transfer, GameFi, and Meme Coins.
- **Search & Filter**: Easily search for cryptocurrencies by name or symbol, and filter by various criteria.
- **Price Charts**: View 7-day price charts for each cryptocurrency.
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices.

## Technologies Used

- **Next.js 15**: React framework with App Router for building the web application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: For type-safe code
- **Axios**: For API requests
- **React Icons**: For UI icons
- **Recharts**: For rendering cryptocurrency price charts

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-web.git
cd crypto-web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API

This project uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency data. No API key is required for basic usage, but there are rate limits.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [CoinGecko](https://www.coingecko.com/) for providing the cryptocurrency data API
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
