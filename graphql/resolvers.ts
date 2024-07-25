import { mockCryptocurrencyData, mockTradingPairsData } from '../mockData';

export const resolvers = {
  Query: {
    cryptocurrencies: () => mockCryptocurrencyData,
    tradingPairs: () => mockTradingPairsData,
  },
};
