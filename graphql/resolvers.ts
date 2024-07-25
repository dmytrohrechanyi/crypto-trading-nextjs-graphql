import { mockCryptocurrencyData } from '../mockData';

export const resolvers = {
  Query: {
    cryptocurrencies: () => mockCryptocurrencyData,
  },
};
